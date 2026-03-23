import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Play,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ReactDOM from "react-dom";

type PostType = "photo" | "video" | "job" | "cultural" | "text";

interface Post {
  id: number;
  type: PostType;
  userName: string;
  userInitials: string;
  avatarColor: string;
  tribe: string;
  location: string;
  timeAgo: string;
  // photo/video/cultural
  imageGradient?: string;
  imageEmoji?: string;
  caption?: string;
  videoDuration?: string;
  // job
  jobTitle?: string;
  company?: string;
  salary?: string;
  jobType?: string;
  // cultural
  culturalCategory?: string;
  tribeBadge?: string;
  // text
  statusText?: string;
  likes: number;
  comments: number;
}

const POSTS: Post[] = [
  {
    id: 1,
    type: "photo",
    userName: "Priya Oraon",
    userInitials: "PO",
    avatarColor: "#8B4513",
    tribe: "Oraon",
    location: "Ranchi, Jharkhand",
    timeAgo: "2 min ago",
    imageGradient: "linear-gradient(135deg, #f59e42 0%, #e05d2b 100%)",
    imageEmoji: "🌸",
    caption:
      "The Sarhul festival grounds are coming alive! Flowers everywhere, our village has never looked more beautiful. So proud of our culture 🌺",
    likes: 142,
    comments: 34,
  },
  {
    id: 2,
    type: "video",
    userName: "Rajan Munda",
    userInitials: "RM",
    avatarColor: "#2E7D32",
    tribe: "Munda",
    location: "Khunti, Jharkhand",
    timeAgo: "15 min ago",
    imageGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    imageEmoji: "🥁",
    caption:
      "Our tribal drum performance at the annual Karma Puja. Watch the full video!",
    videoDuration: "3:12",
    likes: 289,
    comments: 67,
  },
  {
    id: 3,
    type: "job",
    userName: "Tribal Jobs Network",
    userInitials: "TJ",
    avatarColor: "#6b4226",
    tribe: "Official",
    location: "Jharkhand",
    timeAgo: "25 min ago",
    jobTitle: "Community Development Officer",
    company: "Jharkhand Tribal Welfare NGO",
    salary: "₹28,000/month",
    jobType: "Full-Time",
    caption:
      "Join us to work directly with tribal communities across Jharkhand. No degree required – passion for community service is all we need!",
    likes: 87,
    comments: 22,
  },
  {
    id: 4,
    type: "cultural",
    userName: "Sunita Santal",
    userInitials: "SS",
    avatarColor: "#C0392B",
    tribe: "Santhal",
    location: "Dumka, Jharkhand",
    timeAgo: "42 min ago",
    imageGradient: "linear-gradient(135deg, #a8440c 0%, #d4890a 100%)",
    imageEmoji: "💃",
    caption:
      "Traditional Santhal dance form passed down through seven generations in our family. Every step tells a story.",
    culturalCategory: "Dance",
    tribeBadge: "Santhal",
    likes: 431,
    comments: 95,
  },
  {
    id: 5,
    type: "photo",
    userName: "Deepak Horo",
    userInitials: "DH",
    avatarColor: "#1565C0",
    tribe: "Ho",
    location: "Chaibasa, Jharkhand",
    timeAgo: "1 hr ago",
    imageGradient: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)",
    imageEmoji: "🎨",
    caption:
      "My artwork at the tribal art exhibition in Kolkata. 3 years of learning from my grandmother finally on display! 🙏",
    likes: 567,
    comments: 112,
  },
  {
    id: 6,
    type: "text",
    userName: "Kavita Atram",
    userInitials: "KA",
    avatarColor: "#7B1FA2",
    tribe: "Gond",
    location: "Nagpur, Maharashtra",
    timeAgo: "1 hr ago",
    statusText:
      '"Our culture is not a museum piece — it is alive, it breathes, it dances, it sings. Let us keep it alive together." 🌿',
    likes: 723,
    comments: 148,
  },
  {
    id: 7,
    type: "video",
    userName: "Bipin Kharia",
    userInitials: "BK",
    avatarColor: "#E65100",
    tribe: "Kharia",
    location: "Sundargarh, Odisha",
    timeAgo: "2 hr ago",
    imageGradient: "linear-gradient(135deg, #212121 0%, #424242 100%)",
    imageEmoji: "🎵",
    caption:
      "Live folk music performance from our village celebration last night. Pure tribal soul! 🎶",
    videoDuration: "5:47",
    likes: 198,
    comments: 51,
  },
  {
    id: 8,
    type: "job",
    userName: "Adinivaas Careers",
    userInitials: "AC",
    avatarColor: "#388E3C",
    tribe: "Platform",
    location: "Remote / Jharkhand",
    timeAgo: "2 hr ago",
    jobTitle: "Tribal Content Creator",
    company: "Adinivaas Platform",
    salary: "₹15,000–₹40,000/month",
    jobType: "Freelance",
    caption:
      "Share your culture and earn! We are looking for tribal content creators across India. Flexible hours, work from anywhere.",
    likes: 312,
    comments: 78,
  },
  {
    id: 9,
    type: "cultural",
    userName: "Anita Birhor",
    userInitials: "AB",
    avatarColor: "#00796B",
    tribe: "Birhor",
    location: "Latehar, Jharkhand",
    timeAgo: "3 hr ago",
    imageGradient: "linear-gradient(135deg, #8B6914 0%, #d4a843 100%)",
    imageEmoji: "🎵",
    caption:
      "Rare folk songs from the Birhor tribe, sung only during the harvest moon. These melodies are centuries old. 🌕",
    culturalCategory: "Music",
    tribeBadge: "Birhor",
    likes: 876,
    comments: 203,
  },
  {
    id: 10,
    type: "photo",
    userName: "Suresh Bhumij",
    userInitials: "SB",
    avatarColor: "#AD1457",
    tribe: "Bhumij",
    location: "Seraikela, Jharkhand",
    timeAgo: "3 hr ago",
    imageGradient: "linear-gradient(135deg, #c0392b 0%, #8e44ad 100%)",
    imageEmoji: "🏺",
    caption:
      "Hand-painted earthen pots made with ancient Bhumij techniques. Each pot takes 3 days and tells a different story.",
    likes: 344,
    comments: 89,
  },
  {
    id: 11,
    type: "video",
    userName: "Meena Savar",
    userInitials: "MS",
    avatarColor: "#0277BD",
    tribe: "Savar",
    location: "Keonjhar, Odisha",
    timeAgo: "4 hr ago",
    imageGradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
    imageEmoji: "🌾",
    caption:
      "Our harvest ceremony video — 40 families came together this year. This is what community means! 🙏",
    videoDuration: "2:58",
    likes: 612,
    comments: 134,
  },
  {
    id: 12,
    type: "job",
    userName: "Tribal Skill India",
    userInitials: "TS",
    avatarColor: "#5D4037",
    tribe: "Official",
    location: "Raipur, Chhattisgarh",
    timeAgo: "5 hr ago",
    jobTitle: "Handloom Weaving Instructor",
    company: "Chattisgarh Tribal Craft Council",
    salary: "₹22,000/month",
    jobType: "Part-Time",
    caption:
      "Teach traditional handloom weaving to the next generation. Experience in tribal weaving required. Housing provided.",
    likes: 156,
    comments: 43,
  },
  {
    id: 13,
    type: "cultural",
    userName: "Rajesh Paharia",
    userInitials: "RP",
    avatarColor: "#558B2F",
    tribe: "Paharia",
    location: "Godda, Jharkhand",
    timeAgo: "5 hr ago",
    imageGradient: "linear-gradient(135deg, #1b4332 0%, #40916c 100%)",
    imageEmoji: "🌳",
    caption:
      "The forest is our temple. This sacred grove has been maintained by our tribe for over 200 years. Nature is our god.",
    culturalCategory: "Heritage",
    tribeBadge: "Paharia",
    likes: 945,
    comments: 267,
  },
  {
    id: 14,
    type: "photo",
    userName: "Lalita Nagesia",
    userInitials: "LN",
    avatarColor: "#E53935",
    tribe: "Nagesia",
    location: "Bilaspur, Chhattisgarh",
    timeAgo: "6 hr ago",
    imageGradient: "linear-gradient(135deg, #e84393 0%, #f5a623 100%)",
    imageEmoji: "👗",
    caption:
      "My mother's handwoven saree — the pattern is unique to our Nagesia tribe. Each symbol has a deep meaning. 💕",
    likes: 489,
    comments: 97,
  },
  {
    id: 15,
    type: "text",
    userName: "Gopal Korwa",
    userInitials: "GK",
    avatarColor: "#37474F",
    tribe: "Korwa",
    location: "Korea, Chhattisgarh",
    timeAgo: "7 hr ago",
    statusText:
      "Today I taught my daughter our tribal language for the first time. She spoke three sentences in Korwa and I could not hold back tears. Language is identity. 🌱",
    likes: 1204,
    comments: 356,
  },
  {
    id: 16,
    type: "video",
    userName: "Nisha Kol",
    userInitials: "NK",
    avatarColor: "#00838F",
    tribe: "Kol",
    location: "Mirzapur, UP",
    timeAgo: "8 hr ago",
    imageGradient: "linear-gradient(135deg, #002244 0%, #003366 100%)",
    imageEmoji: "🔥",
    caption:
      "The Holika Dahan celebration in our village — tribal style! Different from what you see in cities. Our fire ceremony is ancient. 🕯️",
    videoDuration: "4:22",
    likes: 743,
    comments: 189,
  },
  {
    id: 17,
    type: "cultural",
    userName: "Suman Banjara",
    userInitials: "SB",
    avatarColor: "#FF6F00",
    tribe: "Banjara",
    location: "Hyderabad, Telangana",
    timeAgo: "9 hr ago",
    imageGradient:
      "linear-gradient(135deg, #FF6F00 0%, #FF8F00 50%, #FFA000 100%)",
    imageEmoji: "✨",
    caption:
      "Banjara embroidery work that took 6 months to complete. Our textiles have mirror work that goes back centuries! Each mirror reflects protection.",
    culturalCategory: "Art & Craft",
    tribeBadge: "Banjara",
    likes: 1567,
    comments: 412,
  },
  {
    id: 18,
    type: "job",
    userName: "Tribal Youth Jobs",
    userInitials: "TY",
    avatarColor: "#1A237E",
    tribe: "Network",
    location: "Bhubaneswar, Odisha",
    timeAgo: "10 hr ago",
    jobTitle: "Forest Guard (Govt)",
    company: "Odisha Forest Department",
    salary: "₹35,000/month",
    jobType: "Government",
    caption:
      "ST/SC reservation available. Protect the forests that have been home to our people for millennia. Application deadline: April 30, 2026.",
    likes: 523,
    comments: 147,
  },
  {
    id: 19,
    type: "photo",
    userName: "Durga Mahali",
    userInitials: "DM",
    avatarColor: "#B71C1C",
    tribe: "Mahali",
    location: "Mayurbhanj, Odisha",
    timeAgo: "11 hr ago",
    imageGradient: "linear-gradient(135deg, #6d4c41 0%, #a1887f 100%)",
    imageEmoji: "🎋",
    caption:
      "Bamboo furniture crafted entirely by hand. Took 2 weeks for this set. Buyers can contact via DM — shipping across India! 🛋️",
    likes: 387,
    comments: 73,
  },
  {
    id: 20,
    type: "photo",
    userName: "Birsa Community",
    userInitials: "BC",
    avatarColor: "#2E7D32",
    tribe: "Munda",
    location: "Khunti, Jharkhand",
    timeAgo: "12 hr ago",
    imageGradient: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
    imageEmoji: "🌿",
    caption:
      "Remembering Bhagwan Birsa Munda on the anniversary of his birth. His spirit lives in every tribal heart. Jai Johar! 🙏",
    likes: 2341,
    comments: 598,
  },
];

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  return (
    <article
      data-ocid={`latestfull.item.${post.id}`}
      className="bg-white border-b border-gray-100"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: post.avatarColor }}
          >
            {post.userInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {post.userName}
            </p>
            <p className="text-xs text-gray-500 leading-tight">
              {post.tribe} · {post.location} · {post.timeAgo}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 p-1"
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      {post.type === "photo" && (
        <>
          <div
            className="w-full flex items-center justify-center relative"
            style={{ height: "260px", background: post.imageGradient }}
          >
            <span className="text-7xl" role="img" aria-label="post image">
              {post.imageEmoji}
            </span>
          </div>
          {post.caption && (
            <p className="px-4 pt-3 pb-1 text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-gray-900">
                {post.userName}{" "}
              </span>
              {post.caption}
            </p>
          )}
        </>
      )}

      {post.type === "video" && (
        <>
          <div
            className="w-full flex items-center justify-center relative"
            style={{ height: "260px", background: post.imageGradient }}
          >
            <span className="text-7xl" role="img" aria-label="video thumbnail">
              {post.imageEmoji}
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(4px)",
                  border: "2px solid rgba(255,255,255,0.7)",
                }}
              >
                <Play size={28} fill="white" className="ml-1 text-white" />
              </div>
            </div>
            {post.videoDuration && (
              <span
                className="absolute bottom-2 right-3 text-xs font-bold text-white px-1.5 py-0.5 rounded"
                style={{ background: "rgba(0,0,0,0.65)" }}
              >
                {post.videoDuration}
              </span>
            )}
          </div>
          {post.caption && (
            <p className="px-4 pt-3 pb-1 text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-gray-900">
                {post.userName}{" "}
              </span>
              {post.caption}
            </p>
          )}
        </>
      )}

      {post.type === "cultural" && (
        <>
          <div
            className="w-full flex items-center justify-center relative"
            style={{ height: "260px", background: post.imageGradient }}
          >
            <span className="text-7xl" role="img" aria-label="cultural post">
              {post.imageEmoji}
            </span>
            {post.tribeBadge && (
              <span
                className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
                style={{ background: "oklch(0.42 0.12 38)" }}
              >
                {post.tribeBadge}
              </span>
            )}
            {post.culturalCategory && (
              <span
                className="absolute top-3 right-3 text-xs font-semibold text-white px-2.5 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                {post.culturalCategory}
              </span>
            )}
          </div>
          {post.caption && (
            <p className="px-4 pt-3 pb-1 text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-gray-900">
                {post.userName}{" "}
              </span>
              {post.caption}
            </p>
          )}
        </>
      )}

      {post.type === "job" && (
        <div
          className="mx-4 my-3 rounded-xl p-4"
          style={{ background: "#f0faf0", border: "1.5px solid #b7e2b7" }}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#6b4226" }}
            >
              <Briefcase size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 leading-tight">
                {post.jobTitle}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{post.company}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={11} />
                  {post.location}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#2E7D32" }}
                >
                  {post.salary}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background:
                      post.jobType === "Government" ? "#e8f0fe" : "#fff3e0",
                    color:
                      post.jobType === "Government" ? "#1565C0" : "#E65100",
                  }}
                >
                  {post.jobType}
                </span>
              </div>
            </div>
          </div>
          {post.caption && (
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              {post.caption}
            </p>
          )}
          <button
            type="button"
            data-ocid={`latestfull.job.button.${post.id}`}
            className="w-full py-2 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "#2E7D32" }}
          >
            Apply Now
          </button>
        </div>
      )}

      {post.type === "text" && (
        <div className="px-4 py-4">
          <p
            className="text-lg leading-relaxed font-medium text-gray-800"
            style={{ fontStyle: "italic" }}
          >
            {post.statusText}
          </p>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center gap-1 px-3 py-2.5">
        <button
          type="button"
          data-ocid={`latestfull.like.${post.id}`}
          onClick={toggleLike}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors hover:bg-red-50"
        >
          <Heart
            size={20}
            className={liked ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
          <span
            className="text-xs font-semibold"
            style={{ color: liked ? "#ef4444" : "#6b7280" }}
          >
            {likeCount.toLocaleString()}
          </span>
        </button>
        <button
          type="button"
          data-ocid={`latestfull.comment.${post.id}`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors hover:bg-blue-50"
        >
          <MessageCircle size={20} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-500">
            {post.comments.toLocaleString()}
          </span>
        </button>
        <button
          type="button"
          data-ocid={`latestfull.share.${post.id}`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors hover:bg-green-50"
        >
          <Send size={20} className="text-gray-500" />
        </button>
        <div className="flex-1" />
        <button
          type="button"
          data-ocid={`latestfull.save.${post.id}`}
          onClick={() => setSaved((p) => !p)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors hover:bg-yellow-50"
        >
          <Bookmark
            size={20}
            className={
              saved ? "text-amber-500 fill-amber-500" : "text-gray-500"
            }
          />
        </button>
      </div>
    </article>
  );
}

interface LatestFeedFullScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LatestFeedFullScreen({
  isOpen,
  onClose,
}: LatestFeedFullScreenProps) {
  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-ocid="latestfull.modal"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#fafaf8",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: "#6b4226",
              color: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <button
              type="button"
              data-ocid="latestfull.close_button"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={22} className="text-white" />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-base font-bold text-white">Latest Feed</h1>
              <p className="text-xs text-white/70">Community posts</p>
            </div>
            <button
              type="button"
              data-ocid="latestfull.close_button"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Scrollable Feed */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {/* Footer spacer */}
            <div className="py-8 text-center">
              <p className="text-xs text-gray-400">
                You've seen all the latest posts 🌿
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(content, document.body);
}
