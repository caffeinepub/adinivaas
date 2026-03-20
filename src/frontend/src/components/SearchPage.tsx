import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Briefcase, ChevronRight, Search, Store, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MENTOR_SEARCHES = [
  {
    id: 1,
    name: "Guru Ramesh Gond",
    role: "Cultural Heritage Mentor",
    tribe: "Gond",
    avatar: "https://picsum.photos/seed/ms1/100/100",
  },
  {
    id: 2,
    name: "Dadi Saraswati Bhil",
    role: "Textile & Weaving Expert",
    tribe: "Bhil",
    avatar: "https://picsum.photos/seed/ms2/100/100",
  },
  {
    id: 3,
    name: "Elder Vikram Munda",
    role: "Forest Rights Advocate",
    tribe: "Munda",
    avatar: "https://picsum.photos/seed/ms3/100/100",
  },
  {
    id: 4,
    name: "Amma Priya Santali",
    role: "Folk Music Mentor",
    tribe: "Santali",
    avatar: "https://picsum.photos/seed/ms4/100/100",
  },
];

const JOB_SEARCHES = [
  {
    id: 1,
    title: "Tribal Artisan",
    company: "Adivasi Craft Co.",
    location: "Pune, Maharashtra",
  },
  {
    id: 2,
    title: "Community Coordinator",
    company: "NGO Tribal Rights",
    location: "Ranchi, Jharkhand",
  },
  {
    id: 3,
    title: "Folk Dance Instructor",
    company: "Cultural Academy",
    location: "Bhopal, MP",
  },
  {
    id: 4,
    title: "Forest Officer",
    company: "Govt. of Odisha",
    location: "Bhubaneswar, Odisha",
  },
];

const TRIBALPRENEUR_SEARCHES = [
  {
    id: 1,
    name: "Warli Art Studio",
    category: "Handmade Arts",
    avatar: "https://picsum.photos/seed/ts1/100/100",
  },
  {
    id: 2,
    name: "Gond Spice Farm",
    category: "Organic Produce",
    avatar: "https://picsum.photos/seed/ts2/100/100",
  },
  {
    id: 3,
    name: "Santali Weaves",
    category: "Textile & Fabric",
    avatar: "https://picsum.photos/seed/ts3/100/100",
  },
  {
    id: 4,
    name: "Munda Honey Collective",
    category: "Natural Foods",
    avatar: "https://picsum.photos/seed/ts4/100/100",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [mentors, setMentors] = useState(MENTOR_SEARCHES);
  const [jobs, setJobs] = useState(JOB_SEARCHES);
  const [tribalpreneurs, setTribalpreneurs] = useState(TRIBALPRENEUR_SEARCHES);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col overflow-y-auto h-full"
    >
      {/* Search Bar */}
      <div className="px-4 pt-4 pb-3 sticky top-0 bg-background z-10">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mentors, jobs, businesses..."
            className="pl-9 pr-9 rounded-full bg-muted border-0"
            data-ocid="search.search_input"
          />
          {query && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setQuery("")}
            >
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-6 space-y-6">
        {/* Mentor Searches */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-foreground">
              Recent Searches · Mentors
            </h3>
            <button
              type="button"
              className="text-xs"
              style={{ color: "oklch(0.52 0.135 38)" }}
              onClick={() => setMentors([])}
              data-ocid="search.secondary_button"
            >
              Clear all
            </button>
          </div>
          {mentors.length === 0 ? (
            <p
              className="text-xs text-muted-foreground"
              data-ocid="search.empty_state"
            >
              No recent mentor searches
            </p>
          ) : (
            <div className="space-y-2">
              {mentors.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 p-2.5 bg-card rounded-xl hover:bg-accent/30 cursor-pointer transition-colors"
                >
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={m.avatar} />
                    <AvatarFallback>{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {m.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.role} · {m.tribe}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-muted-foreground flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Searches */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-foreground">
              Recent Job Searches
            </h3>
            <button
              type="button"
              className="text-xs"
              style={{ color: "oklch(0.52 0.135 38)" }}
              onClick={() => setJobs([])}
              data-ocid="search.secondary_button"
            >
              Clear all
            </button>
          </div>
          {jobs.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No recent job searches
            </p>
          ) : (
            <div className="space-y-2">
              {jobs.map((j) => (
                <div
                  key={j.id}
                  className="flex items-center gap-3 p-2.5 bg-card rounded-xl hover:bg-accent/30 cursor-pointer transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.92 0.04 145)" }}
                  >
                    <Briefcase
                      size={18}
                      style={{ color: "oklch(0.45 0.12 145)" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {j.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {j.company} · {j.location}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-muted-foreground flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tribalpreneur Searches */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-foreground">
              Recent Tribalpreneurs
            </h3>
            <button
              type="button"
              className="text-xs"
              style={{ color: "oklch(0.52 0.135 38)" }}
              onClick={() => setTribalpreneurs([])}
              data-ocid="search.secondary_button"
            >
              Clear all
            </button>
          </div>
          {tribalpreneurs.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No recent business searches
            </p>
          ) : (
            <div className="space-y-2">
              {tribalpreneurs.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-2.5 bg-card rounded-xl hover:bg-accent/30 cursor-pointer transition-colors"
                >
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Store size={12} className="text-muted-foreground" />
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
