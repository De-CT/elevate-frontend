import type { Transaction, TransactionStatus, TransactionType } from "./transactions-types";

type RawTransaction = Record<string, unknown>;

const getText = (record: RawTransaction, ...keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
};

const getAmount = (record: RawTransaction) => {
  const value = record.amount ?? record.value ?? record.transactionAmount;
  if (typeof value === "number") return Math.abs(value);
  if (typeof value === "string") {
    const amount = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(amount) ? Math.abs(amount) : 0;
  }
  return 0;
};

function normalizeType(record: RawTransaction): TransactionType {
  const rawType = getText(record, "type", "direction", "category", "transactionType").toLowerCase();
  return /credit|deposit|top.?up|fund|add|incoming|inflow/.test(rawType)
    ? "added"
    : "savings";
}

function normalizeStatus(value: string): TransactionStatus {
  const status = value.toLowerCase();
  if (/fail|reject|revers/.test(status)) return "failed";
  if (/pending|process/.test(status)) return "pending";
  if (/paid/.test(status)) return "paid";
  if (/success|complete|approved/.test(status)) return "successful";
  return "unknown";
}

function formatDate(value: string) {
  if (!value) return { date: "", dateLabel: "Date unavailable" };
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return { date: value, dateLabel: value };
  return {
    date: parsed.toISOString(),
    dateLabel: new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsed),
  };
}

export function normalizeTransactions(response: unknown): Transaction[] {
  const outerPayload = Array.isArray(response)
    ? response
    : response && typeof response === "object"
      ? ((response as RawTransaction).transactions ?? (response as RawTransaction).data)
      : [];
  const payload = !Array.isArray(outerPayload) && outerPayload && typeof outerPayload === "object"
    ? ((outerPayload as RawTransaction).transactions ?? (outerPayload as RawTransaction).data)
    : outerPayload;
  if (!Array.isArray(payload)) return [];

  return payload
    .filter((item): item is RawTransaction => Boolean(item) && typeof item === "object")
    .map((record, index) => {
      const type = normalizeType(record);
      const title = getText(record, "title", "name", "transactionName", "description")
        || (type === "added" ? "Money Added" : "Savings Payment");
      const dateValue = getText(record, "date", "createdAt", "transactionDate", "timestamp");
      const date = formatDate(dateValue);
      const rawStatus = getText(record, "status", "state");
      const program = getText(record, "program", "packageName", "planName");
      const detail = getText(record, "details", "narration", "description");

      return {
        id: getText(record, "id", "transactionId", "_id") || `transaction-${index}`,
        type,
        title,
        description: detail && detail !== title
          ? detail
          : type === "added" ? "Wallet funding" : "Savings contribution",
        amount: getAmount(record),
        status: normalizeStatus(rawStatus),
        date: date.date,
        dateLabel: date.dateLabel,
        plan: getText(record, "plan", "subscriptionName", "accountName") || undefined,
        program: program || (type === "added" ? "Wallet funding" : "Savings contribution"),
        method: getText(record, "method", "paymentMethod", "channel") || "Not specified",
        reference: getText(record, "reference", "referenceCode", "transactionReference") || "Not provided",
        receiptReference: getText(record, "receiptReference", "receiptNumber") || undefined,
        contributionLabel: getText(record, "contributionLabel", "periodLabel") || undefined,
      };
    })
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
}

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
