import {
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  CreditCard,
  ReceiptText,
  Wallet,
  UserRound,
} from "lucide-react";
import SupportCategoryCard from "./SupportCategoryCard";
import { SupportCategory } from "./support-types";

type Props = {
  categories: SupportCategory[];
  onSelect: (id: SupportCategory["id"]) => void;
};

const icons = {
  wallet: Wallet,
  savings: CreditCard,
  user: UserRound,
  receipt: ReceiptText,
  book: BookOpen,
  help: CircleHelp,
};

export default function SupportCategories({ categories, onSelect }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Explore by Category
        </h2>
        <ArrowUpRight size={19} className="text-secondary-accent" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = icons[category.icon];

          return (
            <SupportCategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={<Icon size={24} />}
              onClick={() => onSelect(category.id)}
            />
          );
        })}
      </div>
    </section>
  );
}