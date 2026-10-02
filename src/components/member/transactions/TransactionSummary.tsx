import { ArrowDownLeft, Wallet, PiggyBank } from "lucide-react";
import { formatNaira } from "./transactions-data";
import type { Transaction } from "./transactions-types";
import SummaryCard from "./SummaryCard";

export default function TransactionSummary({
  transactions,
  walletBalance,
}: {
  transactions: Transaction[];
  walletBalance: number;
}) {
  const settledTransactions = transactions.filter(
    (transaction) => transaction.status === "paid" || transaction.status === "successful"
  );
  const amountAdded = settledTransactions
    .filter((transaction) => transaction.type === "added")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const savingsPaid = settledTransactions
    .filter((transaction) => transaction.type === "savings")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const addedCount = settledTransactions.filter((transaction) => transaction.type === "added").length;
  const savingsCount = settledTransactions.filter((transaction) => transaction.type === "savings").length;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        label="Total Money Added"
        amount={formatNaira(amountAdded)}
        description={`${addedCount} ${addedCount === 1 ? "wallet transfer" : "wallet transfers"}`}
        icon={ArrowDownLeft}
        accent="secondary"
      />
      <SummaryCard
        label="Paid to Savings"
        amount={formatNaira(savingsPaid)}
        description={`${savingsCount} ${savingsCount === 1 ? "savings payment" : "savings payments"}`}
        icon={PiggyBank}
        accent="primary"
      />
      <SummaryCard
        label="Current Elevate Wallet"
        amount={formatNaira(walletBalance)}
        description="Available for your next payment"
        icon={Wallet}
        accent="tertiary"
      />
    </section>
  );
}