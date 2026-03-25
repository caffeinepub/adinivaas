import { HeartHandshake, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import FeedSection from "./FeedSection";

const TEASER_PROFILES = [
  {
    id: 1,
    name: "Priya",
    age: 24,
    tribe: "Gond",
    avatar: "https://picsum.photos/seed/spriya1/400/600",
    distance: "8 km away",
    qualification: "B.A. Arts",
    matchedInterests: ["🎵 Music", "🌿 Nature"],
    matchedHobbies: ["🏺 Pottery"],
  },
  {
    id: 2,
    name: "Arjun",
    age: 27,
    tribe: "Bhil",
    avatar: "https://picsum.photos/seed/sarjun2/400/600",
    distance: "23 km away",
    qualification: "12th Pass",
    matchedInterests: ["🎨 Crafts", "📖 Folklore"],
    matchedHobbies: ["🏹 Archery"],
  },
  {
    id: 3,
    name: "Meena",
    age: 22,
    tribe: "Munda",
    avatar: "https://picsum.photos/seed/smeena3/400/600",
    distance: "45 km away",
    qualification: "Diploma - Nursing",
    matchedInterests: ["💃 Dance", "🌿 Nature"],
    matchedHobbies: ["🍳 Cooking"],
  },
];

export default function TribalSangiSection({
  onOpenSangi,
}: { onOpenSangi?: () => void }) {
  return (
    <FeedSection title="Tribal Sangi" icon={HeartHandshake}>
      <div className="px-4 pb-2">
        {/* Section subtitle */}
        <p className="text-xs mb-3" style={{ color: "oklch(0.50 0.10 145)" }}>
          Find your tribal match 💞
        </p>

        {/* Teaser Profile Cards */}
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {TEASER_PROFILES.map((profile) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm"
              style={{
                width: "175px",
                border: "1px solid oklch(0.88 0.05 145)",
                borderLeftWidth: "4px",
                borderLeftColor: "oklch(0.55 0.16 145)",
              }}
            >
              {/* Photo */}
              <div className="relative" style={{ height: "120px" }}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                {/* Distance badge */}
                <div
                  className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "oklch(0.40 0.14 145)", color: "white" }}
                >
                  📍 {profile.distance}
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5">
                {/* Name + Age */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.25 0.08 55)" }}
                  >
                    {profile.name}, {profile.age}
                  </span>
                </div>

                {/* Tribe badge */}
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "oklch(0.88 0.04 55)",
                    color: "oklch(0.40 0.10 55)",
                  }}
                >
                  🏡 {profile.tribe}
                </span>

                {/* Qualification */}
                <p
                  className="text-xs mt-2 mb-1.5"
                  style={{ color: "oklch(0.50 0.06 55)" }}
                >
                  🎓 {profile.qualification}
                </p>

                {/* Matched Interests */}
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "oklch(0.40 0.14 145)" }}
                >
                  Interests Match
                </p>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {profile.matchedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: "oklch(0.93 0.04 145)",
                        color: "oklch(0.35 0.12 145)",
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Matched Hobbies */}
                {profile.matchedHobbies.length > 0 && (
                  <>
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{ color: "oklch(0.42 0.08 55)" }}
                    >
                      Hobbies Match
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {profile.matchedHobbies.map((hobby) => (
                        <span
                          key={hobby}
                          className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{
                            background: "oklch(0.88 0.04 55)",
                            color: "oklch(0.40 0.10 55)",
                          }}
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* Message button */}
                <button
                  type="button"
                  onClick={onOpenSangi}
                  className="w-full py-1.5 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1 mt-1"
                  style={{ background: "oklch(0.55 0.16 145)" }}
                  data-ocid="tribal_sangi.primary_button"
                >
                  <MessageCircle size={12} /> Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Options button */}
        <div className="flex justify-center mt-3">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("section-tribal-sangi")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all"
            style={{
              borderColor: "oklch(0.55 0.16 145)",
              color: "oklch(0.40 0.14 145)",
              background: "oklch(0.97 0.02 145)",
            }}
            data-ocid="tribal_sangi.secondary_button"
          >
            See More Options →
          </button>
        </div>
      </div>
    </FeedSection>
  );
}
