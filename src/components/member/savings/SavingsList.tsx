import type { SavingsPackage } from "./savings-types";
import SavingsCard from "./SavingsCard";

interface Props {
  savings: SavingsPackage[];
  onView: (item: SavingsPackage) => void;
  onActivate: (item: SavingsPackage) => void;
  activatingSubscriptionId: string | null;
}

export default function SavingsList({
  savings,
  onView,
  onActivate,
  activatingSubscriptionId,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {savings.map((item) => (
        <SavingsCard
          key={item.id}
          savings={item}
          onView={onView}
          onActivate={onActivate}
          isActivating={activatingSubscriptionId === item.id}
        />
      ))}
    </div>
  );
}