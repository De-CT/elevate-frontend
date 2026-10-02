"use client";

import { useMemo, useState } from "react";
import SupportHeader from "./SupportHeader";
import SupportSearch from "./SupportSearch";
import SupportCategories from "./SupportCategories";
import FAQSection from "./FAQSection";
import ContactSupport from "./ContactSupport";
import { faqs, supportCategories } from "./support-data";
import { SupportCategoryId } from "./support-types";
import { useUserStore } from "@/store/useUserStore";

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<SupportCategoryId | "all">("all");
  const user = useUserStore((state) => state.user);

  const filteredFAQs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const selectCategory = (category: SupportCategoryId) => {
    setActiveCategory(category);
    setSearch("");
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <SupportHeader />

      <SupportSearch value={search} onChange={setSearch} />

      <SupportCategories
        categories={supportCategories}
        onSelect={selectCategory}
      />

      <FAQSection
        faqs={filteredFAQs}
        activeCategory={activeCategory}
        onClear={() => {
          setActiveCategory("all");
          setSearch("");
        }}
      />

      <ContactSupport user={user} />
    </main>
  );
}