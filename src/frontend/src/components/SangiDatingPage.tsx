import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  CheckCircle2,
  Filter,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  Search,
  Star,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  tribe: string;
  totem: string;
  language: string;
  faith: string;
  avatar: string;
  photos: string[];
  bio: string;
  location: string;
  verified: boolean;
  interests: string[];
  culturalBackground: string;
  profession: string;
  education: string;
  distance: string;
  hobbies: string[];
  matchedInterests: string[];
  matchedHobbies: string[];
}

const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Priya",
    age: 24,
    tribe: "Gond",
    totem: "Eagle",
    language: "Hindi, Gondi",
    faith: "Sarna",
    avatar: "https://picsum.photos/seed/spriya1/400/600",
    photos: [
      "https://picsum.photos/seed/spriya1/400/600",
      "https://picsum.photos/seed/spriya1b/400/600",
      "https://picsum.photos/seed/spriya1c/400/600",
    ],
    bio: "Lover of traditional Gond art and forest walks 🌿",
    location: "Raipur, Chhattisgarh",
    verified: true,
    interests: ["Music", "Tribal Arts", "Farming"],
    culturalBackground:
      "Rich Gond art traditions, forest rituals and seasonal festivals",
    profession: "Art Teacher",
    education: "B.A. Arts",
    distance: "8 km away",
    hobbies: ["Pottery", "Forest Walks", "Painting"],
    matchedInterests: ["Music", "Tribal Arts"],
    matchedHobbies: ["Pottery"],
  },
  {
    id: 2,
    name: "Arjun",
    age: 27,
    tribe: "Bhil",
    totem: "Tiger",
    language: "Hindi, Bhili",
    faith: "Hindu",
    avatar: "https://picsum.photos/seed/sarjun2/400/600",
    photos: [
      "https://picsum.photos/seed/sarjun2/400/600",
      "https://picsum.photos/seed/sarjun2b/400/600",
      "https://picsum.photos/seed/sarjun2c/400/600",
    ],
    bio: "Passionate about preserving Bhil traditions 🏹",
    location: "Udaipur, Rajasthan",
    verified: false,
    interests: ["Archery", "Folklore", "Crafts"],
    culturalBackground:
      "Bhil warrior traditions, nature worship and vibrant folk songs",
    profession: "Craftsman",
    education: "12th Pass",
    distance: "23 km away",
    hobbies: ["Archery", "Cooking", "Storytelling"],
    matchedInterests: ["Crafts", "Folklore"],
    matchedHobbies: ["Archery"],
  },
  {
    id: 3,
    name: "Meena",
    age: 22,
    tribe: "Munda",
    totem: "Deer",
    language: "Hindi, Mundari",
    faith: "Sarna",
    avatar: "https://picsum.photos/seed/smeena3/400/600",
    photos: [
      "https://picsum.photos/seed/smeena3/400/600",
      "https://picsum.photos/seed/smeena3b/400/600",
      "https://picsum.photos/seed/smeena3c/400/600",
    ],
    bio: "Dancing to the rhythm of tribal beats 💃",
    location: "Ranchi, Jharkhand",
    verified: true,
    interests: ["Dance", "Nature", "Cooking"],
    culturalBackground:
      "Munda harvest festivals, spirit worship and traditional healing",
    profession: "Nurse",
    education: "Diploma - Nursing",
    distance: "45 km away",
    hobbies: ["Cooking", "Dancing", "Gardening"],
    matchedInterests: ["Dance", "Nature"],
    matchedHobbies: ["Cooking"],
  },
  {
    id: 4,
    name: "Ravi",
    age: 28,
    tribe: "Santali",
    totem: "Sun",
    language: "Hindi, Santali",
    faith: "Sarna",
    avatar: "https://picsum.photos/seed/sravi4/400/600",
    photos: [
      "https://picsum.photos/seed/sravi4/400/600",
      "https://picsum.photos/seed/sravi4b/400/600",
      "https://picsum.photos/seed/sravi4c/400/600",
    ],
    bio: "Playing the banam and growing organic crops 🎵",
    location: "Dumka, Jharkhand",
    verified: true,
    interests: ["Music", "Agriculture", "Stories"],
    culturalBackground:
      "Santali banam music, Sohrai festivals and bongas ritual",
    profession: "Organic Farmer",
    education: "Graduate - Agriculture",
    distance: "62 km away",
    hobbies: ["Instrument Playing", "Organic Farming", "Bird Watching"],
    matchedInterests: ["Music", "Agriculture"],
    matchedHobbies: [],
  },
  {
    id: 5,
    name: "Sita",
    age: 25,
    tribe: "Warli",
    totem: "Horse",
    language: "Hindi, Warli, Marathi",
    faith: "Hindu",
    avatar: "https://picsum.photos/seed/ssita5/400/600",
    photos: [
      "https://picsum.photos/seed/ssita5/400/600",
      "https://picsum.photos/seed/ssita5b/400/600",
      "https://picsum.photos/seed/ssita5c/400/600",
    ],
    bio: "Warli art runs in my veins 🎨",
    location: "Palghar, Maharashtra",
    verified: true,
    interests: ["Painting", "Yoga", "Heritage"],
    culturalBackground:
      "Warli mural traditions, goddess Palaghata worship and harvest celebrations",
    profession: "Artist",
    education: "B.F.A. Fine Arts",
    distance: "110 km away",
    hobbies: ["Mural Painting", "Meditation", "Temple Visits"],
    matchedInterests: ["Painting", "Heritage"],
    matchedHobbies: ["Mural Painting"],
  },
  {
    id: 6,
    name: "Dev",
    age: 26,
    tribe: "Korku",
    totem: "Peacock",
    language: "Hindi, Korku",
    faith: "Sarna",
    avatar: "https://picsum.photos/seed/sdev6/400/600",
    photos: [
      "https://picsum.photos/seed/sdev6/400/600",
      "https://picsum.photos/seed/sdev6b/400/600",
      "https://picsum.photos/seed/sdev6c/400/600",
    ],
    bio: "Learning from nature every single day 🌱",
    location: "Betul, Madhya Pradesh",
    verified: false,
    interests: ["Herbal Medicine", "Forest", "Music"],
    culturalBackground:
      "Korku forest rituals, herbal healing traditions and seed festivals",
    profession: "Herbalist",
    education: "Diploma - Herbal Science",
    distance: "35 km away",
    hobbies: ["Forest Walks", "Herb Collection", "Flute Playing"],
    matchedInterests: ["Forest", "Music"],
    matchedHobbies: ["Forest Walks"],
  },
  {
    id: 7,
    name: "Kavya",
    age: 23,
    tribe: "Halbi",
    totem: "Parrot",
    language: "Hindi, Halbi",
    faith: "Hindu",
    avatar: "https://picsum.photos/seed/skavya7/400/600",
    photos: [
      "https://picsum.photos/seed/skavya7/400/600",
      "https://picsum.photos/seed/skavya7b/400/600",
      "https://picsum.photos/seed/skavya7c/400/600",
    ],
    bio: "Weaving stories with threads and words 🧵",
    location: "Jagdalpur, Chhattisgarh",
    verified: false,
    interests: ["Weaving", "Travel", "Food"],
    culturalBackground:
      "Halbi weaving traditions, dance-drama performances and oral literature",
    profession: "Textile Designer",
    education: "B.Com",
    distance: "78 km away",
    hobbies: ["Weaving", "Recipe Making", "Nature Trails"],
    matchedInterests: ["Weaving", "Food"],
    matchedHobbies: [],
  },
  {
    id: 8,
    name: "Mohan",
    age: 29,
    tribe: "Gond",
    totem: "Bear",
    language: "Hindi, Gondi",
    faith: "Sarna",
    avatar: "https://picsum.photos/seed/smohan8/400/600",
    photos: [
      "https://picsum.photos/seed/smohan8/400/600",
      "https://picsum.photos/seed/smohan8b/400/600",
      "https://picsum.photos/seed/smohan8c/400/600",
    ],
    bio: "Capturing the beauty of tribal life 📷",
    location: "Mandla, Madhya Pradesh",
    verified: true,
    interests: ["Farming", "Photography", "Arts"],
    culturalBackground:
      "Gond Karma festival celebrations and Gondi art documentation",
    profession: "Wildlife Photographer",
    education: "Graduate - Forestry",
    distance: "17 km away",
    hobbies: ["Wildlife Photography", "Farming", "Cooking"],
    matchedInterests: ["Arts", "Farming"],
    matchedHobbies: ["Cooking"],
  },
  {
    id: 9,
    name: "Lata",
    age: 24,
    tribe: "Bhil",
    totem: "Cobra",
    language: "Hindi, Bhili",
    faith: "Hindu",
    avatar: "https://picsum.photos/seed/slata9/400/600",
    photos: [
      "https://picsum.photos/seed/slata9/400/600",
      "https://picsum.photos/seed/slata9b/400/600",
      "https://picsum.photos/seed/slata9c/400/600",
    ],
    bio: "My voice carries ancestral songs 🎶",
    location: "Dhar, Madhya Pradesh",
    verified: false,
    interests: ["Singing", "Rituals", "Crafts"],
    culturalBackground:
      "Bhil Bhagoria festival, devotional singing and ritual embroidery",
    profession: "Folk Singer",
    education: "10th Pass",
    distance: "52 km away",
    hobbies: ["Singing", "Embroidery", "Ritual Dance"],
    matchedInterests: ["Singing", "Crafts"],
    matchedHobbies: ["Embroidery"],
  },
  {
    id: 10,
    name: "Suresh",
    age: 30,
    tribe: "Munda",
    totem: "Bull",
    language: "Hindi, Mundari",
    faith: "Sarna",
    avatar: "https://picsum.photos/seed/ssuresh10/400/600",
    photos: [
      "https://picsum.photos/seed/ssuresh10/400/600",
      "https://picsum.photos/seed/ssuresh10b/400/600",
      "https://picsum.photos/seed/ssuresh10c/400/600",
    ],
    bio: "Strong roots, stronger future 💪",
    location: "Khunti, Jharkhand",
    verified: true,
    interests: ["Wrestling", "Nature", "Community"],
    culturalBackground:
      "Munda Sarhul festival, nature worship and community leadership",
    profession: "Social Worker",
    education: "B.A. Social Work",
    distance: "90 km away",
    hobbies: ["Wrestling", "Community Events", "River Fishing"],
    matchedInterests: ["Nature", "Community"],
    matchedHobbies: [],
  },
];

