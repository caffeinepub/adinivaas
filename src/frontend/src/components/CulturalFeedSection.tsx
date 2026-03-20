import {
  Bookmark,
  CalendarPlus,
  Camera,
  ChevronDown,
  ChevronUp,
  Feather,
  FileText,
  Filter,
  Heart,
  Lock,
  MessageCircle,
  Music,
  PenLine,
  Play,
  Plus,
  Search,
  Share2,
  Upload,
  User,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import FeedSection from "./FeedSection";

// ─── Types ───────────────────────────────────────────────────────────────────
type ContentType = "Video" | "Images" | "Article";
type Subcategory =
  | "All"
  | "Music"
  | "Dance"
  | "Food"
  | "Tribewear"
  | "Art & Craft"
  | "Festivals"
  | "Traditions"
  | "Language"
  | "Heritage"
  | "Lifestyle";

interface ContentItem {
  id: number;
  title: string;
  creator: string;
  caption: string;
  subcategory: Exclude<Subcategory, "All">;
  type: ContentType;
  image: string;
  likes: number;
  comments: number;
  isLocked?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CONTENT: ContentItem[] = [
  {
    id: 1,
    title: "Jhumur Dance – Eastern Tribal Tradition",
    creator: "Sunita Oraon",
    caption: "A breathtaking performance at Sarhul 2025",
    subcategory: "Dance",
    type: "Video",
    image: "https://picsum.photos/seed/cult1/300/225",
    likes: 248,
    comments: 34,
  },
  {
    id: 2,
    title: "Tribal Textile Exhibition 2025",
    creator: "Ravi Munda",
    caption: "Hand-woven fabrics from Jharkhand artisans",
    subcategory: "Tribewear",
    type: "Images",
    image: "https://picsum.photos/seed/cult2/300/225",
    likes: 182,
    comments: 21,
  },
  {
    id: 3,
    title: "Makar Sankranti Tribal Feast",
    creator: "Asha Santhal",
    caption: "Traditional Pithas and rice dishes",
    subcategory: "Food",
    type: "Video",
    image: "https://picsum.photos/seed/cult3/300/225",
    likes: 317,
    comments: 56,
  },
  {
    id: 4,
    title: "Sacred Grove Conservation Drive",
    creator: "Birsa Gond",
    caption: "Protecting our ancestral Sarna forests",
    subcategory: "Heritage",
    type: "Article",
    image: "https://picsum.photos/seed/cult4/300/225",
    likes: 129,
    comments: 18,
  },
  {
    id: 5,
    title: "Sarhul Festival Celebrations 2025",
    creator: "Priya Ho",
    caption: "Flowers bloom and spirits soar in spring",
    subcategory: "Festivals",
    type: "Video",
    image: "https://picsum.photos/seed/cult5/300/225",
    likes: 421,
    comments: 88,
    isLocked: true,
  },
  {
    id: 6,
    title: "Kurukh Language Primer – Lesson 1",
    creator: "Dr. Anjali Oraon",
    caption: "Learn the basics of Kurukh script",
    subcategory: "Language",
    type: "Article",
    image: "https://picsum.photos/seed/cult6/300/225",
    likes: 203,
    comments: 47,
  },
  {
    id: 7,
    title: "Bamboo Weaving Masterclass",
    creator: "Hemant Munda",
    caption: "Step-by-step traditional craft tutorial",
    subcategory: "Art & Craft",
    type: "Video",
    image: "https://picsum.photos/seed/cult7/300/225",
    likes: 156,
    comments: 29,
  },
  {
    id: 8,
    title: "Morning Ritual Songs of the Santhal",
    creator: "Lakshmi Santhal",
    caption: "Dawn melodies passed down generations",
    subcategory: "Music",
    type: "Video",
    image: "https://picsum.photos/seed/cult8/300/225",
    likes: 284,
    comments: 41,
  },
  {
    id: 9,
    title: "Tribal Wedding Customs Explained",
    creator: "Maya Gond",
    caption: "The seven sacred ceremonies of a Gond wedding",
    subcategory: "Traditions",
    type: "Article",
    image: "https://picsum.photos/seed/cult9/300/225",
    likes: 198,
    comments: 62,
  },
  {
    id: 10,
    title: "Forest Foraging – Wild Edibles Guide",
    creator: "Arjun Ho",
    caption: "Seasonal plants used in tribal cooking",
    subcategory: "Lifestyle",
    type: "Images",
    image: "https://picsum.photos/seed/cult10/300/225",
    likes: 167,
    comments: 25,
  },
  {
    id: 11,
    title: "Paika Martial Dance Performance",
    creator: "Suresh Oraon",
    caption: "Ancient warrior dance of Odisha tribals",
    subcategory: "Dance",
    type: "Video",
    image: "https://picsum.photos/seed/cult11/300/225",
    likes: 332,
    comments: 57,
    isLocked: true,
  },
  {
    id: 12,
    title: "Sohrai Wall Painting Tutorial",
    creator: "Geeta Munda",
    caption: "Create traditional harvest festival art",
    subcategory: "Art & Craft",
    type: "Images",
    image: "https://picsum.photos/seed/cult12/300/225",
    likes: 221,
    comments: 33,
  },
  {
    id: 13,
    title: "Tribal New Year – Karam Festival",
    creator: "Nilu Santhal",
    caption: "Celebrating life, nature and brotherhood",
    subcategory: "Festivals",
    type: "Video",
    image: "https://picsum.photos/seed/cult13/300/225",
    likes: 389,
    comments: 71,
  },
  {
    id: 14,
    title: "Handloom Sarees of the Oraon",
    creator: "Champa Oraon",
    caption: "Intricate patterns woven on floor looms",
    subcategory: "Tribewear",
    type: "Images",
    image: "https://picsum.photos/seed/cult14/300/225",
    likes: 144,
    comments: 19,
  },
];

// ─── Tribe Groups ─────────────────────────────────────────────────────────────
const MAJOR_TRIBES = [
  { name: "Munda", seed: "tribe_munda" },
  { name: "Oraon (Kurukh)", seed: "tribe_oraon" },
  { name: "Santhal", seed: "tribe_santhal" },
  { name: "Ho", seed: "tribe_ho" },
  { name: "Kharia", seed: "tribe_kharia" },
  { name: "Bhumij", seed: "tribe_bhumij" },
  { name: "Asur", seed: "tribe_asur" },
  { name: "Birhor", seed: "tribe_birhor" },
  { name: "Korwa", seed: "tribe_korwa" },
  { name: "Lohra", seed: "tribe_lohra" },
];

const OTHER_TRIBES = [
  { name: "Mahli", seed: "tribe_mahli" },
  { name: "Karmali", seed: "tribe_karmali" },
  { name: "Chick Baraik", seed: "tribe_chickbaraik" },
  { name: "Gond", seed: "tribe_gond" },
  { name: "Baiga", seed: "tribe_baiga" },
  { name: "Kharwar", seed: "tribe_kharwar" },
  { name: "Parhaiya", seed: "tribe_parhaiya" },
  { name: "Savar (Sabar)", seed: "tribe_savar" },
  { name: "Binjhia", seed: "tribe_binjhia" },
  { name: "Bedia", seed: "tribe_bedia" },
];

const LESSER_KNOWN_TRIBES = [
  { name: "Paharia", seed: "tribe_paharia" },
  { name: "Turi", seed: "tribe_turi" },
  { name: "Gorait", seed: "tribe_gorait" },
  { name: "Khond", seed: "tribe_khond" },
  { name: "Nagesia", seed: "tribe_nagesia" },
  { name: "Bathudi", seed: "tribe_bathudi" },
  { name: "Banjara", seed: "tribe_banjara" },
  { name: "Kol", seed: "tribe_kol" },
  { name: "Bhogta", seed: "tribe_bhogta" },
  { name: "Mahato", seed: "tribe_mahato" },
  { name: "Kisan", seed: "tribe_kisan" },
  { name: "Rajwar", seed: "tribe_rajwar" },
];

const TRIBE_GROUPS = [
  { label: "Major Tribes", tribes: MAJOR_TRIBES },
  { label: "Other Tribes", tribes: OTHER_TRIBES },
  { label: "Lesser-Known / Smaller Groups", tribes: LESSER_KNOWN_TRIBES },
];

const TRENDING = MOCK_CONTENT.filter((c) => c.likes > 200).slice(0, 5);

const REELS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/reel1/390/220",
    title: "Jhumur Dance Reel – Full Performance",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/reel2/390/220",
    title: "Bamboo Craft in 60 Seconds",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/reel3/390/220",
    title: "Sarhul Morning Ceremony",
  },
];

