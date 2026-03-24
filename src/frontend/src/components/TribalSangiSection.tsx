import { HeartHandshake, Lock } from "lucide-react";
import { motion } from "motion/react";
import FeedSection from "./FeedSection";

const mockSangi = [
  { id: 1, image: "https://picsum.photos/seed/sangi1/200/200" },
  { id: 2, image: "https://picsum.photos/seed/sangi2/200/200" },
  { id: 3, image: "https://picsum.photos/seed/sangi3/200/200" },
  { id: 4, image: "https://picsum.photos/seed/sangi4/200/200" },
];

export default function TribalSangiSection() {
  return (
    <FeedSection title="Tribal Sangi" icon={HeartHandshake}>
      <div className="px-4">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1.5px solid oklch(0.89 0.032 68)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <div className="grid grid-cols-2 gap-1">
            {mockSangi.map((item, idx) => (
              <div
                key={item.id}
                className="relative"
                data-ocid={`tribal_sangi.item.${idx + 1}`}
              >
                <img
                  src={item.image}
                  alt="Premium content"
                  className="w-full h-24 object-cover"
                  style={{ filter: "blur(8px)", transform: "scale(1.05)" }}
                />
              </div>
            ))}
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{
              background: "rgba(244, 235, 221, 0.75)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.13 145)",
                boxShadow: "0 4px 12px rgba(60,160,80,0.30)",
              }}
            >
              <Lock size={22} color="white" />
            </div>
            <div className="text-center px-4">
              <p
                className="text-sm font-700 text-foreground mb-1"
                style={{ fontWeight: 700 }}
              >
                Premium Content
              </p>
              <p className="text-xs text-muted-foreground">
                Subscribe to unlock Tribal Sangi
              </p>
              <p
                className="text-xs mt-1.5 px-2 py-1 rounded-lg"
                style={{
                  color: "oklch(0.45 0.10 40)",
                  background: "oklch(0.95 0.03 68)",
                  fontWeight: 500,
                  border: "1px solid oklch(0.85 0.05 68)",
                }}
              >
                📋 Adhar Card / ST Certificate is mandatory for verification
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="px-6 py-2.5 rounded-full text-sm font-600 text-white transition-opacity hover:opacity-90"
              style={{ background: "oklch(0.62 0.14 145)", fontWeight: 600 }}
              data-ocid="tribal_sangi.primary_button"
            >
              Subscribe Now
            </motion.button>
          </div>
        </div>
      </div>
    </FeedSection>
  );
}
