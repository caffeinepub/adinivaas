import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type React from "react";

interface FeedSectionProps {
  title: string;
  children: ReactNode;
  onSeeAll?: () => void;
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

export default function FeedSection({
  title,
  children,
  onSeeAll,
  icon: Icon,
}: FeedSectionProps) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2
          className="text-base text-foreground flex items-center gap-1.5"
          style={{ fontWeight: 700 }}
        >
          {Icon && (
            <Icon
              size={16}
              style={{ color: "oklch(0.52 0.135 38)", flexShrink: 0 }}
            />
          )}
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