const SUBCATEGORIES: Subcategory[] = [
  "All",
  "Music",
  "Dance",
  "Food",
  "Tribewear",
  "Art & Craft",
  "Festivals",
  "Traditions",
  "Language",
  "Heritage",
  "Lifestyle",
];

const TRIBE_FILTER_CHIPS = [
  ...MAJOR_TRIBES.map((t) => t.name),
  ...OTHER_TRIBES.map((t) => t.name),
  ...LESSER_KNOWN_TRIBES.map((t) => t.name),
];

const LOCATION_CHIPS = ["Jharkhand", "Odisha", "Chhattisgarh"];
const CONTENT_TYPES: ContentType[] = ["Video", "Images", "Article"];
const SORT_OPTIONS = ["Trending", "Latest", "Most Viewed"];

// ─── Sub-components ──────────────────────────────────────────────────────────
function TypeBadge({ type }: { type: ContentType }) {
  return (
    <span
      className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white"
      style={{
        fontSize: 10,
        background: "rgba(0,0,0,0.60)",
        backdropFilter: "blur(4px)",
      }}
    >
      {type === "Video" ? (
        <Play size={8} fill="white" />
      ) : type === "Images" ? (
        <Camera size={8} />
      ) : (
        <FileText size={8} />
      )}
      {type}
    </span>
  );
}

