import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MapPin, MessageCircle, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  tribe: string;
  avatar: string;
  interests: string[];
  bio: string;
  location?: string;
  languages?: string;
  memberSince?: string;
}

const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Priya",
    age: 24,
    tribe: "Gond",
    avatar: "https://picsum.photos/seed/spriya1/400/600",
    interests: ["Tribal Arts", "Music", "Farming"],
    bio: "Lover of traditional Gond art and forest walks 🌿",
    location: "Raipur, Chhattisgarh",
    languages: "Hindi, Gondi",
    memberSince: "Adinivaas since 2023",
  },
  {
    id: 2,
    name: "Arjun",
    age: 27,
    tribe: "Bhil",
    avatar: "https://picsum.photos/seed/sarjun2/400/600",
    interests: ["Archery", "Folklore", "Crafts"],
    bio: "Passionate about preserving Bhil traditions 🏹",
    location: "Udaipur, Rajasthan",
    languages: "Hindi, Bhili",
    memberSince: "Adinivaas since 2022",
  },
  {
    id: 3,
    name: "Meena",
    age: 22,
    tribe: "Munda",
    avatar: "https://picsum.photos/seed/smeena3/400/600",
    interests: ["Dance", "Nature", "Cooking"],
    bio: "Dancing to the rhythm of tribal beats 💃",
    location: "Ranchi, Jharkhand",
    languages: "Hindi, Mundari",
    memberSince: "Adinivaas since 2024",
  },
  {
    id: 4,
    name: "Ravi",
    age: 28,
    tribe: "Santali",
    avatar: "https://picsum.photos/seed/sravi4/400/600",
    interests: ["Music", "Agriculture", "Stories"],
    bio: "Playing the banam and growing organic crops 🎵",
    location: "Dumka, Jharkhand",
    languages: "Hindi, Santali",
    memberSince: "Adinivaas since 2022",
  },
  {
    id: 5,
    name: "Sita",
    age: 25,
    tribe: "Warli",
    avatar: "https://picsum.photos/seed/ssita5/400/600",
    interests: ["Painting", "Yoga", "Heritage"],
    bio: "Warli art runs in my veins 🎨",
    location: "Palghar, Maharashtra",
    languages: "Hindi, Warli, Marathi",
    memberSince: "Adinivaas since 2023",
  },
  {
    id: 6,
    name: "Dev",
    age: 26,
    tribe: "Korku",
    avatar: "https://picsum.photos/seed/sdev6/400/600",
    interests: ["Herbal Medicine", "Forest", "Music"],
    bio: "Learning from nature every single day 🌱",
    location: "Betul, Madhya Pradesh",
    languages: "Hindi, Korku",
    memberSince: "Adinivaas since 2023",
  },
  {
    id: 7,
    name: "Kavya",
    age: 23,
    tribe: "Halbi",
    avatar: "https://picsum.photos/seed/skavya7/400/600",
    interests: ["Weaving", "Travel", "Food"],
    bio: "Weaving stories with threads and words 🧵",
    location: "Jagdalpur, Chhattisgarh",
    languages: "Hindi, Halbi",
    memberSince: "Adinivaas since 2024",
  },
  {
    id: 8,
    name: "Mohan",
    age: 29,
    tribe: "Gond",
    avatar: "https://picsum.photos/seed/smohan8/400/600",
    interests: ["Farming", "Photography", "Arts"],
    bio: "Capturing the beauty of tribal life 📷",
    location: "Mandla, Madhya Pradesh",
    languages: "Hindi, Gondi",
    memberSince: "Adinivaas since 2022",
  },
  {
    id: 9,
    name: "Lata",
    age: 24,
    tribe: "Bhil",
    avatar: "https://picsum.photos/seed/slata9/400/600",
    interests: ["Singing", "Rituals", "Crafts"],
    bio: "My voice carries ancestral songs 🎶",
    location: "Dhar, Madhya Pradesh",
    languages: "Hindi, Bhili",
    memberSince: "Adinivaas since 2023",
  },
  {
    id: 10,
    name: "Suresh",
    age: 30,
    tribe: "Munda",
    avatar: "https://picsum.photos/seed/ssuresh10/400/600",
    interests: ["Wrestling", "Nature", "Community"],
    bio: "Strong roots, stronger future 💪",
    location: "Khunti, Jharkhand",
    languages: "Hindi, Mundari",
    memberSince: "Adinivaas since 2021",
  },
];

const SPARKLES = ["💞", "✨", "🌸", "💫"];
const SPARKLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 17 + 5) % 100,
  top: (i * 23 + 10) % 100,
  duration: 2 + (i % 3),
  delay: (i % 5) * 0.4,
  emoji: SPARKLES[i % 4],
}));

const INTEREST_COLORS = [
  "oklch(0.92 0.04 38)",
  "oklch(0.92 0.04 145)",
  "oklch(0.92 0.04 260)",
];

