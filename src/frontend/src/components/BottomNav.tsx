import {
  Briefcase,
  Feather,
  Home,
  MessageCircle,
  Plus,
  Search,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";

type AddOptionType = "latest-feed" | "cultural-content" | "jobs" | "business";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddOption?: (type: AddOptionType) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "center", label: "", icon: null },
  { id: "search", label: "Search", icon: Search },
  { id: "sangi", label: "Sangi", icon: Users },
];

const addOptions = [
  {
    id: "latest-feed",
    label: "Latest Feed",
    icon: Zap,
    color: "oklch(0.62 0.14 38)",
  },
  {
    id: "cultural-content",
    label: "Cultural Content",
    icon: Feather,
    color: "oklch(0.55 0.14 145)",
  },
  { id: "jobs", label: "Jobs", icon: Users, color: "oklch(0.52 0.13 260)" },
  {
    id: "business",
    label: "My Business",
    icon: Briefcase,
    color: "oklch(0.52 0.135 38)",
  },
];

export default function BottomNav({
  activeTab,
  onTabChange,
  onAddOption,
}: BottomNavProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const portal = createPortal(
    <AnimatePresence>
      {showAddMenu && (
        <motion.div
          key="add-menu"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px 12px",
              borderBottom: "1px solid oklch(0.93 0.02 60)",
              flexShrink: 0,
              background: "#fff",
            }}
          >
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>
                Add to Feed
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "oklch(0.55 0.02 50)",
                  margin: 0,
                  marginTop: 2,
                }}
              >
                Choose what you want to share with the community
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddMenu(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: "oklch(0.95 0.02 60)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <X size={18} style={{ color: "oklch(0.45 0.05 50)" }} />
            </button>
          </div>

          {/* Options grid */}
          <div
            style={{
              flex: 1,
              padding: "24px 20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              alignContent: "start",
            }}
          >
            {addOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  data-ocid={`add.${opt.id}.button`}
                  onClick={() => {
                    setShowAddMenu(false);
                    onAddOption?.(opt.id as AddOptionType);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 20,
                    padding: "24px 12px",
                    background: `${opt.color}18`,
                    border: `1.5px solid ${opt.color}44`,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: opt.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: opt.color,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <>
      {portal}
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
                onClick={() => setShowAddMenu((v) => !v)}
                data-ocid="nav.center_button"
                className="relative -top-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
                style={{
                  background: showAddMenu
                    ? "oklch(0.52 0.18 145)"
                    : "oklch(0.65 0.18 145)",
                  boxShadow: "0 4px 16px rgba(60,160,80,0.4)",
                  transition: "background 0.2s",
                }}
                aria-label="Add content"
              >
                <AnimatePresence mode="wait">
                  {showAddMenu ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={24} color="white" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plus"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Plus size={24} color="white" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
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
    </>
  );
}
