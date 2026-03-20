import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  PlusSquare,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const menuItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "business", label: "My Business", icon: Briefcase },
  { id: "create-biz", label: "Create Business Page", icon: PlusSquare },
  { id: "mentor", label: "Become a Mentor", icon: BookOpen },
  { id: "sacramental", label: "Sacramental Records", icon: FileText },
  { id: "feedback", label: "Share Feedback", icon: MessageSquare },
];

export default function ProfileDrawer({
  isOpen,
  onClose,
  userName,
  userAvatar,
  onLogout,
}: ProfileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(31,26,23,0.45)",
              backdropFilter: "blur(2px)",
            }}
            onClick={onClose}
            data-ocid="profile_drawer.modal"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 bg-card z-50 flex flex-col"
            style={{
              boxShadow: "-8px 0 32px rgba(0,0,0,0.15)",
              maxWidth: "80vw",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              data-ocid="profile_drawer.close_button"
            >
              <X size={18} className="text-muted-foreground" />
            </button>

            <div
              className="pt-10 pb-6 px-5 text-center"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.95 0.03 68), oklch(0.98 0.01 68))",
              }}
            >
              <div className="flex justify-center mb-3">
                <Avatar
                  className="w-20 h-20 ring-4"
                  style={
                    {
                      "--tw-ring-color": "oklch(0.52 0.135 38 / 0.3)",
                    } as React.CSSProperties
                  }
                >
                  <AvatarImage
                    src={
                      userAvatar ||
                      "https://picsum.photos/seed/profile1/100/100"
                    }
                    alt={userName}
                  />
                  <AvatarFallback
                    className="text-xl"
                    style={{
                      background: "oklch(0.52 0.135 38)",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3
                className="text-lg text-foreground mb-2"
                style={{ fontWeight: 700 }}
              >
                {userName}
              </h3>
              <Badge
                className="px-3 py-1 text-xs"
                style={{
                  background: "oklch(0.92 0.06 40)",
                  color: "oklch(0.44 0.13 36)",
                  border: "none",
                  fontWeight: 600,
                }}
              >
                ✦ Adinivaas Member
              </Badge>
            </div>

            <nav className="flex-1 px-4 py-4 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-foreground hover:bg-accent/60 active:bg-accent transition-colors text-left"
                        data-ocid={`profile_drawer.${item.id}.button`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "oklch(0.92 0.04 40)" }}
                        >
                          <Icon
                            size={15}
                            style={{ color: "oklch(0.52 0.135 38)" }}
                          />
                        </div>
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-4 pb-6 pt-2 border-t border-border">
              <p className="text-center text-xs text-muted-foreground mb-3">
                v1.0.16
              </p>
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-3 rounded-xl text-sm text-white transition-opacity hover:opacity-85"
                style={{ background: "oklch(0.52 0.135 38)", fontWeight: 700 }}
                data-ocid="profile_drawer.logout_button"
              >
                Logout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
