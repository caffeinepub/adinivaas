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
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
            onKeyDown={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute top-14 right-2 z-50 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell size={16} style={{ color: "oklch(0.52 0.135 38)" }} />
                <span className="font-semibold text-sm text-foreground">
                  Notifications
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full hover:bg-accent transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>
            <ScrollArea className="max-h-80">
              {NOTIFS_DATA.map((group) => (
                <div key={group.section}>
                  <div className="px-4 py-2 bg-muted/50">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.section}
                    </span>
                  </div>
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent/40 transition-colors"
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
