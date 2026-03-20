import { Image, Play } from "lucide-react";
import { motion } from "motion/react";
import FeedSection from "./FeedSection";

const mockCultural = [
  {
    id: 1,
    image: "https://picsum.photos/seed/culture1/280/180",
    type: "Video",
    title: "Jhumur Dance – Eastern Tribal Tradition",
    category: "Dance",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/culture2/280/180",
    type: "Images",
    title: "Tribal Textile Exhibition 2025",
    category: "Exhibition",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/culture3/280/180",
    type: "Video",
    title: "Makar Sankranti Tribal Feast",
    category: "Festival",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/culture4/280/180",
    type: "Images",
    title: "Sacred Grove Conservation Drive",
    category: "Cultural",
  },
];

export default function CulturalFeedSection() {
  return (
    <FeedSection title="Cultural Feed">
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {mockCultural.map((item, idx) => (
          <motion.div
            key={item.id}
            data-ocid={`cultural.item.${idx + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="flex-shrink-0 w-44 bg-card rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            style={{
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              border: "1px solid oklch(0.89 0.032 68)",
            }}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-28 object-cover"
              />
              <span
                className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-600 text-white"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {item.type === "Video" ? (
                  <Play size={10} fill="white" />
                ) : (
                  <Image size={10} />
                )}
                {item.type}
              </span>
              <span
                className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "oklch(0.52 0.135 38 / 0.85)",
                  color: "white",
                }}
              >
                {item.category}
              </span>
            </div>
            <div className="px-3 py-3">
              <p
                className="text-xs font-700 text-foreground leading-tight"
                style={{ fontWeight: 700 }}
              >
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </FeedSection>
  );
}
