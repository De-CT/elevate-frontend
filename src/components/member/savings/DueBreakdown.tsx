import { formatMoney } from "./savings-utils";

export default function DueBreakdown({
  label,
  amount,
  lateFee,
}: {
  label: string;
  amount: string | number;
  lateFee?: string;
}) {
  const total = Number(amount);
  const fee = Number(lateFee ?? 0);

  if (!Number.isFinite(total)) return null;

  return (
    <p className="text-xs text-on-surface-variant">
      {label}:{" "}
      {fee > 0
        ? `${formatMoney(total)} (includes ${formatMoney(fee)} late fee)`
        : formatMoney(total)}
    </p>
  );
}