const INTEREST_TEXT_COLORS = [
  "oklch(0.35 0.1 38)",
  "oklch(0.3 0.1 145)",
  "oklch(0.3 0.1 260)",
];

interface SangiDatingPageProps {
  onStartChat?: (name: string, avatar: string) => void;
}

export default function SangiDatingPage({ onStartChat }: SangiDatingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [exiting, setExiting] = useState(false);
  const [showProfileId, setShowProfileId] = useState(false);

  const current = PROFILES[currentIndex];
  const next = PROFILES[currentIndex + 1];

  const handleAction = (dir: "left" | "right") => {
    if (exiting || !current) return;
    setExiting(true);
    setDirection(dir);

    const isMatch = dir === "right" && Math.random() < 0.35;

    setTimeout(() => {
      setExiting(false);
      setDirection(null);
      if (currentIndex < PROFILES.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
      if (isMatch) {
        setMatchedProfile(current);
        setShowMatch(true);
      }
    }, 400);
  };

  const handleViewProfile = () => {
    setShowMatch(false);
    setShowProfileId(true);
  };

  const handleCloseProfileId = () => {
    setShowProfileId(false);
    setMatchedProfile(null);
  };

  const handleStartChatting = (profile: Profile) => {
    setShowMatch(false);
    setShowProfileId(false);
    if (onStartChat) {
      onStartChat(profile.name, profile.avatar);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "oklch(0.35 0.12 38)" }}
          >
            Tribal Sangi
          </h2>
          <p className="text-xs text-muted-foreground">
            Find your tribal match 💞
          </p>
        </div>
        <div
          className="flex items-center gap-1 px-3 py-1 rounded-full"
          style={{ background: "oklch(0.95 0.03 38)" }}
        >
          <Heart
            size={14}
            fill="oklch(0.52 0.135 38)"
            style={{ color: "oklch(0.52 0.135 38)" }}
          />
          <span
            className="text-xs font-semibold"
            style={{ color: "oklch(0.35 0.12 38)" }}
          >
            {PROFILES.length - currentIndex} left
          </span>
        </div>
      </div>

      <div
        className="flex-1 flex items-center justify-center px-4 pb-4"
        style={{ minHeight: 0 }}
      >
        {currentIndex >= PROFILES.length ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">💞</div>
            <p
              className="text-lg font-bold"
              style={{ color: "oklch(0.35 0.12 38)" }}
            >
              You've seen everyone!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back later for new matches
            </p>
            <button
              type="button"
              onClick={() => setCurrentIndex(0)}
              className="mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: "oklch(0.52 0.135 38)" }}
              data-ocid="sangi.primary_button"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: "420px" }}>
            {next && (
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  transform: "scale(0.94) translateY(12px)",
                  zIndex: 0,
                  opacity: 0.7,
                }}
              >
                <img
                  src={next.avatar}
                  alt={next.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.2 0.08 38) 30%, transparent 60%)",
                  }}
                />
              </div>
            )}
            <AnimatePresence mode="wait">
              {!exiting && current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction === "right" ? 300 : -300,
                    rotate: direction === "right" ? 15 : -15,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
                  style={{ zIndex: 1 }}
                  data-ocid="sangi.card"
                >
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.15 0.08 38) 40%, transparent 70%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                    <h3 className="text-2xl font-bold text-white">
                      {current.name}, {current.age}
                    </h3>
                    <p className="text-sm text-white/80 mt-0.5">
                      🏡 {current.tribe} Tribe
                    </p>
                    <p className="text-xs text-white/70 mt-1">{current.bio}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {current.interests.map((interest, i) => (
                        <span
                          key={interest}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background:
                              INTEREST_COLORS[i % INTEREST_COLORS.length],
                            color: "oklch(0.3 0.1 38)",
                          }}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div
                  key="placeholder"
                  className="absolute inset-0 rounded-3xl bg-muted flex items-center justify-center"
                  style={{ zIndex: 1 }}
                >
                  <div className="text-4xl">💞</div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {currentIndex < PROFILES.length && (
        <div className="flex items-center justify-center gap-6 pb-4">
          <button
            type="button"
            onClick={() => handleAction("left")}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-2 border-border bg-card hover:scale-110 transition-transform"
            data-ocid="sangi.delete_button"
          >
            <X size={26} className="text-red-400" />
          </button>
          <button
            type="button"
            onClick={() => handleAction("right")}
            className="w-11 h-11 rounded-full shadow flex items-center justify-center bg-muted hover:scale-110 transition-transform"
            data-ocid="sangi.toggle"
          >
            <Star size={18} style={{ color: "oklch(0.72 0.2 85)" }} />
          </button>
          <button
            type="button"
            onClick={() => handleAction("right")}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
            style={{ background: "oklch(0.52 0.135 38)" }}
            data-ocid="sangi.primary_button"
          >
            <Heart size={26} fill="white" />
          </button>
        </div>
      )}

      {/* Match Overlay */}
      <AnimatePresence>
        {showMatch && matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.35 0.12 38), oklch(0.45 0.14 15), oklch(0.52 0.135 38))",
            }}
            data-ocid="sangi.modal"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {SPARKLE_POSITIONS.map((s) => (
                <motion.div
                  key={s.id}
                  className="absolute text-2xl"
                  style={{ left: `${s.left}%`, top: `${s.top}%` }}
                  animate={{ y: [-20, 20, -20], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: s.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: s.delay,
                  }}
                >
                  {s.emoji}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="text-center px-8 w-full max-w-sm"
            >
              <p className="text-5xl font-black text-white mb-2">
                It's a Match!
              </p>
              <p className="text-3xl mb-8">💞</p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <Avatar className="w-24 h-24 ring-4 ring-white">
                    <AvatarImage src="https://picsum.photos/seed/saurav/100/100" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <p className="text-white font-semibold mt-2 text-sm">You</p>
                </div>
                <div className="text-white text-4xl">💞</div>
                <div className="text-center">
                  <Avatar className="w-24 h-24 ring-4 ring-white">
                    <AvatarImage src={matchedProfile.avatar} />
                    <AvatarFallback>{matchedProfile.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-white font-semibold mt-2 text-sm">
                    {matchedProfile.name}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full py-3 rounded-full font-bold text-base flex items-center justify-center gap-2"
                  style={{ background: "white", color: "oklch(0.35 0.12 38)" }}
                  onClick={() => handleStartChatting(matchedProfile)}
                  data-ocid="sangi.confirm_button"
                >
                  <MessageCircle size={18} /> Start Chatting
                </button>
                <button
                  type="button"
                  className="w-full py-3 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: "oklch(0.85 0.12 85)" }}
                  onClick={handleViewProfile}
                  data-ocid="sangi.open_modal_button"
                >
                  👤 View Profile ID
                </button>
                <button
                  type="button"
                  className="w-full py-3 rounded-full font-semibold text-sm text-white/80 border border-white/30"
                  onClick={() => setShowMatch(false)}
                  data-ocid="sangi.cancel_button"
                >
                  Keep Swiping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile ID Card Overlay */}
      <AnimatePresence>
        {showProfileId && matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,0.6)", zIndex: 60 }}
            data-ocid="sangi.sheet"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="w-full max-w-sm rounded-t-3xl overflow-hidden shadow-2xl"
              style={{
                background: "oklch(0.98 0.01 60)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {/* Profile Photo */}
              <div className="relative w-full" style={{ height: "240px" }}>
                <img
                  src={matchedProfile.avatar}
                  alt={matchedProfile.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.98 0.01 60) 0%, transparent 60%)",
                  }}
                />
                <button
                  type="button"
                  onClick={handleCloseProfileId}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                  data-ocid="sangi.close_button"
                >
                  <X size={18} className="text-white" />
                </button>
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.52 0.135 38)",
                      color: "white",
                      letterSpacing: "0.04em",
                    }}
                  >
                    🏕 Adinivaas Sangi ID
                  </span>
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-5 pb-6 -mt-4">
                <div className="mb-3">
                  <h2
                    className="text-2xl font-black"
                    style={{ color: "oklch(0.25 0.1 38)" }}
                  >
                    {matchedProfile.name}, {matchedProfile.age}
                  </h2>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: "oklch(0.52 0.135 38)" }}
                  >
                    🏡 {matchedProfile.tribe} Tribe
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    background: "oklch(0.92 0.06 145)",
                    color: "oklch(0.3 0.1 145)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Active • Looking for connections
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "oklch(0.4 0.05 38)" }}
                >
                  {matchedProfile.bio}
                </p>

                <div className="mb-4">
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.52 0.135 38)" }}
                  >
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchedProfile.interests.map((interest, i) => (
                      <span
                        key={interest}
                        className="text-xs px-3 py-1.5 rounded-full font-semibold"
                        style={{
                          background:
                            INTEREST_COLORS[i % INTEREST_COLORS.length],
                          color:
                            INTEREST_TEXT_COLORS[
                              i % INTEREST_TEXT_COLORS.length
                            ],
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4 mb-5 space-y-3"
                  style={{ background: "oklch(0.95 0.02 38)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin
                      size={14}
                      style={{ color: "oklch(0.52 0.135 38)" }}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.3 0.08 38)" }}
                      >
                        {matchedProfile.location ?? "India"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">🗣️</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Languages</p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.3 0.08 38)" }}
                      >
                        {matchedProfile.languages ?? "Hindi"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">🌿</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Member</p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.3 0.08 38)" }}
                      >
                        {matchedProfile.memberSince ?? "Adinivaas since 2023"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartChatting(matchedProfile)}
                  className="w-full py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-2 text-white shadow-md"
                  style={{ background: "oklch(0.52 0.135 38)" }}
                  data-ocid="sangi.confirm_button"
                >
                  <MessageCircle size={18} /> Send Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