function ContentCard({
  item,
  liked,
  saved,
  onLike,
  onSave,
  index,
}: {
  item: ContentItem;
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
  index: number;
}) {
  return (
    <motion.div
      data-ocid={`cultural.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        border: "1px solid oklch(0.92 0.02 68)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={
            item.isLocked
              ? { filter: "blur(8px)", transform: "scale(1.05)" }
              : {}
          }
        />
        {item.isLocked && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <Lock size={20} className="text-white" />
            <span className="text-white font-semibold" style={{ fontSize: 10 }}>
              Unlock Premium
            </span>
          </div>
        )}
        {!item.isLocked && (
          <>
            <div className="absolute top-1.5 left-1.5">
              <TypeBadge type={item.type} />
            </div>
            <div className="absolute top-1.5 right-1.5">
              <span
                className="px-1.5 py-0.5 rounded-full text-white"
                style={{
                  fontSize: 10,
                  background: "oklch(0.52 0.135 38 / 0.88)",
                }}
              >
                {item.subcategory}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="px-2.5 pt-2 pb-1.5">
        <p
          className="font-semibold text-foreground leading-tight line-clamp-2"
          style={{ fontSize: 12 }}
        >
          {item.title}
        </p>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ color: "oklch(0.55 0.03 68)" }}
        >
          <User size={9} />
          <span style={{ fontSize: 10 }}>{item.creator}</span>
        </div>
        <p
          className="mt-0.5 line-clamp-1"
          style={{ fontSize: 10, color: "oklch(0.6 0.03 68)" }}
        >
          {item.caption}
        </p>
      </div>

      {/* Interaction row */}
      <div className="flex items-center justify-between px-2.5 pb-2 pt-0.5">
        <button
          type="button"
          data-ocid={`cultural.toggle.${index + 1}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className="flex items-center gap-0.5 transition-colors"
          style={{
            fontSize: 10,
            color: liked ? "oklch(0.55 0.2 25)" : "oklch(0.55 0.03 68)",
          }}
        >
          <Heart size={12} fill={liked ? "currentColor" : "none"} />
          {item.likes + (liked ? 1 : 0)}
        </button>
        <button
          type="button"
          className="flex items-center gap-0.5"
          style={{ fontSize: 10, color: "oklch(0.55 0.03 68)" }}
        >
          <MessageCircle size={12} />
          {item.comments}
        </button>
        <button
          type="button"
          className="flex items-center gap-0.5"
          style={{ fontSize: 10, color: "oklch(0.55 0.03 68)" }}
        >
          <Share2 size={12} />
          Share
        </button>
        <button
          type="button"
          data-ocid={`cultural.toggle.save.${index + 1}`}
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          style={{
            color: saved ? "oklch(0.52 0.135 38)" : "oklch(0.55 0.03 68)",
          }}
        >
          <Bookmark size={12} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Collapsible Section Header ───────────────────────────────────────────────
function CollapsibleHeader({
  title,
  count,
  expanded,
  onToggle,
  ocidPrefix,
}: {
  title: string;
  count?: number;
  expanded: boolean;
  onToggle: () => void;
  ocidPrefix: string;
}) {
  const browStyle = { color: "oklch(0.52 0.135 38)" };
  return (
    <div className="flex items-center justify-between mb-2">
      <p
        className="text-xs font-semibold"
        style={{ color: "oklch(0.42 0.05 68)" }}
      >
        {title}
        {count !== undefined && (
          <span
            className="ml-1.5 font-normal"
            style={{ color: "oklch(0.65 0.03 68)" }}
          >
            ({count})
          </span>
        )}
      </p>
      <button
        type="button"
        data-ocid={`${ocidPrefix}.toggle`}
        onClick={onToggle}
        className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
        style={browStyle}
      >
        {expanded ? (
          <>
            Show Less
            <ChevronUp size={13} />
          </>
        ) : (
          <>
            See All
            <ChevronDown size={13} />
          </>
        )}
      </button>
    </div>
  );
}

// ─── Tribe Chip Row ───────────────────────────────────────────────────────────
function TribeChipRow({
  tribes,
  onSelect,
}: {
  tribes: { name: string; seed: string }[];
  onSelect: () => void;
}) {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      {tribes.map((tribe) => (
        <button
          key={tribe.name}
          type="button"
          data-ocid="cultural.tab"
          onClick={onSelect}
          className="flex-shrink-0 flex flex-col items-center gap-1.5"
        >
          <div
            className="w-12 h-12 rounded-full overflow-hidden"
            style={{
              border: "2.5px solid",
              borderColor: "oklch(0.52 0.135 38)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src={`https://picsum.photos/seed/${tribe.seed}/60/60`}
              alt={tribe.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-center font-medium leading-tight"
            style={{ fontSize: 10, color: "oklch(0.38 0.05 68)", maxWidth: 56 }}
          >
            {tribe.name}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CulturalFeedSection() {
  const [activeTab, setActiveTab] = useState<Subcategory>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);

  // Collapse state – both start minimised
  const [allContentExpanded, setAllContentExpanded] = useState(false);
  const [reelsExpanded, setReelsExpanded] = useState(false);
  const [tribeExpanded, setTribeExpanded] = useState(false);

  // Filter state
  const [selectedTribes, setSelectedTribes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>([]);
  const [sortBy, setSortBy] = useState("Trending");

  // Like / Save state
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  const [searchQuery, setSearchQuery] = useState("");

  const toggleLike = (id: number) =>
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSave = (id: number) =>
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleChip = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) => {
    arr.includes(val)
      ? setArr(arr.filter((x) => x !== val))
      : setArr([...arr, val]);
  };

  const filteredContent = MOCK_CONTENT.filter((item) => {
    if (activeTab !== "All" && item.subcategory !== activeTab) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type))
      return false;
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Most Viewed") return b.likes - a.likes;
    if (sortBy === "Latest") return b.id - a.id;
    return b.likes + b.comments - (a.likes + a.comments); // Trending
  });

  const browStyle = { color: "oklch(0.52 0.135 38)" };

  return (
    <FeedSection title="Cultural Feed" icon={Feather}>
      <div
        className="px-4"
        style={{
          background: "oklch(0.97 0.018 68 / 0.5)",
          borderRadius: 16,
          paddingBottom: 16,
        }}
      >
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-3 pt-1">
          <div>
            <h3 className="font-bold text-base" style={browStyle}>
              Cultural
            </h3>
            <p className="text-xs" style={{ color: "oklch(0.58 0.04 68)" }}>
              Explore Tribal Heritage
            </p>
          </div>
          <div className="flex gap-2 mt-0.5">
            <button
              type="button"
              data-ocid="cultural.search_input"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "oklch(0.93 0.03 68)", ...browStyle }}
            >
              <Search size={15} />
            </button>
            <button
              type="button"
              data-ocid="cultural.filter.toggle"
              onClick={() => setFilterOpen(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "oklch(0.93 0.03 68)", ...browStyle }}
            >
              <Filter size={15} />
            </button>
          </div>
        </div>

        {/* ── Search Bar ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-3"
            >
              <input
                type="text"
                placeholder="Search cultural content…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-ocid="cultural.search_input"
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: "white",
                  border: "1.5px solid oklch(0.87 0.04 68)",
                  color: "oklch(0.25 0.03 68)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Subcategory Pills ──────────────────────────────────────────── */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {SUBCATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid={"cultural.tab"}
              onClick={() => setActiveTab(cat)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background:
                  activeTab === cat
                    ? "oklch(0.52 0.135 38)"
                    : "oklch(0.91 0.02 68)",
                color: activeTab === cat ? "white" : "oklch(0.35 0.03 68)",
                border: "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Explore by Tribe ──────────────────────────────────────────── */}
        <div className="mb-5">
          <CollapsibleHeader
            title="Explore by Tribe"
            expanded={tribeExpanded}
            onToggle={() => setTribeExpanded((v) => !v)}
            ocidPrefix="cultural.tribe"
          />
          {/* Always-visible preview: first 5 tribes */}
          <TribeChipRow
            tribes={MAJOR_TRIBES.slice(0, 5)}
            onSelect={() => setActiveTab("All")}
          />
          {/* Expandable full list */}
          <AnimatePresence initial={false}>
            {tribeExpanded && (
              <motion.div
                key="tribe-expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex flex-col gap-4 mt-4">
                  {TRIBE_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p
                        className="font-medium mb-2"
                        style={{ fontSize: 10, color: "oklch(0.58 0.06 55)" }}
                      >
                        {group.label}
                      </p>
                      <TribeChipRow
                        tribes={group.tribes}
                        onSelect={() => setActiveTab("All")}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Trending in Culture ───────────────────────────────────────── */}
        <div className="mb-5">
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "oklch(0.42 0.05 68)" }}
          >
            Trending in Culture 🔥
          </p>
          <div
            className="flex gap-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {TRENDING.map((item, i) => (
              <motion.div
                key={item.id}
                data-ocid={`cultural.card.${i + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex-shrink-0 w-36 rounded-xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
                  border: "1px solid oklch(0.91 0.02 68)",
                }}
              >
                <div className="relative h-24">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <TypeBadge type={item.type} />
                  </div>
                </div>
                <div className="bg-white px-2 py-1.5">
                  <p
                    className="font-semibold leading-tight line-clamp-2"
                    style={{ fontSize: 10, color: "oklch(0.25 0.03 68)" }}
                  >
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 2-Column Content Grid (collapsible) ───────────────────────── */}
        <div className="mb-5">
          <CollapsibleHeader
            title={activeTab === "All" ? "All Content" : activeTab}
            count={filteredContent.length}
            expanded={allContentExpanded}
            onToggle={() => setAllContentExpanded((v) => !v)}
            ocidPrefix="cultural.all_content"
          />

          <AnimatePresence initial={false}>
            {allContentExpanded && (
              <motion.div
                key="all-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                {filteredContent.length === 0 ? (
                  <div
                    data-ocid="cultural.empty_state"
                    className="text-center py-8 rounded-xl"
                    style={{ background: "white", color: "oklch(0.6 0.03 68)" }}
                  >
                    <p className="text-sm font-medium">No content found</p>
                    <p className="text-xs mt-1">
                      Try a different filter or category
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 gap-3 pt-1"
                    >
                      {filteredContent.map((item, idx) => (
                        <ContentCard
                          key={item.id}
                          item={item}
                          liked={likedIds.has(item.id)}
                          saved={savedIds.has(item.id)}
                          onLike={() => toggleLike(item.id)}
                          onSave={() => toggleSave(item.id)}
                          index={idx}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Cultural Reels (collapsible) ──────────────────────────────── */}
        <div className="mb-6">
          <CollapsibleHeader
            title="Cultural Reels 🎥"
            count={REELS.length}
            expanded={reelsExpanded}
            onToggle={() => setReelsExpanded((v) => !v)}
            ocidPrefix="cultural.reels"
          />

          <AnimatePresence initial={false}>
            {reelsExpanded && (
              <motion.div
                key="reels"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex flex-col gap-3 pt-1">
                  {REELS.map((reel, i) => (
                    <motion.div
                      key={reel.id}
                      data-ocid={`cultural.item.${i + 1}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative w-full rounded-xl overflow-hidden cursor-pointer"
                      style={{
                        height: 192,
                        boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
                      }}
                    >
                      <img
                        src={reel.image}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(6px)",
                            border: "2px solid rgba(255,255,255,0.5)",
                          }}
                        >
                          <Play
                            size={20}
                            fill="white"
                            className="text-white ml-0.5"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p
                          className="text-white font-semibold leading-tight"
                          style={{ fontSize: 12 }}
                        >
                          {reel.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Video size={10} className="text-white opacity-80" />
                          <span
                            className="text-white opacity-80"
                            style={{ fontSize: 10 }}
                          >
                            Cultural Reel
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Floating Upload CTA ──────────────────────────────────────── */}
        <div className="relative flex justify-end mb-2">
          <AnimatePresence>
            {uploadMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute bottom-14 right-0 rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  border: "1px solid oklch(0.9 0.03 68)",
                  minWidth: 160,
                }}
                data-ocid="cultural.popover"
              >
                {[
                  { label: "Upload Video", icon: <Upload size={14} /> },
                  { label: "Upload Photos", icon: <Camera size={14} /> },
                  { label: "Write Story", icon: <PenLine size={14} /> },
                  { label: "Add Event", icon: <CalendarPlus size={14} /> },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    data-ocid="cultural.upload_button"
                    onClick={() => setUploadMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50 text-left"
                    style={{ color: "oklch(0.38 0.05 68)" }}
                  >
                    <span style={browStyle}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {uploadMenuOpen && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: "oklch(0.93 0.04 68)", ...browStyle }}
                >
                  Share Your Culture
                </motion.span>
              )}
            </AnimatePresence>
            <motion.button
              type="button"
              data-ocid="cultural.open_modal_button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setUploadMenuOpen(!uploadMenuOpen)}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white"
              style={{
                background: "oklch(0.52 0.135 38)",
                boxShadow: "0 4px 16px oklch(0.52 0.135 38 / 0.45)",
              }}
            >
              <motion.div
                animate={{ rotate: uploadMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={22} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Filter Bottom Sheet ───────────────────────────────────────── */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              data-ocid="cultural.modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.45)" }}
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="fixed bottom-0 left-1/2 z-50 rounded-t-2xl overflow-hidden"
              style={{
                translateX: "-50%",
                width: "min(390px, 100vw)",
                background: "white",
                boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "oklch(0.85 0.03 68)" }}
                />
              </div>

              <div className="px-5 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-sm" style={browStyle}>
                    Filter & Sort
                  </p>
                  <button
                    type="button"
                    data-ocid="cultural.close_button"
                    onClick={() => setFilterOpen(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.93 0.03 68)" }}
                  >
                    <X size={14} style={{ color: "oklch(0.45 0.04 68)" }} />
                  </button>
                </div>

                {/* Filter by Tribe */}
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "oklch(0.5 0.04 68)" }}
                >
                  Filter by Tribe
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {TRIBE_FILTER_CHIPS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      data-ocid="cultural.toggle"
                      onClick={() =>
                        toggleChip(selectedTribes, setSelectedTribes, t)
                      }
                      className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: selectedTribes.includes(t)
                          ? "oklch(0.52 0.135 38)"
                          : "oklch(0.93 0.03 68)",
                        color: selectedTribes.includes(t)
                          ? "white"
                          : "oklch(0.38 0.04 68)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Filter by Location */}
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "oklch(0.5 0.04 68)" }}
                >
                  Location
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {LOCATION_CHIPS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      data-ocid="cultural.toggle"
                      onClick={() =>
                        toggleChip(selectedLocations, setSelectedLocations, loc)
                      }
                      className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: selectedLocations.includes(loc)
                          ? "oklch(0.52 0.135 38)"
                          : "oklch(0.93 0.03 68)",
                        color: selectedLocations.includes(loc)
                          ? "white"
                          : "oklch(0.38 0.04 68)",
                      }}
                    >
                      {loc}
                    </button>
                  ))}
                </div>

                {/* Content Type */}
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "oklch(0.5 0.04 68)" }}
                >
                  Content Type
                </p>
                <div className="flex gap-2 mb-5">
                  {CONTENT_TYPES.map((ct) => (
                    <button
                      key={ct}
                      type="button"
                      data-ocid="cultural.toggle"
                      onClick={() =>
                        toggleChip(selectedTypes, setSelectedTypes, ct)
                      }
                      className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: selectedTypes.includes(ct)
                          ? "oklch(0.52 0.135 38)"
                          : "oklch(0.93 0.03 68)",
                        color: selectedTypes.includes(ct)
                          ? "white"
                          : "oklch(0.38 0.04 68)",
                      }}
                    >
                      {ct}
                    </button>
                  ))}
                </div>

                {/* Sort by */}
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "oklch(0.5 0.04 68)" }}
                >
                  Sort by
                </p>
                <div className="flex gap-2 mb-6">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-ocid="cultural.radio"
                      onClick={() => setSortBy(s)}
                      className="flex-1 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background:
                          sortBy === s
                            ? "oklch(0.52 0.135 38)"
                            : "oklch(0.93 0.03 68)",
                        color: sortBy === s ? "white" : "oklch(0.38 0.04 68)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    data-ocid="cultural.cancel_button"
                    onClick={() => {
                      setSelectedTribes([]);
                      setSelectedLocations([]);
                      setSelectedTypes([]);
                      setSortBy("Trending");
                    }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: "oklch(0.93 0.03 68)",
                      color: "oklch(0.42 0.04 68)",
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    data-ocid="cultural.confirm_button"
                    onClick={() => setFilterOpen(false)}
                    className="flex-2 px-8 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{
                      background: "oklch(0.52 0.135 38)",
                      boxShadow: "0 3px 12px oklch(0.52 0.135 38 / 0.35)",
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </FeedSection>
  );
}
