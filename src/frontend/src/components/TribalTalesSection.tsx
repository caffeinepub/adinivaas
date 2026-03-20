import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import FeedSection from "./FeedSection";

const mockTales = [
  {
    id: 1,
    image: "https://picsum.photos/seed/tale1/200/220",
    name: "Archana Kujur",
    role: "Choreographer",
    hasVideo: true,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/tale2/200/220",
    name: "Ritu Munda",
    role: "Folk Singer",
    hasVideo: true,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/tale3/200/220",
    name: "Arjun Oraon",
    role: "Storyteller",
    hasVideo: false,
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/tale4/200/220",
    name: "Kavita Horo",
    role: "Cultural Artist",
    hasVideo: true,
  },
];

export default function TribalTalesSection() {
  return (
    <FeedSection title="Tribal Tales">
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {mockTales.map((tale, idx) => (
          <motion.div
            key={tale.id}
            data-ocid={`tribal_tales.item.${idx + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="flex-shrink-0 w-40 bg-card rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            style={{
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              border: "1px solid oklch(0.89 0.032 68)",
            }}
          >
            <div className="relative">
              <img
                src={tale.image}
                alt={tale.name}
                className="w-full h-36 object-cover"
              />
              {tale.hasVideo && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                    style={{ background: "rgba(255,255,255,0.85)" }}
                  >
                    <Play
                      size={16}
                      style={{ color: "oklch(0.52 0.135 38)" }}
                      fill="oklch(0.52 0.135 38)"
                    />
                  </div>
                  <span className="text-white text-xs">Watch Intro</span>
                </div>
              )}
            </div>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={tale.image} alt={tale.name} />
                  <AvatarFallback className="text-xs bg-accent">
                    {tale.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p
                    className="text-xs text-foreground leading-tight"
                    style={{ fontWeight: 700 }}
                  >
                    {tale.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{tale.role}</p>
                </div>
              </div>
              <button
                type="button"
                className="text-xs hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.45 0.12 240)", fontWeight: 600 }}
              >
                View Profile &rsaquo;
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </FeedSection>
  );
}
