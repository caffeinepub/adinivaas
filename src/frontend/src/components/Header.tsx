import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Heart } from "lucide-react";
import { useState } from "react";
import LikesPopover from "./LikesPopover";
import NotificationsPopover from "./NotificationsPopover";

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
  const [likesOpen, setLikesOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);

  const toggleLikes = () => {
    setNotifsOpen(false);
    setLikesOpen((v) => !v);
  };

  const toggleNotifs = () => {
    setLikesOpen(false);
    setNotifsOpen((v) => !v);
  };

  return (
    <header
      className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between"
      style={{ boxShadow: "0 2px 8px rgba(163,74,46,0.07)" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-2xl font-bold tracking-tight"
          style={{
            color: "oklch(0.42 0.12 40)",
            fontWeight: 800,
            letterSpacing: "0.5px",
          }}
        >
          ADINIVAAS
        </span>
      </div>
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <button
            type="button"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              likesOpen ? "bg-accent" : "hover:bg-accent"
            }`}
            data-ocid="header.favorites_button"
            aria-label="Likes"
            onClick={toggleLikes}
          >
            <Heart
              size={20}
              style={
                likesOpen
                  ? {
                      color: "oklch(0.52 0.135 38)",
                      fill: "oklch(0.52 0.135 38)",
                    }
                  : {}
              }
              className={likesOpen ? "" : "text-muted-foreground"}
            />
          </button>
          <LikesPopover
            isOpen={likesOpen}
            onClose={() => setLikesOpen(false)}
          />
        </div>

        <div className="relative">
          <button
            type="button"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors relative ${
              notifsOpen ? "bg-accent" : "hover:bg-accent"
            }`}
            data-ocid="header.notifications_button"
            aria-label="Notifications"
            onClick={toggleNotifs}
          >
            <Bell
              size={20}
              style={notifsOpen ? { color: "oklch(0.52 0.135 38)" } : {}}
              className={notifsOpen ? "" : "text-muted-foreground"}
            />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <NotificationsPopover
            isOpen={notifsOpen}
            onClose={() => setNotifsOpen(false)}
          />
        </div>

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
