import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Image, Play, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import FeedSection from "./FeedSection";
import LatestFeedFullScreen from "./LatestFeedFullScreen";

const mockLatest = [
  {
    id: 1,
    thumb: "https://picsum.photos/seed/tribal1/400/260",
    type: "Video",
    title: "Sarhul Festival Dance Performance 2025",
    user: "Priya Oraon",
    userAvatar: "https://picsum.photos/seed/user1/60/60",
    caption: "A vibrant showcase of the Oraon community's spring festival",
    timeAgo: "Just now",
  },
  {
    id: 2,
    thumb: "https://picsum.photos/seed/tribal2/400/260",
    type: "Images",
    title: "Traditional Craft Workshop – Jharkhand",
    user: "Raman Munda",
    userAvatar: "https://picsum.photos/seed/user2/60/60",
    caption: "Explore the art of bamboo weaving passed down generations",
    timeAgo: "2m ago",
  },
  {
    id: 3,
    thumb: "https://picsum.photos/seed/tribal3/400/260",
    type: "Video",
    title: "Karma Puja Celebrations – Ranchi",
    user: "Sunita Toppo",
    userAvatar: "https://picsum.photos/seed/user3/60/60",
    caption: "The grandeur of Karma festival in full bloom this year",
    timeAgo: "5m ago",
  },
  {
    id: 4,
    thumb: "https://picsum.photos/seed/tribal4/400/260",
    type: "Images",
    title: "Tribal Art Exhibition – Kolkata",
    user: "Deepak Horo",
    userAvatar: "https://picsum.photos/seed/user4/60/60",
    caption: "Contemporary tribal artists redefine heritage with modern canvas",
    timeAgo: "12m ago",
  },
  {
    id: 5,
    thumb: "https://picsum.photos/seed/tribal5/400/260",
    type: "Video",
    title: "Gondwana Cultural Night – Nagpur",
    user: "Kavita Atram",
    userAvatar: "https://picsum.photos/seed/user5/60/60",
    caption: "An evening of Gond folk songs and traditional storytelling",
    timeAgo: "18m ago",
  },
];

const AUTO_SLIDE_INTERVAL = 3500;

export default function LatestFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const activeIdxRef = useRef(0);

  const scrollToIdx = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 320;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setActiveIdx(idx);
    activeIdxRef.current = idx;
  }, []);

  const scroll = (dir: "left" | "right") => {
    const next =
      dir === "right"
        ? (activeIdxRef.current + 1) % mockLatest.length
        : (activeIdxRef.current - 1 + mockLatest.length) % mockLatest.length;
    scrollToIdx(next);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 320;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(idx);
    activeIdxRef.current = idx;
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      const next = (activeIdxRef.current + 1) % mockLatest.length;
      scrollToIdx(next);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, scrollToIdx]);

  return (
    <>
      <FeedSection
        title="Latest Feed"
        icon={Zap}
        onSeeAll={() => setShowFullScreen(true)}
      >
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <button
            type="button"
            data-ocid="latest.pagination_prev"
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center shadow-lg"
            style={{
              background: "oklch(var(--primary))",
              color: "oklch(var(--primary-foreground))",
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {mockLatest.map((item, idx) => (
              <motion.div
                key={item.id}
                data-ocid={`latest.item.${idx + 1}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 22,
                }}
                className="flex-shrink-0 cursor-pointer"
                style={{
                  width: "clamp(300px, 88vw, 380px)",
                  scrollSnapAlign: "start",
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    boxShadow:
                      "0 10px 36px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)",
                    border: "1.5px solid oklch(var(--primary) / 0.25)",
                    background: "oklch(var(--card))",
                  }}
                >
                  <div
                    className="absolute top-0 right-0 z-20 overflow-hidden"
                    style={{ width: "64px", height: "64px" }}
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "-18px",
                        width: "72px",
                        background: "oklch(var(--primary))",
                        color: "oklch(var(--primary-foreground))",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textAlign: "center",
                        padding: "3px 0",
                        transform: "rotate(38deg)",
                        transformOrigin: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      }}
                    >
                      NEW
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full object-cover"
                      style={{ height: "clamp(200px, 56vw, 260px)" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {item.type === "Video" ? (
                        <Play size={11} fill="white" />
                      ) : (
                        <Image size={11} />
                      )}
                      {item.type}
                    </span>
                    {item.type === "Video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(6px)",
                            border: "2px solid rgba(255,255,255,0.65)",
                          }}
                        >
                          <Play size={26} fill="white" className="ml-1" />
                        </div>
                      </div>
                    )}
                    <p
                      className="absolute bottom-0 left-0 right-0 px-3.5 pb-3 text-base font-bold text-white line-clamp-2 leading-snug"
                      style={{
                        textShadow:
                          "0 1px 8px rgba(0,0,0,0.7), 0 0px 2px rgba(0,0,0,0.9)",
                      }}
                    >
                      {item.title}
                    </p>
                  </div>

                  <div
                    style={{
                      height: "3px",
                      background: "oklch(var(--primary))",
                      width: "100%",
                    }}
                  />

                  <div className="flex items-center gap-2.5 px-3.5 py-3">
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarImage src={item.userAvatar} alt={item.user} />
                      <AvatarFallback
                        className="text-xs"
                        style={{ background: "oklch(var(--accent))" }}
                      >
                        {item.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {item.user}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                        {item.caption}
                        <span
                          className="ml-1.5 font-medium"
                          style={{ color: "oklch(var(--primary))" }}
                        >
                          • {item.timeAgo}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            data-ocid="latest.pagination_next"
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center shadow-lg"
            style={{
              background: "oklch(var(--primary))",
              color: "oklch(var(--primary-foreground))",
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-2 pb-1">
          {mockLatest.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? "22px" : "8px",
                height: "8px",
                background:
                  i === activeIdx
                    ? "oklch(var(--primary))"
                    : "oklch(var(--muted-foreground) / 0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </FeedSection>

      <LatestFeedFullScreen
        isOpen={showFullScreen}
        onClose={() => setShowFullScreen(false)}
      />
    </>
  );
}