const SPARKLES = ["💞", "✨", "🌸", "💫", "🎊"];
const SPARKLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 17 + 5) % 100,
  top: (i * 23 + 10) % 100,
  duration: 2 + (i % 3),
  delay: (i % 5) * 0.4,
  emoji: SPARKLES[i % 5],
}));

const INTEREST_EMOJI: Record<string, string> = {
  Music: "🎵",
  Dance: "💃",
  Food: "🍲",
  Travel: "🌍",
  Painting: "🎨",
  Crafts: "🧵",
  Farming: "🌾",
  Nature: "🌿",
  Photography: "📷",
  Wrestling: "💪",
  Heritage: "🏛",
  Stories: "📖",
  Yoga: "🧘",
  Singing: "🎶",
  Archery: "🏹",
  Agriculture: "🌱",
  Community: "🤝",
  Forest: "🌲",
  Weaving: "🧶",
  Folklore: "📜",
  "Herbal Medicine": "🌿",
  "Tribal Arts": "🖼",
  Rituals: "🔮",
};

const TRIBES_FOR_FILTER = [
  "Munda",
  "Oraon",
  "Santali",
  "Ho",
  "Kharia",
  "Gond",
  "Bhil",
  "Warli",
  "Korku",
  "Halbi",
  "Mahli",
  "Bhumij",
];

