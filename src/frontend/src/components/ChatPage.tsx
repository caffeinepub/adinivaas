import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Heart, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ChatMessage {
  id: number;
  from: "me" | "them";
  text: string;
}

interface ChatItem {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  category: string;
  messages: ChatMessage[];
}

const CHATS: ChatItem[] = [
  {
    id: 1,
    name: "Guru Ramesh Gond",
    avatar: "https://picsum.photos/seed/guru1/100/100",
    lastMessage: "Your tribal roots are your strength, keep learning.",
    time: "9:30 AM",
    unread: 2,
    category: "mentors",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Good morning! How is your learning going?",
      },
      {
        id: 2,
        from: "me",
        text: "It's going well, I completed the module on tribal heritage.",
      },
      {
        id: 3,
        from: "them",
        text: "Your tribal roots are your strength, keep learning.",
      },
    ],
  },
  {
    id: 2,
    name: "Dadi Saraswati Bhil",
    avatar: "https://picsum.photos/seed/dadi2/100/100",
    lastMessage: "The weaving workshop starts next week, don't miss it!",
    time: "Yesterday",
    unread: 1,
    category: "mentors",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Hello dear, are you interested in traditional weaving?",
      },
      { id: 2, from: "me", text: "Yes absolutely! I'd love to learn." },
      {
        id: 3,
        from: "them",
        text: "The weaving workshop starts next week, don't miss it!",
      },
    ],
  },
  {
    id: 3,
    name: "Elder Vikram Munda",
    avatar: "https://picsum.photos/seed/elder3/100/100",
    lastMessage: "We will discuss forest rights in our next session.",
    time: "Mon",
    unread: 0,
    category: "mentors",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Welcome to the community mentorship circle.",
      },
      { id: 2, from: "me", text: "Thank you Elder, I'm honored." },
      {
        id: 3,
        from: "them",
        text: "We will discuss forest rights in our next session.",
      },
    ],
  },
  {
    id: 4,
    name: "HR - Tribal Crafts Co.",
    avatar: "https://picsum.photos/seed/hr4/100/100",
    lastMessage: "Can you share your portfolio for the artisan role?",
    time: "10:15 AM",
    unread: 3,
    category: "jobs",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Hi, we saw your job application for the artisan position.",
      },
      {
        id: 2,
        from: "me",
        text: "Yes, I applied last week. Looking forward to hearing from you.",
      },
      {
        id: 3,
        from: "them",
        text: "Can you share your portfolio for the artisan role?",
      },
    ],
  },
  {
    id: 5,
    name: "Recruit - Adivasi NGO",
    avatar: "https://picsum.photos/seed/recruit5/100/100",
    lastMessage: "Interview scheduled for Thursday 3 PM.",
    time: "Yesterday",
    unread: 0,
    category: "jobs",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Thank you for applying to our community coordinator role.",
      },
      {
        id: 2,
        from: "me",
        text: "I'm very passionate about this opportunity.",
      },
      { id: 3, from: "them", text: "Interview scheduled for Thursday 3 PM." },
    ],
  },
  {
    id: 6,
    name: "Meena's Tribal Store",
    avatar: "https://picsum.photos/seed/meena6/100/100",
    lastMessage: "Minimum order is 50 pieces for the fabric line.",
    time: "11:00 AM",
    unread: 1,
    category: "business",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Hello! I'm interested in your handloom products.",
      },
      {
        id: 2,
        from: "me",
        text: "Great! We have a wonderful range of tribal fabrics.",
      },
      {
        id: 3,
        from: "them",
        text: "Minimum order is 50 pieces for the fabric line.",
      },
    ],
  },
  {
    id: 7,
    name: "Arjun Handicrafts",
    avatar: "https://picsum.photos/seed/arjun7/100/100",
    lastMessage: "We can do custom sizes for your export requirement.",
    time: "Mon",
    unread: 0,
    category: "business",
    messages: [
      {
        id: 1,
        from: "them",
        text: "We specialize in Warli art pieces for corporate gifting.",
      },
      {
        id: 2,
        from: "me",
        text: "Interesting! What are your bulk pricing options?",
      },
      {
        id: 3,
        from: "them",
        text: "We can do custom sizes for your export requirement.",
      },
    ],
  },
  {
    id: 8,
    name: "Priya ✨",
    avatar: "https://picsum.photos/seed/priyam8/200/200",
    lastMessage: "Haha yes I love the Warli dance festivals too 😍",
    time: "Just now",
    unread: 2,
    category: "sangi",
    messages: [
      { id: 1, from: "them", text: "Hey! I saw you like tribal arts too 🎨" },
      {
        id: 2,
        from: "me",
        text: "Yes! Especially the dance forms, they're magical.",
      },
      {
        id: 3,
        from: "them",
        text: "Haha yes I love the Warli dance festivals too 😍",
      },
    ],
  },
  {
    id: 9,
    name: "Kavya 🌸",
    avatar: "https://picsum.photos/seed/kavyam9/200/200",
    lastMessage: "Should we meet at the tribal mela this weekend? 🌺",
    time: "5m ago",
    unread: 1,
    category: "sangi",
    messages: [
      {
        id: 1,
        from: "them",
        text: "We matched! I love that you're into farming too 🌾",
      },
      {
        id: 2,
        from: "me",
        text: "Yes! Sustainable farming is so close to my heart.",
      },
      {
        id: 3,
        from: "them",
        text: "Should we meet at the tribal mela this weekend? 🌺",
      },
    ],
  },
  {
    id: 10,
    name: "Sita 💫",
    avatar: "https://picsum.photos/seed/sitam10/200/200",
    lastMessage: "Tell me more about your village traditions! 🌿",
    time: "1h ago",
    unread: 0,
    category: "sangi",
    messages: [
      {
        id: 1,
        from: "them",
        text: "Your profile is so vibrant! From which tribe are you?",
      },
      { id: 2, from: "me", text: "I'm from the Gond community. And you?" },
      {
        id: 3,
        from: "them",
        text: "Tell me more about your village traditions! 🌿",
      },
    ],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  mentors: "Tribal Mentors",
  jobs: "Job Inquiries",
  business: "Business Inquiry",
};

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<ChatItem | null>(null);
  const [inputVal, setInputVal] = useState("");

  const regularChats = CHATS.filter((c) => c.category !== "sangi");
  const sangiChats = CHATS.filter((c) => c.category === "sangi");

  const grouped: Record<string, ChatItem[]> = {};
  for (const chat of regularChats) {
    if (!grouped[chat.category]) grouped[chat.category] = [];
    grouped[chat.category].push(chat);
  }

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {activeChat ? (
          <motion.div
            key="chat-detail"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
              <button
                type="button"
                onClick={() => setActiveChat(null)}
                className="p-1 rounded-full hover:bg-accent transition-colors"
                data-ocid="chat.close_button"
              >
                <ArrowLeft size={20} className="text-foreground" />
              </button>
              <Avatar className="w-9 h-9">
                <AvatarImage src={activeChat.avatar} />
                <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {activeChat.name}
                </p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
            <ScrollArea className="flex-1 px-4 py-3">
              <div className="space-y-3">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                        msg.from === "me"
                          ? "text-white rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                      style={
                        msg.from === "me"
                          ? { background: "oklch(0.52 0.135 38)" }
                          : {}
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card">
              <Input
                placeholder="Type a message..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 rounded-full text-sm"
                data-ocid="chat.input"
              />
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                style={{ background: "oklch(0.52 0.135 38)" }}
                data-ocid="chat.submit_button"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-2">
              <h2 className="text-lg font-bold text-foreground">Messages</h2>
            </div>
            {Object.entries(grouped).map(([category, chats]) => (
              <div key={category}>
                <div className="px-4 py-1.5 bg-muted/60">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {CATEGORY_LABELS[category]}
                  </span>
                </div>
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors text-left"
                    onClick={() => setActiveChat(chat)}
                    data-ocid={`chat.item.${chat.id}`}
                  >
                    <Avatar className="w-11 h-11 flex-shrink-0">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-foreground">
                          {chat.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge
                        className="text-white text-xs min-w-[20px] h-5 flex items-center justify-center"
                        style={{ background: "oklch(0.52 0.135 38)" }}
                      >
                        {chat.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            ))}

            <div
              className="mx-4 my-4 rounded-2xl overflow-hidden border-2"
              style={{ borderColor: "oklch(0.52 0.135 38)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "oklch(0.95 0.03 38)" }}
              >
                <Heart
                  size={16}
                  fill="oklch(0.52 0.135 38)"
                  style={{ color: "oklch(0.52 0.135 38)" }}
                />
                <span
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 38)" }}
                >
                  Tribal Sangi Matches 💞
                </span>
              </div>
              {sangiChats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors text-left border-t border-border"
                  onClick={() => setActiveChat(chat)}
                  data-ocid={`chat.item.${chat.id}`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-11 h-11">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 text-sm">
                      💞
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "oklch(0.35 0.12 38)" }}
                      >
                        {chat.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge
                      className="text-white text-xs min-w-[20px] h-5 flex items-center justify-center"
                      style={{ background: "oklch(0.62 0.14 145)" }}
                    >
                      {chat.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
