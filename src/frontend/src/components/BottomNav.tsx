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

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {showAddMenu && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowAddMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Add Menu */}
      <AnimatePresence>
        {showAddMenu && (
          <motion.div
            key="add-menu"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[320px] bg-card rounded-2xl z-50 p-4"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          >
            <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-3">
              Add to feed
            </p>
            <div className="grid grid-cols-2 gap-2">
              {addOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-ocid={`add.${opt.id}.button`}
                    onClick={() => setShowAddMenu(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 hover:opacity-80 transition-opacity text-left"
                    style={{
                      background: `${opt.color}22`,
                      border: `1.5px solid ${opt.color}44`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: opt.color }}
                    >
                      <Icon size={14} color="white" />
                    </div>
                    <span
                      className="text-xs font-600"
                      style={{ color: opt.color, fontWeight: 600 }}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    ? "oklch(0.38 0.10 40)"
                    : "oklch(0.52 0.135 38)",
                  boxShadow: "0 4px 16px rgba(163,74,46,0.4)",
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
