import type { SavingsPackage } from "./savings-types";
import SavingsCard from "./SavingsCard";

interface Props {
  savings: SavingsPackage[];
  onView: (item: SavingsPackage) => void;
}

export default function SavingsList({ savings, onView }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {savings.map((item) => (
        <SavingsCard key={item.id} savings={item} onView={onView} />
      ))}
    </div>
  );
}