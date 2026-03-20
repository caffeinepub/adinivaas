import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LikesPopover from "./LikesPopover";
import NotificationsPopover from "./NotificationsPopover";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "kru", label: "Kurukh" },
  { code: "sat", label: "Santhal" },
  { code: "kha", label: "Kharia" },
  { code: "mun", label: "Mundari" },
];

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
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [langOpen]);

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

        {/* Language Selector */}
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium border transition-colors"
            style={{
              borderColor: "oklch(0.72 0.08 60)",
              color: "oklch(0.42 0.12 40)",
              background: langOpen
                ? "oklch(0.93 0.04 70)"
                : "oklch(0.97 0.02 70)",
            }}
          >
            <span className="uppercase">{selectedLang.code}</span>
            <ChevronDown size={8} style={{ opacity: 0.7 }} />
          </button>

          {langOpen && (
            <div
              className="absolute left-0 top-full mt-1 rounded-xl shadow-lg border py-1 z-50 min-w-[120px]"
              style={{
                background: "white",
                borderColor: "oklch(0.88 0.05 60)",
              }}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-xs font-medium transition-colors hover:bg-amber-50"
                  style={{
                    color:
                      selectedLang.code === lang.code
                        ? "oklch(0.52 0.135 38)"
                        : "oklch(0.35 0.05 40)",
                    fontWeight: selectedLang.code === lang.code ? 700 : 400,
                  }}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangOpen(false);
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
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
