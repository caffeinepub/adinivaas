import { BookOpen, Briefcase, Music, Palette, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  { id: "latest", label: "Latest", icon: Zap },
  { id: "tribal-tales", label: "Tribal Tales", icon: BookOpen },
  { id: "tribal-sangi", label: "Tribal Sangi", icon: Music },
  { id: "tribalpreneurs", label: "Tribalpreneurs", icon: Briefcase },
  { id: "jobs", label: "Jobs", icon: Users },
  { id: "cultural", label: "Cultural", icon: Palette },
];

export default function CategoryGrid() {
  return (
    <section className="px-4 py-4">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              data-ocid={`category.${cat.id}.button`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 bg-card rounded-xl px-3 py-3 text-left hover:bg-accent/50 active:scale-[0.97] transition-all cursor-pointer"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid oklch(0.89 0.032 68)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.92 0.04 40)" }}
              >
                <Icon size={16} style={{ color: "oklch(0.52 0.135 38)" }} />
              </div>
              <span className="text-sm font-600 text-foreground leading-tight">
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
