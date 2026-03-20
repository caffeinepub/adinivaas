import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  "Foundational digital skills",
  "Career-ready modules",
  "Weekend workshops",
];

export default function EdTechSection() {
  return (
    <section className="px-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-base text-foreground flex items-center gap-1.5"
          style={{ fontWeight: 700 }}
        >
          <GraduationCap
            size={16}
            style={{ color: "oklch(0.52 0.135 38)", flexShrink: 0 }}
          />
          EdTech
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-2xl p-4"
        style={{
          border: "1.5px solid oklch(0.52 0.135 38 / 0.25)",
          boxShadow: "0 6px 18px rgba(163,74,46,0.08)",
          background:
            "linear-gradient(135deg, oklch(0.98 0.01 68), oklch(0.95 0.025 65))",
        }}
        data-ocid="edtech.card"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.92 0.06 40)" }}
            >
              <GraduationCap
                size={20}
                style={{ color: "oklch(0.52 0.135 38)" }}
              />
            </div>
            <div>
              <h3
                className="text-sm text-foreground"
                style={{ fontWeight: 700 }}
              >
                EdTech Platform
              </h3>
              <p className="text-xs text-muted-foreground">
                Learn. Grow. Thrive.
              </p>
            </div>
          </div>
          <Badge
            className="text-xs px-2 py-0.5 flex items-center gap-1"
            style={{
              background: "oklch(0.72 0.16 145)",
              color: "white",
              border: "none",
            }}
          >
            <Clock size={10} /> Coming Soon
          </Badge>
        </div>
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckCircle2
                size={15}
                style={{ color: "oklch(0.52 0.135 38)", flexShrink: 0 }}
              />
              <span className="text-sm text-foreground">{f}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 w-full py-2.5 rounded-xl text-sm transition-opacity hover:opacity-80"
          style={{
            background: "oklch(0.72 0.16 145)",
            color: "white",
            fontWeight: 600,
          }}
          data-ocid="edtech.primary_button"
        >
          Get Early Access
        </button>
      </motion.div>
    </section>
  );
}
