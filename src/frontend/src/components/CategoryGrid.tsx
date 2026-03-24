import {
  BookMarked,
  BookOpen,
  Briefcase,
  Feather,
  HeartHandshake,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const categories = [
  { id: "latest", label: "LATEST", icon: Zap },
  { id: "tribal-tales", label: "TRIBAL TALES", icon: BookOpen },
  { id: "tribal-sangi", label: "TRIBAL SANGI", icon: HeartHandshake },
  { id: "tribalpreneurs", label: "TRIBALPRENEURS", icon: Briefcase },
  { id: "jobs", label: "JOBS", icon: Users },
  { id: "cultural", label: "CULTURAL", icon: Feather },
  { id: "ebook", label: "EBOOK", icon: BookMarked },
];

interface CategoryGridProps {
  onCategoryClick?: (id: string) => void;
}

export default function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="px-4 py-4">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isActive = activeId === cat.id;
          return (
            <motion.button
              key={cat.id}
              data-ocid={`category.${cat.id}.button`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              onClick={() => {
                setActiveId(isActive ? null : cat.id);
                onCategoryClick?.(cat.id);
              }}
              className="flex items-center gap-2 rounded-xl px-2 py-2.5 text-left active:scale-[0.97] transition-all cursor-pointer"
              style={{
                background: isActive
                  ? "oklch(0.52 0.15 145)"
                  : "oklch(0.82 0.04 55)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                border: isActive
                  ? "1px solid oklch(0.45 0.15 145)"
                  : "1px solid oklch(0.74 0.05 55)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: isActive
                    ? "oklch(0.42 0.15 145)"
                    : "oklch(0.72 0.06 55)",
                }}
              >
                <Icon
                  size={14}
                  style={{ color: isActive ? "white" : "oklch(0.25 0.07 40)" }}
                />
              </div>
              <span
                className="leading-tight font-bold uppercase"
                style={{
                  color: isActive ? "white" : "oklch(0.20 0.06 40)",
                  fontWeight: 700,
                  letterSpacing: "0.2px",
                  fontSize: "10px",
                }}
              >
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
