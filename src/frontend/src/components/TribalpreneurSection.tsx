import { motion } from "motion/react";
import FeedSection from "./FeedSection";

const mockBiz = [
  {
    id: 1,
    image: "https://picsum.photos/seed/biz1/280/180",
    business: "Jharkhand Organic Honey",
    owner: "Deepika Bhagat",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/biz2/280/180",
    business: "Tribal Handloom Studio",
    owner: "Vijay Soren",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/biz3/280/180",
    business: "Adivasi Spice House",
    owner: "Meena Hembram",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/biz4/280/180",
    business: "Vana Crafts Co.",
    owner: "Suresh Kerketta",
  },
];

export default function TribalpreneurSection() {
  return (
    <FeedSection title="Tribalpreneurs">
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {mockBiz.map((biz, idx) => (
          <motion.div
            key={biz.id}
            data-ocid={`tribalpreneurs.item.${idx + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="flex-shrink-0 w-44 bg-card rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            style={{
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              border: "1px solid oklch(0.89 0.032 68)",
            }}
          >
            <img
              src={biz.image}
              alt={biz.business}
              className="w-full h-28 object-cover"
            />
            <div className="px-3 py-3">
              <p
                className="text-xs text-foreground leading-tight mb-0.5"
                style={{ fontWeight: 700 }}
              >
                {biz.business}
              </p>
              <p className="text-xs text-muted-foreground mb-2">{biz.owner}</p>
              <button
                type="button"
                className="text-xs flex items-center gap-0.5 hover:opacity-70 transition-opacity"
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
