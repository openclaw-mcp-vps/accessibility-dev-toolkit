import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "payments.json");

type PaymentRecord = {
  sessionId: string;
  paid: boolean;
  orderId?: string;
  updatedAt: string;
};

type PaymentState = {
  records: PaymentRecord[];
};

async function readState(): Promise<PaymentState> {
  try {
    const raw = await fs.readFile(dbPath, "utf8");
    const parsed = JSON.parse(raw) as PaymentState;
    return parsed.records ? parsed : { records: [] };
  } catch {
    return { records: [] };
  }
}

async function writeState(state: PaymentState): Promise<void> {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(state, null, 2), "utf8");
}

export async function markSessionPaid(sessionId: string, orderId?: string) {
  const state = await readState();
  const now = new Date().toISOString();
  const idx = state.records.findIndex((x) => x.sessionId === sessionId);

  if (idx >= 0) {
    state.records[idx] = { ...state.records[idx], paid: true, orderId, updatedAt: now };
  } else {
    state.records.push({ sessionId, paid: true, orderId, updatedAt: now });
  }

  await writeState(state);
}

export async function isSessionPaid(sessionId: string) {
  const state = await readState();
  return state.records.some((x) => x.sessionId === sessionId && x.paid);
}
