import type { WalletTransaction } from "./wallet-types";

type WalletHistoryRecord = {
  id: string;
  type: string;
  direction: "CREDIT" | "DEBIT";
  amount: number;
  sourceType: string;
  sourceId: string;
  narration: string;
  createdAt: string;
};

function getHistoryRecords(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;
  if (!response || typeof response !== "object") {
    throw new Error("The wallet history response is not a valid list.");
  }

  const record = response as Record<string, unknown>;
  const nested = record.transactions ?? record.data;
  if (Array.isArray(nested)) return nested;
  if (nested && typeof nested === "object") return getHistoryRecords(nested);
  throw new Error("The wallet history response is not a valid list.");
}

function requiredText(record: Record<string, unknown>, key: string, index: number) {
  const value = record[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Wallet history item ${index + 1} is missing ${key}.`);
  }
  return value.trim();
}

function requiredAmount(record: Record<string, unknown>, key: string, index: number) {
  const value = record[key];
  const amount = typeof value === "number" ? value : Number(value);
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && !value.trim()) ||
    !Number.isFinite(amount)
  ) {
    throw new Error(`Wallet history item ${index + 1} has an invalid ${key}.`);
  }
  return amount;
}

function normalizeRecord(value: unknown, index: number): WalletHistoryRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Wallet history item ${index + 1} is invalid.`);
  }

  const record = value as Record<string, unknown>;
  const direction = requiredText(record, "direction", index);
  if (direction !== "CREDIT" && direction !== "DEBIT") {
    throw new Error(`Wallet history item ${index + 1} has an invalid direction.`);
  }

  const createdAt = requiredText(record, "createdAt", index);
  if (Number.isNaN(new Date(createdAt).getTime())) {
    throw new Error(`Wallet history item ${index + 1} has an invalid createdAt date.`);
  }

  return {
    id: requiredText(record, "id", index),
    type: requiredText(record, "type", index),
    direction,
    amount: requiredAmount(record, "amount", index),
    sourceType: typeof record.sourceType === "string" ? record.sourceType : "",
    sourceId: typeof record.sourceId === "string" ? record.sourceId : "",
    narration: typeof record.narration === "string" ? record.narration : "",
    createdAt,
  };
}

function transactionTitle(type: string) {
  switch (type.toUpperCase()) {
    case "DEPOSIT":
      return "Wallet deposit";
    case "SWEEP":
      return "Savings transfer";
    case "REGISTRATION_FEE":
      return "Registration fee";
    default:
      return type.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function normalizeWalletHistory(response: unknown): WalletTransaction[] {
  return getHistoryRecords(response)
    .map(normalizeRecord)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .map((record) => {
      const description = record.type.toUpperCase() === "SWEEP"
        ? record.direction === "DEBIT"
          ? "Moved from wallet balance"
          : "Moved into savings balance"
        : record.narration || transactionTitle(record.type);

      return {
        id: record.id,
        type: record.direction === "CREDIT" ? "in" : "out",
        title: transactionTitle(record.type),
        description,
        amount: record.amount,
        date: formatDate(record.createdAt),
        status: "Completed",
        reference: record.id,
        method: record.sourceType ? record.sourceType.replaceAll("_", " ") : "Wallet transaction",
        details: description,
        sourceType: record.sourceType,
        sourceId: record.sourceId,
      };
    });
}
