import {
  Calendar,
  ExternalLink,
  Flower2,
  MapPin,
  Music,
  Ticket,
} from "lucide-react";
import { useState } from "react";

const RING_SIZES = [60, 90, 120, 150, 180, 210];

const festivals = [
  {
    id: "tribal-music-festival",
    title: "Tribal Music Festival 2026",
    subtitle: "Celebrating the Soul of the Jungle",
    date: "April 12–14, 2026",
    location: "Ranchi, Jharkhand",
    icon: Music,
    badge: "MUSIC",
    gradient: "from-[#7b3f00] to-[#c0622f]",
    accent: "#f4a553",
    ctaText: "Book Tickets",
    urgency: null as string | null,
    artists: ["Mudra Band", "Tribal Beats Collective", "Jharkhandi Folk Stars"],
  },
  {
    id: "sarhul-festival",
    title: "Sarhul Festival 2026",
    subtitle: "Sacred Spring Blossom Celebration",
    date: "March 27, 2026",
    location: "Multiple Venues, Jharkhand",
    icon: Flower2,
    badge: "FESTIVAL",
    gradient: "from-[#1a6e2e] to-[#3ab55a]",
    accent: "#a8f0ba",
    ctaText: "Buy Tickets Now",
    urgency: "Celebrating Next Week!" as string | null,
    artists: [
      "Traditional Tribal Dances",
      "Ritual Ceremonies",
      "Cultural Procession",
    ],
  },
];

function FestivalBanner({
  festival,
}: {
  festival: (typeof festivals)[0];
}) {
  const [booked, setBooked] = useState(false);
  const Icon = festival.icon;

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  const isBrown = festival.gradient.includes("7b3f");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${festival.gradient} shadow-lg mx-4 mb-3`}
    >
      {/* Background rings pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {RING_SIZES.map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border-2 border-white"
            style={{
              width: size,
              height: size,
              top: -20 + i * 10,
              right: -20 + i * 8,
            }}
          />
        ))}
      </div>

      {/* Urgency badge */}
      {festival.urgency && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse z-10">
          {festival.urgency}
        </div>
      )}

      {/* AD label */}
      <div className="absolute top-3 left-3 bg-black/30 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded z-10">
        AD
      </div>

      <div className="relative z-10 p-4 pt-8">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <Icon size={20} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: festival.accent,
                  color: isBrown ? "#7b3f00" : "#1a6e2e",
                }}
              >
                {festival.badge}
              </span>
            </div>
            <h3 className="text-white font-bold text-sm leading-tight">
              {festival.title}
            </h3>
            <p className="text-white/80 text-xs mt-0.5">{festival.subtitle}</p>
          </div>
        </div>

        {/* Details */}
        <div className="flex gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={11} color="rgba(255,255,255,0.7)" />
            <span className="text-white/80 text-[11px]">{festival.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={11} color="rgba(255,255,255,0.7)" />
            <span className="text-white/80 text-[11px]">
              {festival.location}
            </span>
          </div>
        </div>

        {/* Artists/Highlights */}
        <div className="flex flex-wrap gap-1 mb-4">
          {festival.artists.map((a) => (
            <span
              key={a}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {a}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleBook}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
          style={{
            backgroundColor: booked ? "rgba(255,255,255,0.3)" : "white",
            color: isBrown ? "#7b3f00" : "#1a6e2e",
          }}
        >
          {booked ? (
            "Booking Confirmed!"
          ) : (
            <>
              <Ticket size={15} />
              {festival.ctaText}
              <ExternalLink size={13} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function FestivalAdBanners() {
  return (
    <section className="mb-6">
      <div className="px-4 mb-3">
        <h2
          className="text-sm font-bold"
          style={{ color: "oklch(0.52 0.135 38)" }}
        >
          Upcoming Events
        </h2>
        <p className="text-xs text-muted-foreground">
          Book your spot at tribal festivals
        </p>
      </div>
      {festivals.map((f) => (
        <FestivalBanner key={f.id} festival={f} />
      ))}
    </section>
  );
}
