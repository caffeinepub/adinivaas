import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flower2,
  MapPin,
  Music,
  Ticket,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ads = [
  {
    id: "tribal-music-festival",
    badge: "MUSIC",
    title: "Tribal Music Festival 2026",
    subtitle: "Celebrating the Soul of the Jungle",
    date: "Apr 12\u201314, 2026",
    location: "Ranchi, Jharkhand",
    icon: Music,
    bg: "from-[#7b3f00] via-[#a0522d] to-[#c0622f]",
    accentBg: "rgba(244,165,83,0.25)",
    accentText: "#f4a553",
    cta: "Book Tickets",
    urgency: null as string | null,
    pattern: "music",
  },
  {
    id: "sarhul-festival",
    badge: "FESTIVAL",
    title: "Sarhul Festival 2026",
    subtitle: "Sacred Spring Blossom Celebration",
    date: "Mar 27, 2026",
    location: "Multiple Venues, Jharkhand",
    icon: Flower2,
    bg: "from-[#1a6e2e] via-[#2a9d4e] to-[#3ab55a]",
    accentBg: "rgba(168,240,186,0.25)",
    accentText: "#a8f0ba",
    cta: "Buy Tickets",
    urgency: "Next Week!" as string | null,
    pattern: "flower",
  },
  {
    id: "tribal-conference",
    badge: "CONFERENCE",
    title: "Adivasi Unity Conference",
    subtitle: "Leaders, Voices & Tribal Future",
    date: "Apr 5, 2026",
    location: "Bhubaneswar, Odisha",
    icon: Users,
    bg: "from-[#2c2c54] via-[#4a3f8a] to-[#6a5acd]",
    accentBg: "rgba(180,160,255,0.25)",
    accentText: "#c4b0ff",
    cta: "Register Now",
    urgency: "Next Month!" as string | null,
    pattern: "conference",
  },
];

const MUSIC_XS = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190];
const FLOWER_CXS = [20, 60, 100, 140, 180];
const FLOWER_DEGS = [0, 60, 120, 180, 240, 300];
const CONF_ROWS = [0, 1, 2, 3, 4];
const CONF_COLS = [0, 1, 2, 3, 4, 5, 6];

