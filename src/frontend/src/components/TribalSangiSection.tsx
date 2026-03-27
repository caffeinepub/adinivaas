import {
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
} from "lucide-react";
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
    verified: true,
    totem: "Eagle",
    faith: "Sarna",
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
    verified: false,
    totem: "Tiger",
    faith: "Hindu",
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
    verified: true,
    totem: "Deer",
    faith: "Sarna",
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
        <p className="text-xs mb-3" style={{ color: "oklch(0.52 0.18 30)" }}>
          Discover meaningful tribal connections 💞
        </p>

        {/* Teaser Profile Cards */}
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {TEASER_PROFILES.map((profile, idx) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
              style={{
                width: "175px",
                background: "oklch(0.97 0.02 75)",
                border: "1px solid oklch(0.88 0.05 55)",
                borderTopWidth: "3px",
                borderTopColor: "oklch(0.52 0.18 30)",
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
                  className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "oklch(0.52 0.18 30)", color: "white" }}
                >
                  <MapPin size={9} /> {profile.distance}
                </div>
                {/* Verified */}
                {profile.verified && (
                  <div
                    className="absolute top-2 left-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(34,197,94,0.85)",
                      color: "white",
                    }}
                  >
                    <CheckCircle2 size={9} /> Verified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-2.5">
                {/* Name + Age */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-black text-sm"
                    style={{ color: "oklch(0.28 0.10 55)" }}
                  >
                    {profile.name}, {profile.age}
                  </span>
                </div>

                {/* Tribe + totem row */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "oklch(0.90 0.05 55)",
                      color: "oklch(0.40 0.10 55)",
                    }}
                  >
                    🏕 {profile.tribe}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "oklch(0.92 0.04 38)",
                      color: "oklch(0.40 0.12 38)",
                    }}
                  >
                    🦅 {profile.totem}
                  </span>
                </div>

                {/* Faith + qualification */}
                <p
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.50 0.06 55)" }}
                >
                  🙏 {profile.faith} &nbsp;·&nbsp; 🎓 {profile.qualification}
                </p>

                {/* Matched Interests */}
                <p
                  className="text-xs font-bold mb-1"
                  style={{ color: "oklch(0.52 0.18 30)" }}
                >
                  Interests Match
                </p>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {profile.matchedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: "oklch(0.90 0.04 145)",
                        color: "oklch(0.30 0.12 145)",
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
                      className="text-xs font-bold mb-1"
                      style={{ color: "oklch(0.40 0.10 55)" }}
                    >
                      Hobbies Match
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {profile.matchedHobbies.map((hobby) => (
                        <span
                          key={hobby}
                          className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{
                            background: "oklch(0.90 0.05 55)",
                            color: "oklch(0.40 0.10 55)",
                          }}
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* View Profile button */}
                <button
                  type="button"
                  onClick={onOpenSangi}
                  className="w-full py-1.5 rounded-full text-xs font-bold text-white flex items-center justify-center gap-1 mt-1"
                  style={{ background: "oklch(0.52 0.18 30)" }}
                  data-ocid="tribal_sangi.primary_button"
                >
                  <MessageCircle size={11} /> View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification notice */}
        <div
          className="mt-3 px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: "oklch(0.93 0.04 38)" }}
        >
          <CheckCircle2 size={14} style={{ color: "oklch(0.52 0.18 30)" }} />
          <p
            className="text-xs font-semibold"
            style={{ color: "oklch(0.40 0.12 38)" }}
          >
            Aadhaar Card / ST Certificate is mandatory for verification
          </p>
        </div>

        {/* See More Options button */}
        <div className="flex justify-center mt-3">
          <button
            type="button"
            onClick={onOpenSangi}
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all"
            style={{ background: "oklch(0.35 0.10 55)" }}
            data-ocid="tribal_sangi.secondary_button"
          >
            See More Options →
          </button>
        </div>
      </div>
    </FeedSection>
  );
}
