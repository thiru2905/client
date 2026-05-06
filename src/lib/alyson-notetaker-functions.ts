import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPersistedSession, persistSession } from "@/lib/notetaker-datastore.server";

const BotIdInput = z.object({ botId: z.string().min(1) });
const CreateBotInput = z.object({
  meeting_url: z.string().min(1),
  bot_name: z.string().min(1),
  title: z.string().optional(),
});
const NotesInput = z.object({ botId: z.string().min(1), prompt: z.string().optional() });

function baseUrl() {
  const raw =
    process.env.ALYSON_NOTETAKER_BASE_URL ||
    process.env.VITE_ALYSON_NOTETAKER_BASE_URL ||
    // backward compat
    process.env.TEST_BOTV2_BASE_URL ||
    process.env.VITE_TEST_BOTV2_BASE_URL ||
    "http://localhost:3003";
  return String(raw).replace(/\/$/, "");
}

async function upstream(path: string, init?: RequestInit) {
  const url = `${baseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const r = await fetch(url, init);
  const contentType = r.headers.get("content-type") || "";
  const text = await r.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // ignore
  }
  if (contentType.includes("text/html") || (text && text.trim().startsWith("<!DOCTYPE html"))) {
    throw new Error(
      `Notetaker API returned HTML (wrong base URL or server not running). ` +
        `Check ALYSON_NOTETAKER_BASE_URL/VITE_ALYSON_NOTETAKER_BASE_URL (currently: ${baseUrl()}).`,
    );
  }
  if (!r.ok) {
    const msg = json?.error ? String(json.error) : text || `Request failed (${r.status})`;
    throw new Error(msg);
  }
  return json;
}

export type NotetakerSession = {
  botId: string;
  title: string;
  meetingUrl?: string;
  botName?: string;
  createdAt: string;
  status?: string;
};

export type NotetakerTranscriptLine = {
  received_at: string;
  event: string;
  text?: string;
  participant?: { id?: string; name?: string } | null;
  initials?: string;
  clock?: string;
};

export const listNotetakerSessions = createServerFn({ method: "GET" }).handler(async () => {
  const data = await upstream("/api/sessions");
  return data as {
    sessions: NotetakerSession[];
    hasRecallConfig: boolean;
    hasGroqConfig: boolean;
  };
});

export const getNotetakerSession = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => BotIdInput.parse(data))
  .handler(async ({ data }) => {
    const res = await upstream(`/api/session/${encodeURIComponent(data.botId)}`);
    const typed = res as {
      session: NotetakerSession;
      lines: NotetakerTranscriptLine[];
      participantCount: number;
      startedLabel: string;
      hasRecallConfig: boolean;
      hasGroqConfig: boolean;
    };

    // Write-on-finish persistence:
    // If upstream marks the meeting as ended (or equivalent), persist transcript+notes once.
    const st = String(typed.session?.status || "").toLowerCase();
    const ended = ["ended", "completed", "disconnected", "left", "finished"].includes(st);
    if (ended && typed.session?.botId) {
      const existing = await getPersistedSession(typed.session.botId);
      if (!existing?.finalizedAt) {
        let notes: { notes: string; model?: string } | null = null;
        try {
          notes = (await upstream(`/api/session/${encodeURIComponent(data.botId)}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "" }),
          })) as any;
        } catch {
          // Notes generation can fail; transcript persistence should still work.
        }
        await persistSession({ session: typed.session, lines: typed.lines ?? [], notes });
      }
    }

    return typed;
  });

export const finalizeNotetakerSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BotIdInput.parse(data))
  .handler(async ({ data }) => {
    const res = (await upstream(`/api/session/${encodeURIComponent(data.botId)}`)) as {
      session: NotetakerSession;
      lines: NotetakerTranscriptLine[];
    };
    let notes: { notes: string; model?: string } | null = null;
    try {
      notes = (await upstream(`/api/session/${encodeURIComponent(data.botId)}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "" }),
      })) as any;
    } catch {
      // ignore
    }
    const persisted = await persistSession({ session: res.session, lines: res.lines ?? [], notes });
    return { persisted };
  });

export const createNotetakerRecallBot = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => CreateBotInput.parse(data))
  .handler(async ({ data }) => {
    const payload = { meeting_url: data.meeting_url, bot_name: data.bot_name, title: data.title ?? "Live meeting" };
    const res = await upstream("/api/create-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res;
  });

export const generateNotetakerNotes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => NotesInput.parse(data))
  .handler(async ({ data }) => {
    const res = await upstream(`/api/session/${encodeURIComponent(data.botId)}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: data.prompt ?? "" }),
    });
    return res as { notes: string; model: string };
  });

