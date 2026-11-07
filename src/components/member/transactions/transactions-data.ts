import type { Transaction, TransactionDirection, TransactionType } from "./transactions-types";

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
  const rawType = getText(record, "type", "category", "transactionType").toLowerCase();
  if (rawType === "sweep" || /savings|contribution/.test(rawType)) return "savings";
  if (/deposit|top.?up|fund|add/.test(rawType)) return "added";
  if (/credit|incoming|inflow/.test(getText(record, "direction").toLowerCase())) return "added";
  return "other";
}

function normalizeDirection(record: RawTransaction, type: TransactionType): TransactionDirection {
  const direction = getText(record, "direction").toUpperCase();
  if (direction === "CREDIT" || direction === "DEBIT") return direction;
  return type === "added" ? "CREDIT" : "DEBIT";
}

function transactionTitle(record: RawTransaction, type: TransactionType) {
  const explicitTitle = getText(record, "title", "name", "transactionName");
  if (explicitTitle) return explicitTitle;

  const transactionType = getText(record, "type").toUpperCase();
  if (transactionType === "DEPOSIT") return "Wallet deposit";
  if (transactionType === "SWEEP") return "Savings transfer";
  if (transactionType === "REGISTRATION_FEE") return "Registration fee";
  return type === "added" ? "Money Added" : type === "savings" ? "Savings Payment" : "Wallet transaction";
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
      const direction = normalizeDirection(record, type);
      const title = transactionTitle(record, type);
      const dateValue = getText(record, "date", "createdAt", "transactionDate", "timestamp");
      const date = formatDate(dateValue);
      const program = getText(record, "program", "packageName", "planName");
      const detail = getText(record, "details", "narration", "description");
      const transactionKind = getText(record, "type").toUpperCase();
      const description = transactionKind === "SWEEP"
        ? direction === "DEBIT"
          ? "Moved from wallet balance"
          : "Moved into savings balance"
        : detail && detail !== title
          ? detail
          : type === "added" ? "Wallet funding" : type === "savings" ? "Savings contribution" : "Wallet transaction";
      const defaultProgram = transactionKind === "DEPOSIT"
        ? "Wallet funding"
        : transactionKind === "SWEEP"
          ? "Savings transfer"
          : transactionKind === "REGISTRATION_FEE"
            ? "Registration fee"
            : type === "added" ? "Wallet funding" : type === "savings" ? "Savings contribution" : "Wallet transaction";

      return {
        id: getText(record, "id", "transactionId", "_id") || `transaction-${index}`,
        type,
        direction,
        title,
        description,
        amount: getAmount(record),
        date: date.date,
        dateLabel: date.dateLabel,
        plan: getText(record, "plan", "subscriptionName", "accountName") || undefined,
        program: program || defaultProgram,
        method: getText(record, "method", "paymentMethod", "channel") || "Not specified",
        reference: getText(record, "reference", "referenceCode", "transactionReference") || "Not provided",
        receiptReference: getText(record, "receiptReference", "receiptNumber") || undefined,
        contributionLabel: transactionKind === "SWEEP"
          ? undefined
          : getText(record, "contributionLabel", "periodLabel") || undefined,
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
