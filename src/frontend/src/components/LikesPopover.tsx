import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface LikeItem {
  id: number;
  name: string;
  avatar: string;
  action: string;
  time: string;
}

const LIKES_DATA: { section: string; items: LikeItem[] }[] = [
  {
    section: "Latest Feed Likes",
    items: [
      {
        id: 1,
        name: "Priya Gond",
        avatar: "https://picsum.photos/seed/priya1/100/100",
        action: "liked your Latest Feed post",
        time: "2m ago",
      },
      {
        id: 2,
        name: "Ravi Bhil",
        avatar: "https://picsum.photos/seed/ravi2/100/100",
        action: "liked your Latest Feed post",
        time: "15m ago",
      },
      {
        id: 3,
        name: "Meena Munda",
        avatar: "https://picsum.photos/seed/meena3/100/100",
        action: "liked your Latest Feed post",
        time: "1h ago",
      },
    ],
  },
  {
    section: "Jobs Likes",
    items: [
      {
        id: 4,
        name: "Arjun Santali",
        avatar: "https://picsum.photos/seed/arjun4/100/100",
        action: "liked your Job post",
        time: "3h ago",
      },
      {
        id: 5,
        name: "Sita Warli",
        avatar: "https://picsum.photos/seed/sita5/100/100",
        action: "liked your Job post",
        time: "5h ago",
      },
    ],
  },
  {
    section: "Cultural Content Likes",
    items: [
      {
        id: 6,
        name: "Dev Korku",
        avatar: "https://picsum.photos/seed/dev6/100/100",
        action: "liked your Cultural post",
        time: "1d ago",
      },
      {
        id: 7,
        name: "Kavya Halbi",
        avatar: "https://picsum.photos/seed/kavya7/100/100",
        action: "liked your Cultural post",
        time: "2d ago",
      },
    ],
  },
];

interface LikesPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LikesPopover({ isOpen, onClose }: LikesPopoverProps) {
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
            className="absolute top-14 left-2 z-50 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Heart
                  size={16}
                  style={{
                    color: "oklch(0.52 0.135 38)",
                    fill: "oklch(0.52 0.135 38)",
                  }}
                />
                <span className="font-semibold text-sm text-foreground">
                  Likes on Your Posts
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
              {LIKES_DATA.map((group) => (
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
