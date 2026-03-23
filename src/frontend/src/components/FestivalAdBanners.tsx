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
    date: "Apr 12–14, 2026",
    location: "Ranchi, Jharkhand",
    icon: Music,
    bg: "linear-gradient(135deg, #5c2d0a 0%, #8b4513 60%, #a0522d 100%)",
    accentBg: "rgba(255,220,150,0.18)",
    accentText: "#ffd89b",
    dotColor: "#c17a40",
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
    bg: "linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 60%, #40916c 100%)",
    accentBg: "rgba(180,255,210,0.18)",
    accentText: "#b7e4c7",
    dotColor: "#40916c",
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
    bg: "linear-gradient(135deg, #4a2800 0%, #7a3f15 50%, #3a6b50 100%)",
    accentBg: "rgba(255,240,200,0.18)",
    accentText: "#ffe8b0",
    dotColor: "#6b3a1f",
    cta: "Register Now",
    urgency: "Next Month!" as string | null,
    pattern: "conference",
  },
];

function PatternBg({ type }: { type: string }) {
  if (type === "music") {
    // Minimal: just a few clean horizontal lines suggesting a music staff
    return (
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 80"
        preserveAspectRatio="xMidYMid slice"
      >
        {[20, 35, 50, 65].map((y) => (
          <line
            key={y}
            x1="120"
            y1={y}
            x2="200"
            y2={y}
            stroke="white"
            strokeWidth="0.7"
            opacity={0.12}
          />
        ))}
        <circle cx="178" cy="68" r="18" fill="white" opacity="0.04" />
        <circle cx="178" cy="68" r="10" fill="white" opacity="0.04" />
      </svg>
    );
  }
  if (type === "flower") {
    // Minimal: subtle concentric arc in corner
    return (
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 80"
        preserveAspectRatio="xMidYMid slice"
      >
        {[20, 34, 48].map((r) => (
          <circle
            key={r}
            cx="185"
            cy="10"
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            opacity={0.1}
          />
        ))}
        <circle cx="185" cy="70" r="22" fill="white" opacity="0.04" />
      </svg>
    );
  }
  // conference: minimal diagonal lines in far corner only
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid slice"
    >
      {[140, 160, 180, 200, 220].map((x) => (
        <line
          key={x}
          x1={x}
          y1={0}
          x2={x - 80}
          y2={80}
          stroke="white"
          strokeWidth="0.7"
          opacity={0.09}
        />
      ))}
      <circle cx="180" cy="60" r="20" fill="white" opacity="0.04" />
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
          <span
            className="text-[9px] font-bold tracking-widest uppercase"
            style={{ color: "#8b4513" }}
          >
            Sponsored
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "#c17a40", opacity: 0.5 }}
          />
          <span
            className="text-[9px]"
            style={{ color: "#8b4513", opacity: 0.7 }}
          >
            {current + 1}/{ads.length}
          </span>
        </div>
        {/* Pill dots */}
        <div className="flex gap-1">
          {ads.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleDot(a.id)}
              aria-label={`Go to ${a.title}`}
              className="transition-all duration-300"
              style={{
                width: a.id === ad.id ? 18 : 5,
                height: 5,
                borderRadius: 99,
                backgroundColor: a.id === ad.id ? ad.dotColor : "#d4a56a",
                opacity: a.id === ad.id ? 1 : 0.45,
              }}
            />
          ))}
        </div>
      </div>

      {/* Banner card */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          height: 80,
          background: ad.bg,
          boxShadow:
            "0 4px 18px rgba(90,45,10,0.22), 0 1.5px 4px rgba(0,0,0,0.12)",
        }}
      >
        <PatternBg type={ad.pattern} />

        {/* Urgency badge */}
        {ad.urgency && (
          <div
            className="absolute top-2 right-2 z-10 text-white text-[8px] font-bold px-2 py-0.5 rounded-full animate-pulse"
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(4px)",
            }}
          >
            {ad.urgency}
          </div>
        )}

        {/* AD pill */}
        <div
          className="absolute bottom-2 left-2 z-10 text-white text-[7px] font-semibold px-1.5 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.22)" }}
        >
          AD
        </div>

        <div className="relative z-10 flex items-center h-full px-3 gap-3">
          {/* Icon circle */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: ad.accentBg,
              border: "1.5px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Icon size={20} color="white" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            {/* Badge pill */}
            <div className="flex items-center gap-1 mb-0.5">
              <span
                className="text-[8px] font-bold px-1.5 py-0.5 rounded-full tracking-wide"
                style={{
                  background: ad.accentBg,
                  color: ad.accentText,
                  border: `1px solid ${ad.accentText}55`,
                }}
              >
                {ad.badge}
              </span>
            </div>
            <p
              className="text-white font-bold text-[12px] leading-tight truncate"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}
            >
              {ad.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5">
                <Calendar size={8} color="rgba(255,255,255,0.65)" />
                <span className="text-white/75 text-[9px]">{ad.date}</span>
              </span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
              <span className="flex items-center gap-0.5">
                <MapPin size={8} color="rgba(255,255,255,0.65)" />
                <span className="text-white/75 text-[9px] truncate">
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
              background: booked
                ? "rgba(255,255,255,0.20)"
                : "rgba(255,255,255,0.92)",
              color: booked ? "white" : "#5a2800",
              border: booked ? "1px solid rgba(255,255,255,0.4)" : "none",
              minWidth: 62,
              boxShadow: booked ? "none" : "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            {booked ? (
              <span className="text-[9px]">Booked ✓</span>
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
          className="absolute left-0 top-0 h-full w-6 flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.18), transparent)",
          }}
        >
          <ChevronLeft size={14} color="white" />
        </button>
        <button
          type="button"
          aria-label="Next ad"
          onClick={handleNext}
          className="absolute right-0 top-0 h-full w-6 flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.18), transparent)",
          }}
        >
          <ChevronRight size={14} color="white" />
        </button>
      </div>
    </div>
  );
}