function PatternBg({ type }: { type: string }) {
  if (type === "music") {
    return (
      <svg
        aria-label="Music pattern"
        role="img"
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 200 80"
        preserveAspectRatio="xMidYMid slice"
      >
        {MUSIC_XS.map((x, i) => (
          <g key={x}>
            <line
              x1={x}
              y1={5 + (i % 3) * 8}
              x2={x}
              y2={75 - (i % 4) * 8}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx={x} cy={75 - (i % 4) * 8} r="3" fill="white" />
          </g>
        ))}
      </svg>
    );
  }
  if (type === "flower") {
    return (
      <svg
        aria-label="Flower pattern"
        role="img"
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 200 80"
        preserveAspectRatio="xMidYMid slice"
      >
        {FLOWER_CXS.map((cx, i) => (
          <g key={cx}>
            {FLOWER_DEGS.map((deg) => (
              <ellipse
                key={deg}
                cx={cx}
                cy={20 + i * 15}
                rx="8"
                ry="3"
                transform={`rotate(${deg} ${cx} ${20 + i * 15})`}
                fill="white"
              />
            ))}
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg
      aria-label="Conference pattern"
      role="img"
      className="absolute inset-0 w-full h-full opacity-10"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid slice"
    >
      {CONF_ROWS.map((row) =>
        CONF_COLS.map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 30 - 5}
            y={row * 20 - 5}
            width="12"
            height="12"
            rx="2"
            fill="none"
            stroke="white"
            strokeWidth="1"
            transform={`rotate(45 ${col * 30 + 1} ${row * 20 + 1})`}
          />
        )),
      )}
    </svg>
  );
}

export default function FestivalAdBanners() {
  const [current, setCurrent] = useState(0);
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % ads.length), []);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + ads.length) % ads.length),
    [],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3200);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };
  const handleDot = (id: string) => {
    const i = ads.findIndex((a) => a.id === id);
    if (i >= 0) {
      setCurrent(i);
      resetTimer();
    }
  };

  const ad = ads[current];
  const Icon = ad.icon;

  const handleCta = () => {
    const adId = ad.id;
    setBookedIds((prev) => new Set(prev).add(adId));
    setTimeout(
      () =>
        setBookedIds((prev) => {
          const s = new Set(prev);
          s.delete(adId);
          return s;
        }),
      2500,
    );
  };

  const booked = bookedIds.has(ad.id);

  return (
    <div className="px-3 mb-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
            Sponsored
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span className="text-[9px] text-muted-foreground">
            {current + 1}/{ads.length}
          </span>
        </div>
        <div className="flex gap-1">
          {ads.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleDot(a.id)}
              aria-label={`Go to ${a.title}`}
              className="transition-all duration-300"
              style={{
                width: a.id === ad.id ? 16 : 5,
                height: 5,
                borderRadius: 99,
                backgroundColor:
                  a.id === ad.id
                    ? "oklch(0.52 0.135 38)"
                    : "oklch(0.85 0.05 38)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Banner card */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${ad.bg}`}
        style={{ height: 80 }}
      >
        <PatternBg type={ad.pattern} />

        {/* Urgency badge */}
        {ad.urgency && (
          <div className="absolute top-2 right-2 z-10 bg-white/20 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-pulse border border-white/30">
            {ad.urgency}
          </div>
        )}

        {/* AD pill */}
        <div className="absolute bottom-2 left-2 z-10 bg-black/25 text-white/70 text-[7px] font-semibold px-1.5 py-0.5 rounded">
          AD
        </div>

        <div className="relative z-10 flex items-center h-full px-3 gap-3">
          {/* Icon circle */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border border-white/20"
            style={{ backgroundColor: ad.accentBg }}
          >
            <Icon size={18} color="white" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span
                className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: ad.accentBg,
                  color: ad.accentText,
                  border: `1px solid ${ad.accentText}40`,
                }}
              >
                {ad.badge}
              </span>
            </div>
            <p className="text-white font-bold text-[12px] leading-tight truncate">
              {ad.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5">
                <Calendar size={8} color="rgba(255,255,255,0.6)" />
                <span className="text-white/70 text-[9px]">{ad.date}</span>
              </span>
              <span className="flex items-center gap-0.5">
                <MapPin size={8} color="rgba(255,255,255,0.6)" />
                <span className="text-white/70 text-[9px] truncate">
                  {ad.location}
                </span>
              </span>
            </div>
          </div>

          {/* CTA button */}
          <button
            type="button"
            onClick={handleCta}
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95"
            style={{
              backgroundColor: booked
                ? "rgba(255,255,255,0.25)"
                : "rgba(255,255,255,0.95)",
              color: booked ? "white" : "#5a3000",
              border: booked ? "1px solid rgba(255,255,255,0.4)" : "none",
              minWidth: 60,
            }}
          >
            {booked ? (
              <span className="text-[9px]">Booked \u2713</span>
            ) : (
              <>
                <Ticket size={10} />
                {ad.cta}
              </>
            )}
          </button>
        </div>

        {/* Side nav arrows */}
        <button
          type="button"
          aria-label="Previous ad"
          onClick={handlePrev}
          className="absolute left-0 top-0 h-full w-6 flex items-center justify-center bg-gradient-to-r from-black/20 to-transparent z-20 opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={14} color="white" />
        </button>
        <button
          type="button"
          aria-label="Next ad"
          onClick={handleNext}
          className="absolute right-0 top-0 h-full w-6 flex items-center justify-center bg-gradient-to-l from-black/20 to-transparent z-20 opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={14} color="white" />
        </button>
      </div>
    </div>
  );
}
