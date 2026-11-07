import type { SavingsPackage } from "./savings-types";
import SavingsCard from "./SavingsCard";

interface Props {
  savings: SavingsPackage[];
  onView: (item: SavingsPackage) => void;
  onActivate: (item: SavingsPackage) => void;
  onRetry: (item: SavingsPackage) => void;
  activatingSubscriptionId: string | null;
  retryingSubscriptionId: string | null;
}

export default function SavingsList({
  savings,
  onView,
  onActivate,
  onRetry,
  activatingSubscriptionId,
  retryingSubscriptionId,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {savings.map((item) => (
        <SavingsCard
          key={item.id}
          savings={item}
          onView={onView}
          onActivate={onActivate}
          onRetry={onRetry}
          isActivating={activatingSubscriptionId === item.id}
          isRetrying={retryingSubscriptionId === item.id}
        />
      ))}
    </div>
  );
}