const LANGUAGES_FOR_FILTER = [
  "Hindi",
  "Mundari",
  "Gondi",
  "Santali",
  "Bhili",
  "Warli",
  "Halbi",
  "Kurukh",
  "Kharia",
];

function getInterestEmoji(interest: string) {
  return INTEREST_EMOJI[interest] || "✦";
}

interface SwipeCardProps {
  profile: Profile;
  onLike: () => void;
  onSkip: () => void;
  onTap: () => void;
  zIndex: number;
  scale: number;
  translateY: number;
  opacity: number;
  isActive: boolean;
}

function SwipeCard({
  profile,
  onLike,
  onSkip,
  onTap,
  zIndex,
  scale,
  translateY,
  opacity,
  isActive,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, 80], [0, 1]);
  const skipOpacity = useTransform(x, [-80, -20], [1, 0]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 80) onLike();
    else if (info.offset.x < -80) onSkip();
    else x.set(0);
  };

  if (!isActive) {
    return (
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          zIndex,
          opacity,
        }}
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 40%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, rotate, zIndex, touchAction: "none" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      onClick={onTap}
      className="absolute inset-0 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
      data-ocid="sangi.card"
    >
      {/* Photo background */}
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-full h-full object-cover"
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,5,0,0.88) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)",
        }}
      />

      {/* LIKE stamp */}
      <motion.div
        style={{ opacity: likeOpacity, borderColor: "#4ade80" }}
        className="absolute top-16 left-6 rotate-[-20deg] border-4 border-green-400 rounded-xl px-4 py-2 pointer-events-none"
        data-ocid="sangi.success_state"
      >
        <span className="text-2xl font-black" style={{ color: "#4ade80" }}>
          LIKE ❤️
        </span>
      </motion.div>

      {/* SKIP stamp */}
      <motion.div
        style={{ opacity: skipOpacity }}
        className="absolute top-16 right-6 rotate-[20deg] border-4 rounded-xl px-4 py-2 pointer-events-none"
      >
        <span className="text-2xl font-black" style={{ color: "#f87171" }}>
          SKIP ✕
        </span>
      </motion.div>

      {/* Top-left: Tribe chip */}
      <div
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{
          background: "rgba(0,0,0,0.55)",
          color: "white",
          backdropFilter: "blur(8px)",
        }}
      >
        🏕 {profile.tribe}
      </div>

      {/* Verified badge below tribe */}
      {profile.verified && (
        <div
          className="absolute top-12 left-4 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(34,197,94,0.85)", color: "white" }}
        >
          <CheckCircle2 size={10} /> Verified
        </div>
      )}

      {/* Top-right: distance */}
      <div
        className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: "oklch(0.52 0.18 30)", color: "white" }}
      >
        📍 {profile.distance}
      </div>

      {/* Bottom info overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        {/* Name + age */}
        <h3 className="text-2xl font-black text-white leading-tight">
          {profile.name}, {profile.age}
        </h3>
        {/* Location */}
        <p className="text-sm text-white/80 flex items-center gap-1 mt-0.5">
          <MapPin size={12} /> {profile.location}
        </p>
        {/* Bio */}
        <p className="text-xs text-white/70 italic mt-1 line-clamp-1">
          {profile.bio}
        </p>

        {/* Cultural Identity Row */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {[
            { label: profile.tribe, emoji: "🏕" },
            { label: profile.totem, emoji: "🦅" },
            { label: profile.language.split(",")[0].trim(), emoji: "🗣" },
            { label: profile.faith, emoji: "🙏" },
          ].map((item) => (
            <span
              key={item.label}
              className="text-xs px-2 py-1 rounded-full font-semibold"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(6px)",
              }}
            >
              {item.emoji} {item.label}
            </span>
          ))}
        </div>

        {/* Interest tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {profile.interests.slice(0, 4).map((interest) => (
            <span
              key={interest}
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{
                background: "oklch(0.35 0.10 55 / 0.7)",
                color: "oklch(0.95 0.04 75)",
              }}
            >
              {getInterestEmoji(interest)} {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Filter panel
function FilterPanel({ onClose }: { onClose: () => void }) {
  const [ageMin, setAgeMin] = useState("18");
  const [ageMax, setAgeMax] = useState("40");
  const [selectedTribe, setSelectedTribe] = useState("");
  const [location, setLocation] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
      data-ocid="sangi.sheet"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="w-full max-w-[390px] rounded-t-3xl overflow-hidden"
        style={{
          background: "oklch(0.97 0.02 75)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 px-5 pt-5 pb-3 flex items-center justify-between"
          style={{ background: "oklch(0.97 0.02 75)" }}
        >
          <h3
            className="text-lg font-black"
            style={{ color: "oklch(0.35 0.10 55)" }}
          >
            Filter Profiles
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.90 0.05 55)" }}
            data-ocid="sangi.close_button"
          >
            <X size={16} style={{ color: "oklch(0.35 0.10 55)" }} />
          </button>
        </div>

        <div className="px-5 pb-6 space-y-5">
          {/* Age range */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.52 0.18 30)" }}
            >
              Age Range
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
                placeholder="Min"
                className="flex-1 rounded-xl border px-3 py-2 text-sm"
                style={{
                  borderColor: "oklch(0.85 0.05 55)",
                  background: "white",
                }}
                data-ocid="sangi.input"
              />
              <span style={{ color: "oklch(0.55 0.08 55)" }}>–</span>
              <input
                type="number"
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
                placeholder="Max"
                className="flex-1 rounded-xl border px-3 py-2 text-sm"
                style={{
                  borderColor: "oklch(0.85 0.05 55)",
                  background: "white",
                }}
                data-ocid="sangi.input"
              />
            </div>
          </div>

          {/* Tribe */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.52 0.18 30)" }}
            >
              Tribe
            </p>
            <div className="flex flex-wrap gap-2">
              {TRIBES_FOR_FILTER.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTribe(selectedTribe === t ? "" : t)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background:
                      selectedTribe === t
                        ? "oklch(0.52 0.18 30)"
                        : "oklch(0.90 0.04 55)",
                    color:
                      selectedTribe === t ? "white" : "oklch(0.35 0.10 55)",
                  }}
                  data-ocid="sangi.toggle"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.52 0.18 30)" }}
            >
              Location
            </p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City / State"
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{
                borderColor: "oklch(0.85 0.05 55)",
                background: "white",
              }}
              data-ocid="sangi.search_input"
            />
          </div>

          {/* Language */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.52 0.18 30)" }}
            >
              Language
            </p>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES_FOR_FILTER.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setSelectedLang(selectedLang === l ? "" : l)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background:
                      selectedLang === l
                        ? "oklch(0.35 0.10 55)"
                        : "oklch(0.90 0.04 55)",
                    color: selectedLang === l ? "white" : "oklch(0.35 0.10 55)",
                  }}
                  data-ocid="sangi.toggle"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Verified only */}
          <div
            className="flex items-center justify-between py-2 px-4 rounded-2xl"
            style={{ background: "oklch(0.93 0.03 75)" }}
          >
            <Label
              htmlFor="verified-toggle"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.35 0.10 55)" }}
            >
              ✅ Verified profiles only
            </Label>
            <Switch
              id="verified-toggle"
              checked={verifiedOnly}
              onCheckedChange={setVerifiedOnly}
              data-ocid="sangi.switch"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-3 rounded-full font-semibold text-sm border-2"
              style={{
                borderColor: "oklch(0.52 0.18 30)",
                color: "oklch(0.52 0.18 30)",
              }}
              data-ocid="sangi.secondary_button"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full font-bold text-sm text-white"
              style={{ background: "oklch(0.52 0.18 30)" }}
              data-ocid="sangi.primary_button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Expanded profile bottom sheet
