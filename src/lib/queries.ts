import { supabase } from "@/integrations/supabase/client";
import { getHrOverviewFromS3 } from "@/lib/hr-s3-overview-functions";
import { demoOverviewParts, fetchOverviewPartsFromSupabase } from "@/lib/queries-hr-parts";

export type Department = { id: string; name: string };
export type Employee = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  level: string;
  department_id: string;
  hire_date: string;
  performance_score: number;
};
export type Compensation = {
  id: string;
  employee_id: string;
  base_salary: number;
  bonus_pct: number;
  equity_grant: number;
  benefits: number;
  effective_date: string;
};
export type MetricsRow = {
  id: string;
  period: string;
  total_compensation: number;
  total_bonus: number;
  headcount: number;
  avg_performance: number;
};
export type FormulaInput = {
  name: string;
  label: string;
  default: number;
  min: number;
  max: number;
  step: number;
  unit: string;
};
export type Formula = {
  id: string;
  name: string;
  description: string;
  expression: string;
  inputs: FormulaInput[];
  category: string;
};

export type EmployeeFull = Employee & {
  department_name: string;
  comp: Compensation | null;
  total_comp: number;
  effective_bonus: number;
};

function toOverviewFull(parts: {
  departments: Department[];
  employees: Employee[];
  compensation: Compensation[];
  history: MetricsRow[];
}) {
  const { departments, employees, compensation, history } = parts;
  const compByEmp = new Map(compensation.map((c) => [c.employee_id, c]));
  const deptById = new Map(departments.map((d) => [d.id, d.name]));

  const employeesFull: EmployeeFull[] = employees.map((e) => {
    const c = compByEmp.get(e.id) ?? null;
    const base = Number(c?.base_salary ?? 0);
    const bonus = Number(c?.bonus_pct ?? 0);
    const perf = Number(e.performance_score);
    const equity = Number(c?.equity_grant ?? 0);
    const benefits = Number(c?.benefits ?? 0);
    const effective_bonus = (base * bonus) / 100 * (perf / 3);
    const total_comp = base + effective_bonus + equity + benefits;
    return {
      ...e,
      department_name: deptById.get(e.department_id) ?? "—",
      comp: c,
      total_comp,
      effective_bonus,
    };
  });

  return { departments, employees: employeesFull, history };
}

export async function fetchOverview() {
  const overviewSource = String(import.meta.env.VITE_HR_OVERVIEW_SOURCE ?? "")
    .trim()
    .toLowerCase();

  const demoMode =
    String(import.meta.env.VITE_DEMO_MODE ?? "")
      .trim()
      .toLowerCase() === "true";

  // If explicitly configured, always use S3 snapshot (recommended for "dummy data" deployments).
  // This avoids any Supabase dependency for Team/Overview reads.
  if (overviewSource === "s3") {
    try {
      const snap = await getHrOverviewFromS3();
      return toOverviewFull({
        departments: snap.departments,
        employees: snap.employees,
        compensation: snap.compensation,
        history: snap.history,
      });
    } catch {
      // If snapshot isn't available yet, fall back to locally generated demo data.
      return toOverviewFull(demoOverviewParts());
    }
  }

  // Demo mode = local dummy dataset (no Supabase calls).
  if (demoMode) return toOverviewFull(demoOverviewParts());

  const s3Fallback =
    String(import.meta.env.VITE_HR_S3_FALLBACK ?? "")
      .trim()
      .toLowerCase() === "true";

  try {
    // Primary source: Supabase (normal mode)
    const parts = await fetchOverviewPartsFromSupabase();
    return toOverviewFull(parts);
  } catch (err) {
    if (!s3Fallback) throw err;
    // Fallback: S3 snapshot (helps in deployments where Supabase is flaky/blocked)
    const snap = await getHrOverviewFromS3();
    return toOverviewFull({
      departments: snap.departments,
      employees: snap.employees,
      compensation: snap.compensation,
      history: snap.history,
    });
  }
}

export async function fetchFormulas(): Promise<Formula[]> {
  const { data, error } = await supabase.from("formulas").select("*").order("name");
  if (error) throw error;
  return (data ?? []).map((f) => ({
    ...f,
    inputs: typeof f.inputs === "string" ? JSON.parse(f.inputs) : (f.inputs as FormulaInput[]),
  })) as Formula[];
}
