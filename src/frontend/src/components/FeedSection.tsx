import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface FeedSectionProps {
  title: string;
  children: ReactNode;
  onSeeAll?: () => void;
}

export default function FeedSection({
  title,
  children,
  onSeeAll,
}: FeedSectionProps) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base text-foreground" style={{ fontWeight: 700 }}>
          {title}
        </h2>
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-0.5 text-xs hover:opacity-70 transition-opacity"
          style={{ color: "oklch(0.52 0.135 38)", fontWeight: 600 }}
        >
          See all <ChevronRight size={14} />
        </button>
      </div>
      {children}
    </section>
  );
}