function ExpandedProfileSheet({
  profile,
  onClose,
  onLike,
  onSendInterest,
}: {
  profile: Profile;
  onClose: () => void;
  onLike: () => void;
  onSendInterest: () => void;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
      data-ocid="sangi.modal"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="w-full max-w-[390px] rounded-t-3xl overflow-hidden"
        style={{
          background: "oklch(0.97 0.02 75)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo carousel */}
        <div className="relative" style={{ height: "280px" }}>
          <img
            src={profile.photos[photoIdx]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.97 0.02 75) 0%, transparent 60%)",
            }}
          />

          {/* Carousel dots */}
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5">
            {profile.photos.map((photo) => {
              const i = profile.photos.indexOf(photo);
              return (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setPhotoIdx(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: photoIdx === i ? 20 : 6,
                    height: 6,
                    background:
                      photoIdx === i ? "white" : "rgba(255,255,255,0.5)",
                  }}
                  data-ocid="sangi.toggle"
                />
              );
            })}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "rgba(0,0,0,0.45)" }}
            data-ocid="sangi.close_button"
          >
            <X size={18} className="text-white" />
          </button>

          {/* Tribe + verified top-left */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", color: "white" }}
            >
              🏕 {profile.tribe}
            </span>
            {profile.verified && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"
                style={{ background: "rgba(34,197,94,0.85)", color: "white" }}
              >
                <CheckCircle2 size={10} /> Verified
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-8 -mt-2">
          {/* Name + age */}
          <div className="flex items-center justify-between mb-1">
            <h2
              className="text-2xl font-black"
              style={{ color: "oklch(0.28 0.10 55)" }}
            >
              {profile.name}, {profile.age}
            </h2>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: "oklch(0.52 0.18 30)", color: "white" }}
            >
              📍 {profile.distance}
            </span>
          </div>
          <p className="text-sm mb-3" style={{ color: "oklch(0.50 0.10 55)" }}>
            <MapPin size={12} className="inline mr-1" />
            {profile.location}
          </p>

          {/* Cultural identity chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              {
                icon: "🏕",
                label: profile.tribe,
                color: "oklch(0.90 0.05 55)",
                text: "oklch(0.35 0.10 55)",
              },
              {
                icon: "🦅",
                label: profile.totem,
                color: "oklch(0.92 0.04 38)",
                text: "oklch(0.40 0.12 38)",
              },
              {
                icon: "🗣",
                label: profile.language.split(",")[0].trim(),
                color: "oklch(0.90 0.04 145)",
                text: "oklch(0.30 0.12 145)",
              },
              {
                icon: "🙏",
                label: profile.faith,
                color: "oklch(0.93 0.03 280)",
                text: "oklch(0.35 0.10 280)",
              },
            ].map((c) => (
              <span
                key={c.label}
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: c.color, color: c.text }}
              >
                {c.icon} {c.label}
              </span>
            ))}
          </div>

          {/* About Me */}
          <div className="mb-4">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "oklch(0.52 0.18 30)" }}
            >
              About Me
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.40 0.07 55)" }}
            >
              {profile.bio}
            </p>
          </div>

          {/* Cultural Background */}
          <div
            className="mb-4 p-3 rounded-2xl"
            style={{ background: "oklch(0.93 0.03 75)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "oklch(0.52 0.18 30)" }}
            >
              Cultural Background
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.40 0.07 55)" }}
            >
              {profile.culturalBackground}
            </p>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.35 0.10 55)" }}
            >
              Interests & Lifestyle
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold"
                  style={{
                    background: "oklch(0.90 0.04 145)",
                    color: "oklch(0.30 0.12 145)",
                  }}
                >
                  {getInterestEmoji(interest)} {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="mb-4">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.35 0.10 55)" }}
            >
              Hobbies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.hobbies.map((h) => (
                <span
                  key={h}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold"
                  style={{
                    background: "oklch(0.90 0.05 55)",
                    color: "oklch(0.40 0.10 55)",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Profession / Education */}
          <div className="flex gap-3 mb-5">
            <div
              className="flex-1 p-3 rounded-2xl"
              style={{ background: "oklch(0.93 0.03 75)" }}
            >
              <p className="text-xs text-muted-foreground">Profession</p>
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.28 0.10 55)" }}
              >
                {profile.profession}
              </p>
            </div>
            <div
              className="flex-1 p-3 rounded-2xl"
              style={{ background: "oklch(0.93 0.03 75)" }}
            >
              <p className="text-xs text-muted-foreground">Education</p>
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.28 0.10 55)" }}
              >
                {profile.education}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onLike}
              className="flex-1 py-3.5 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: "oklch(0.55 0.16 145)" }}
              data-ocid="sangi.primary_button"
            >
              <Heart size={16} fill="white" /> Like
            </button>
            <button
              type="button"
              onClick={onSendInterest}
              className="flex-1 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 border-2"
              style={{
                borderColor: "oklch(0.52 0.18 30)",
                color: "oklch(0.52 0.18 30)",
              }}
              data-ocid="sangi.secondary_button"
            >
              <MessageCircle size={16} /> Send Interest
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface SangiDatingPageProps {
  onStartChat?: (name: string, avatar: string) => void;
}

