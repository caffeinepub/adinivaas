import { Home, MessageCircle, Search, Users } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "center", label: "", icon: null },
  { id: "search", label: "Search", icon: Search },
  { id: "sangi", label: "Sangi", icon: Users },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border flex items-center justify-around px-3 py-2 z-40"
      style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.08)" }}
    >
      {tabs.map((tab) => {
        if (tab.id === "center") {
          return (
            <button
              type="button"
              key="center"
              onClick={() => onTabChange("center")}
              data-ocid="nav.center_button"
              className="relative -top-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
              style={{
                background: "oklch(0.52 0.135 38)",
                boxShadow: "0 4px 16px rgba(163,74,46,0.4)",
              }}
              aria-label="Home action"
            >
              <MandalaNavIcon />
            </button>
          );
        }
        const Icon = tab.icon!;
        const isActive = activeTab === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            data-ocid={`nav.${tab.id}.tab`}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors"
            style={{ minWidth: 48 }}
          >
            <Icon
              size={22}
              style={{
                color: isActive
                  ? "oklch(0.52 0.135 38)"
                  : "oklch(0.55 0.02 50)",
              }}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className="text-xs"
              style={{
                color: isActive
                  ? "oklch(0.52 0.135 38)"
                  : "oklch(0.55 0.02 50)",
                fontWeight: isActive ? 600 : 400,
                fontSize: "10px",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function MandalaNavIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-label="Adinivaas logo"
    >
      <circle
        cx="14"
        cy="14"
        r="10"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="14"
        cy="14"
        r="5"
        stroke="white"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="14" cy="14" r="2" fill="white" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={14 + 10 * Math.cos((deg * Math.PI) / 180)}
          cy={14 + 10 * Math.sin((deg * Math.PI) / 180)}
          r="1.5"
          fill="white"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}
