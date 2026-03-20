import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Heart } from "lucide-react";

interface HeaderProps {
  onProfileClick: () => void;
  userName: string;
  userAvatar?: string;
}

export default function Header({
  onProfileClick,
  userName,
  userAvatar,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between"
      style={{ boxShadow: "0 2px 8px rgba(163,74,46,0.07)" }}
    >
      <div className="flex items-center gap-2">
        <MandalaIcon />
        <span
          className="text-2xl font-bold tracking-tight"
          style={{
            color: "oklch(0.52 0.135 38)",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          adinivaas
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
          data-ocid="header.favorites_button"
          aria-label="Favorites"
        >
          <Heart size={20} className="text-muted-foreground" />
        </button>
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent transition-colors relative"
          data-ocid="header.notifications_button"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>
        <button
          type="button"
          onClick={onProfileClick}
          data-ocid="header.profile_button"
          aria-label="Profile"
          className="rounded-full ring-2 ring-primary/30 hover:ring-primary/60 transition-all"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={userAvatar || "https://picsum.photos/seed/profile1/100/100"}
              alt={userName}
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}

function MandalaIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Adinivaas mandala icon"
    >
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="oklch(0.52 0.135 38)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="14"
        cy="14"
        r="8"
        stroke="oklch(0.52 0.135 38)"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="14" cy="14" r="3" fill="oklch(0.52 0.135 38)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="14"
          y1="14"
          x2={14 + 11 * Math.cos((deg * Math.PI) / 180)}
          y2={14 + 11 * Math.sin((deg * Math.PI) / 180)}
          stroke="oklch(0.52 0.135 38)"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={14 + 8 * Math.cos((deg * Math.PI) / 180)}
          cy={14 + 8 * Math.sin((deg * Math.PI) / 180)}
          r="1.5"
          fill="oklch(0.52 0.135 38)"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}
