import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface NotifItem {
  id: number;
  name: string;
  avatar: string;
  action: string;
  time: string;
}

const NOTIFS_DATA: { section: string; items: NotifItem[] }[] = [
  {
    section: "New Followers",
    items: [
      {
        id: 1,
        name: "Mohan Gond",
        avatar: "https://picsum.photos/seed/mohan8/100/100",
        action: "started following you",
        time: "5m ago",
      },
      {
        id: 2,
        name: "Lata Bhil",
        avatar: "https://picsum.photos/seed/lata9/100/100",
        action: "started following you",
        time: "30m ago",
      },
      {
        id: 3,
        name: "Suresh Munda",
        avatar: "https://picsum.photos/seed/suresh10/100/100",
        action: "started following you",
        time: "2h ago",
      },
    ],
  },
  {
    section: "Job Interest",
    items: [
      {
        id: 4,
        name: "Priya Warli",
        avatar: "https://picsum.photos/seed/priyaw4/100/100",
        action: "showed interest in your Job post",
        time: "4h ago",
      },
      {
        id: 5,
        name: "Dev Santali",
        avatar: "https://picsum.photos/seed/devs5/100/100",
        action: "showed interest in your Job post",
        time: "6h ago",
      },
    ],
  },
  {
    section: "Business Interest",
    items: [
      {
        id: 6,
        name: "Kavya Korku",
        avatar: "https://picsum.photos/seed/kavyak6/100/100",
        action: "showed interest in your Business",
        time: "1d ago",
      },
      {
        id: 7,
        name: "Ravi Halbi",
        avatar: "https://picsum.photos/seed/ravih7/100/100",
        action: "showed interest in your Business",
        time: "2d ago",
      },
    ],
  },
];

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsPopover({
  isOpen,
  onClose,
}: NotificationsPopoverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="notif-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
          />
          {/* Top-centre levitating card */}
          <motion.div
            key="notif-card"
            initial={{ opacity: 0, scale: 0.88, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -20 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed left-1/2 top-16 -translate-x-1/2 w-[340px] bg-card rounded-3xl z-[70] overflow-hidden"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell size={16} style={{ color: "oklch(0.52 0.135 38)" }} />
                <span className="font-bold text-sm text-foreground">
                  Notifications
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>
            <ScrollArea className="max-h-[60vh]">
              {NOTIFS_DATA.map((group) => (
                <div key={group.section}>
                  <div className="px-5 py-2 bg-muted/50">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.section}
                    </span>
                  </div>
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-accent/40 transition-colors"
                    >
                      <Avatar className="w-9 h-9 flex-shrink-0">
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback className="text-xs">
                          {item.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.action}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