export default function SangiDatingPage({ onStartChat }: SangiDatingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [showExpanded, setShowExpanded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const current = PROFILES[currentIndex];
  const nextProfile = PROFILES[currentIndex + 1];
  const nextNextProfile = PROFILES[currentIndex + 2];

  const handleLike = () => {
    if (!current) return;
    const isMatch = Math.random() < 0.4;
    setCurrentIndex((i) => Math.min(i + 1, PROFILES.length));
    if (isMatch) {
      setMatchedProfile(current);
      setShowMatch(true);
    }
  };

  const handleSkip = () => {
    setCurrentIndex((i) => Math.min(i + 1, PROFILES.length));
  };

  const handleStartChatting = (profile: Profile) => {
    setShowMatch(false);
    setShowExpanded(false);
    if (onStartChat) onStartChat(profile.name, profile.avatar);
  };

  const premiumProfiles = PROFILES.slice(0, 3);

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "oklch(0.97 0.02 75)" }}
    >
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid oklch(0.90 0.04 55)" }}
      >
        <div>
          <h2
            className="text-xl font-black"
            style={{ color: "oklch(0.35 0.10 55)" }}
          >
            Tribal Sangi
          </h2>
          <p className="text-xs" style={{ color: "oklch(0.55 0.12 30)" }}>
            Find your connection 💞
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.92 0.04 55)" }}
            data-ocid="sangi.search_input"
          >
            <Search size={18} style={{ color: "oklch(0.35 0.10 55)" }} />
          </button>
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.52 0.18 30)" }}
            data-ocid="sangi.open_modal_button"
          >
            <Filter size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-4 pt-2 pb-1"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or tribe…"
              className="w-full px-4 py-2.5 rounded-full text-sm border"
              style={{
                borderColor: "oklch(0.85 0.05 55)",
                background: "white",
              }}
              data-ocid="sangi.search_input"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card stack area */}
      <div
        className="flex-1 flex items-center justify-center px-4 pb-2"
        style={{ minHeight: 0 }}
      >
        {currentIndex >= PROFILES.length ? (
          // All cards exhausted — show premium blurred cards + restart
          <div className="w-full">
            <div className="text-center mb-5">
              <div className="text-5xl mb-3">💞</div>
              <p
                className="text-lg font-black"
                style={{ color: "oklch(0.35 0.10 55)" }}
              >
                You've seen everyone!
              </p>
              <p
                className="text-sm mb-3"
                style={{ color: "oklch(0.55 0.08 55)" }}
              >
                Upgrade to discover more connections
              </p>
              <button
                type="button"
                onClick={() => setCurrentIndex(0)}
                className="mt-1 px-6 py-2 rounded-full text-sm font-bold text-white"
                style={{ background: "oklch(0.35 0.10 55)" }}
                data-ocid="sangi.primary_button"
              >
                Start Over
              </button>
            </div>
            {/* Premium blurred cards */}
            <div
              className="flex gap-3 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {premiumProfiles.map((p) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 relative rounded-2xl overflow-hidden"
                  style={{ width: 120, height: 160 }}
                >
                  <img
                    src={p.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "blur(8px) brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Lock size={22} className="text-white" />
                    <p className="text-white text-xs font-bold text-center px-2">
                      Upgrade to connect
                    </p>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "oklch(0.52 0.18 30)" }}
                      data-ocid="sangi.primary_button"
                    >
                      Unlock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: "440px" }}>
            {/* Card n+2 (furthest back) */}
            {nextNextProfile && (
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  transform: "scale(0.88) translateY(24px)",
                  zIndex: 0,
                  opacity: 0.5,
                }}
              >
                <img
                  src={nextNextProfile.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Card n+1 */}
            {nextProfile && (
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  transform: "scale(0.94) translateY(12px)",
                  zIndex: 1,
                  opacity: 0.7,
                }}
              >
                <img
                  src={nextProfile.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent 70%)",
                  }}
                />
              </div>
            )}

            {/* Active card */}
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0"
                  style={{ zIndex: 2 }}
                >
                  <SwipeCard
                    profile={current}
                    onLike={handleLike}
                    onSkip={handleSkip}
                    onTap={() => setShowExpanded(true)}
                    zIndex={2}
                    scale={1}
                    translateY={0}
                    opacity={1}
                    isActive={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {currentIndex < PROFILES.length && (
        <div className="flex items-center justify-center gap-5 pb-4">
          {/* Skip */}
          <motion.button
            type="button"
            onClick={handleSkip}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-2"
            style={{ background: "white", borderColor: "oklch(0.88 0.05 55)" }}
            data-ocid="sangi.delete_button"
          >
            <X size={26} style={{ color: "oklch(0.60 0.18 25)" }} />
          </motion.button>

          {/* Super like */}
          <motion.button
            type="button"
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full shadow flex items-center justify-center"
            style={{
              background: "oklch(0.93 0.03 75)",
              border: "2px solid oklch(0.80 0.12 85)",
            }}
            data-ocid="sangi.toggle"
          >
            <Star
              size={18}
              fill="oklch(0.72 0.20 85)"
              style={{ color: "oklch(0.72 0.20 85)" }}
            />
          </motion.button>

          {/* Like */}
          <motion.button
            type="button"
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
            style={{ background: "oklch(0.55 0.16 145)" }}
            data-ocid="sangi.primary_button"
          >
            <Heart size={26} fill="white" className="text-white" />
          </motion.button>
        </div>
      )}

      {/* Premium teaser at bottom when near end */}
      {currentIndex >= PROFILES.length - 3 &&
        currentIndex < PROFILES.length && (
          <div className="px-4 pb-3">
            <div
              className="rounded-2xl p-3 flex items-center gap-3"
              style={{ background: "oklch(0.92 0.04 38)" }}
            >
              <Lock size={18} style={{ color: "oklch(0.52 0.18 30)" }} />
              <div className="flex-1">
                <p
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.35 0.12 30)" }}
                >
                  More profiles await
                </p>
                <p className="text-xs" style={{ color: "oklch(0.50 0.10 38)" }}>
                  Upgrade to connect with everyone
                </p>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: "oklch(0.52 0.18 30)" }}
                data-ocid="sangi.primary_button"
              >
                Upgrade
              </button>
            </div>
          </div>
        )}

      {/* Match Overlay */}
      <AnimatePresence>
        {showMatch && matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.28 0.10 55), oklch(0.45 0.14 38), oklch(0.35 0.12 30))",
            }}
            data-ocid="sangi.modal"
          >
            {/* Sparkles */}
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
              className="text-center w-full max-w-sm"
            >
              <p className="text-5xl font-black text-white mb-1">
                It's a Match! 🎉
              </p>
              <p className="text-white/80 text-sm mb-8">
                You and {matchedProfile.name} liked each other
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
                    <img
                      src="https://picsum.photos/seed/saurav/200/200"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white font-semibold mt-2 text-sm">You</p>
                </div>
                <div className="text-3xl">💞</div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
                    <img
                      src={matchedProfile.avatar}
                      alt={matchedProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white font-semibold mt-2 text-sm">
                    {matchedProfile.name}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-2"
                  style={{ background: "white", color: "oklch(0.35 0.10 55)" }}
                  onClick={() => handleStartChatting(matchedProfile)}
                  data-ocid="sangi.confirm_button"
                >
                  <MessageCircle size={18} /> Start Chat
                </button>
                <button
                  type="button"
                  className="w-full py-3 rounded-full font-semibold text-sm text-white border-2 border-white/40"
                  onClick={() => setShowMatch(false)}
                  data-ocid="sangi.cancel_button"
                >
                  Keep Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded profile sheet */}
      <AnimatePresence>
        {showExpanded && current && (
          <ExpandedProfileSheet
            profile={current}
            onClose={() => setShowExpanded(false)}
            onLike={() => {
              setShowExpanded(false);
              handleLike();
            }}
            onSendInterest={() => {
              setShowExpanded(false);
              handleLike();
            }}
          />
        )}
      </AnimatePresence>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilter && <FilterPanel onClose={() => setShowFilter(false)} />}
      </AnimatePresence>
    </div>
  );
}
