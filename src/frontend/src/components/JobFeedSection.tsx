import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Flag,
  Hammer,
  Heart,
  IndianRupee,
  MapPin,
  Palette,
  Plus,
  Search,
  Share2,
  SlidersHorizontal,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import FeedSection from "./FeedSection";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Job {
  id: number;
  title: string;
  company: string;
  companyInitials: string;
  companyColor: string;
  location: string;
  salary: string;
  jobType: string;
  category: string;
  description: string;
  tags: string[];
  verified: boolean;
  featured?: boolean;
  responsibilities: string[];
  requirements: string[];
  benefits: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const JOBS: Job[] = [
  {
    id: 1,
    title: "Community Health Worker",
    company: "Tribal Welfare Board",
    companyInitials: "TWB",
    companyColor: "#6B4226",
    location: "Ranchi, Jharkhand",
    salary: "₹18,000/mo",
    jobType: "Full-Time",
    category: "Full-Time",
    description: "Support community health programs in tribal villages.",
    tags: ["Urgent", "Verified"],
    verified: true,
    featured: true,
    responsibilities: [
      "Conduct health camps",
      "Track patient data",
      "Coordinate with doctors",
    ],
    requirements: [
      "12th pass",
      "Basic health training",
      "Local language preferred",
    ],
    benefits: "₹18,000/mo + TA/DA + Medical Insurance",
  },
  {
    id: 2,
    title: "Tribal Art Teacher",
    company: "Adivasi Academy",
    companyInitials: "AA",
    companyColor: "#C05621",
    location: "Rourkela, Odisha",
    salary: "₹22,000/mo",
    jobType: "Full-Time",
    category: "Full-Time",
    description:
      "Teach traditional Warli and Pattachitra art to school children.",
    tags: ["Verified"],
    verified: true,
    featured: true,
    responsibilities: [
      "Design curriculum",
      "Conduct art workshops",
      "Document tribal art forms",
    ],
    requirements: [
      "Graduate in Fine Arts",
      "Knowledge of tribal art forms",
      "Passion for culture",
    ],
    benefits: "₹22,000/mo + Housing Allowance",
  },
  {
    id: 3,
    title: "Forest Guard",
    company: "State Forest Dept.",
    companyInitials: "SFD",
    companyColor: "#2D6A4F",
    location: "Chaibasa, Jharkhand",
    salary: "₹25,000/mo",
    jobType: "Government Jobs",
    category: "Government Jobs",
    description: "Protect forest resources and support wildlife conservation.",
    tags: ["Government", "Verified"],
    verified: true,
    featured: true,
    responsibilities: [
      "Forest patrolling",
      "Wildlife monitoring",
      "Anti-poaching activities",
    ],
    requirements: [
      "10th pass",
      "Physical fitness test",
      "Knowledge of local terrain",
    ],
    benefits: "₹25,000/mo + Government perks + Pension",
  },
  {
    id: 4,
    title: "Data Entry Operator",
    company: "NREGA District Office",
    companyInitials: "NDO",
    companyColor: "#1565C0",
    location: "Bhubaneswar, Odisha",
    salary: "₹15,000/mo",
    jobType: "Government Jobs",
    category: "Government Jobs",
    description: "Manage digital records for NREGA beneficiary data.",
    tags: ["Government"],
    verified: true,
    responsibilities: [
      "Data entry and verification",
      "Report generation",
      "Database management",
    ],
    requirements: ["12th pass", "Basic computer skills", "Typing speed 30 WPM"],
    benefits: "₹15,000/mo + EPF + Gratuity",
  },
  {
    id: 5,
    title: "NGO Field Worker",
    company: "Grameen Vikas NGO",
    companyInitials: "GV",
    companyColor: "#7B3F00",
    location: "Chaibasa, Jharkhand",
    salary: "₹12,000/mo",
    jobType: "Part-Time",
    category: "Part-Time",
    description: "Assist in rural development and awareness programs.",
    tags: ["Remote"],
    verified: false,
    responsibilities: [
      "Community mobilization",
      "Survey and data collection",
      "Awareness campaigns",
    ],
    requirements: [
      "Graduate",
      "Bike/vehicle preferred",
      "Fluent in Sadri/Hindi",
    ],
    benefits: "₹12,000/mo + Travel allowance",
  },
  {
    id: 6,
    title: "Truck Driver",
    company: "Adivasi Logistics Co.",
    companyInitials: "ALC",
    companyColor: "#4A4A4A",
    location: "Rourkela, Odisha",
    salary: "₹20,000/mo",
    jobType: "Skill-Based Work",
    category: "Skill-Based Work",
    description: "Transport goods across tribal districts safely.",
    tags: ["Urgent"],
    verified: false,
    responsibilities: [
      "Safe goods transport",
      "Vehicle maintenance",
      "Route planning",
    ],
    requirements: ["Valid HMV license", "3+ years experience", "10th pass"],
    benefits: "₹20,000/mo + Per km allowance",
  },
  {
    id: 7,
    title: "IT Support Executive",
    company: "TechForGood Solutions",
    companyInitials: "TGS",
    companyColor: "#1B5E20",
    location: "Remote",
    salary: "₹28,000/mo",
    jobType: "Remote Jobs",
    category: "Remote Jobs",
    description: "Provide IT support for NGO and government digital projects.",
    tags: ["Remote", "Verified"],
    verified: true,
    responsibilities: [
      "Technical troubleshooting",
      "System setup",
      "User training",
    ],
    requirements: [
      "Graduate in IT/CS",
      "1+ year experience",
      "Good communication",
    ],
    benefits: "₹28,000/mo + WFH Allowance + Health cover",
  },
  {
    id: 8,
    title: "Carpenter (Skilled)",
    company: "Self Help Group Union",
    companyInitials: "SHG",
    companyColor: "#8D4004",
    location: "Ranchi, Jharkhand",
    salary: "₹600/day",
    jobType: "Freelance / Gigs",
    category: "Freelance / Gigs",
    description: "Craft furniture and traditional tribal woodwork items.",
    tags: ["Skill-Based"],
    verified: false,
    responsibilities: [
      "Furniture crafting",
      "Woodwork repairs",
      "Custom orders",
    ],
    requirements: [
      "5+ years skill",
      "Own tools preferred",
      "No formal education required",
    ],
    benefits: "₹600/day + Bonus on bulk orders",
  },
];

const SUBCATEGORIES = [
  "All",
  "Full-Time",
  "Part-Time",
  "Freelance / Gigs",
  "Internships",
  "Remote Jobs",
  "Local Jobs",
  "Government Jobs",
  "Skill-Based Work",
];

const SKILL_CHIPS = [
  { label: "Driver", icon: Car },
  { label: "Electrician", icon: Zap },
  { label: "Designer", icon: Palette },
  { label: "Teacher", icon: BookOpen },
  { label: "Daily Wage", icon: Briefcase },
  { label: "Carpenter", icon: Hammer },
  { label: "Cook", icon: ChefHat },
];

const GOVT_JOBS = [
  {
    id: 1,
    title: "JPSC Assistant Engineer",
    dept: "Jharkhand PSC",
    lastDate: "Apr 30, 2026",
    posts: "340 posts",
  },
  {
    id: 2,
    title: "Forest Guard Recruitment",
    dept: "State Forest Dept.",
    lastDate: "May 15, 2026",
    posts: "820 posts",
  },
  {
    id: 3,
    title: "NREGA Supervisor",
    dept: "Rural Development",
    lastDate: "Apr 20, 2026",
    posts: "150 posts",
  },
];

const NEARBY_DEFAULT = 2;
const MAIN_LIST_DEFAULT = 3;
const FEATURED_DEFAULT = 2;

// ─── Tag color helper ─────────────────────────────────────────────────────────
function tagStyle(tag: string): string {
  if (tag === "Urgent") return "bg-red-100 text-red-700";
  if (tag === "Remote") return "bg-blue-100 text-blue-700";
  if (tag === "Verified" || tag === "Government")
    return "bg-green-100 text-green-700";
  return "bg-orange-100 text-orange-700";
}

// ─── Job Detail Overlay ───────────────────────────────────────────────────────
function JobDetailOverlay({
  job,
  onClose,
  onSave,
  saved,
}: {
  job: Job;
  onClose: () => void;
  onSave: (id: number) => void;
  saved: boolean;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="job-detail"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed inset-0 z-[200] bg-background flex flex-col overflow-hidden"
        data-ocid="jobs.detail.modal"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b border-border"
          style={{ background: "oklch(0.52 0.135 38)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="text-white p-1"
            data-ocid="jobs.detail.close_button"
          >
            <X size={22} />
          </button>
          <span className="text-white font-bold text-base flex-1 truncate">
            {job.title}
          </span>
          <button
            type="button"
            onClick={() => onSave(job.id)}
            className="text-white p-1"
            data-ocid="jobs.detail.toggle"
          >
            <Heart size={20} fill={saved ? "white" : "none"} />
          </button>
          <button
            type="button"
            className="text-white p-1"
            data-ocid="jobs.detail.secondary_button"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          {/* Company block */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: job.companyColor }}
            >
              {job.companyInitials}
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg leading-tight">
                {job.title}
              </h2>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-muted-foreground text-sm">
                  {job.company}
                </span>
                {job.verified && (
                  <CheckCircle2 size={14} className="text-green-600" />
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <IndianRupee size={12} /> {job.salary}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: "oklch(0.52 0.12 150)" }}
                >
                  {job.jobType}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${tagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* About */}
          <section>
            <h3 className="font-bold text-foreground mb-2">About the Role</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.description} This is a community-focused role that requires
              dedication and a passion for tribal welfare. You will work closely
              with local communities to make a positive impact.
            </p>
          </section>

          {/* Responsibilities */}
          <section>
            <h3 className="font-bold text-foreground mb-2">Responsibilities</h3>
            <ul className="space-y-1">
              {job.responsibilities.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section>
            <h3 className="font-bold text-foreground mb-2">Requirements</h3>
            <ul className="space-y-1">
              {job.requirements.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "oklch(0.52 0.12 150)" }}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="font-bold text-foreground mb-2">
              Salary & Benefits
            </h3>
            <p className="text-sm text-muted-foreground">{job.benefits}</p>
          </section>

          {/* WhatsApp Quick Apply */}
          <button
            type="button"
            className="w-full py-3 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
            style={{ background: "#25D366" }}
            data-ocid="jobs.detail.primary_button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              role="img"
              aria-label="WhatsApp"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quick Apply via WhatsApp
          </button>
          <div className="h-24" />
          {/* spacer for sticky bar */}
        </div>

        {/* Sticky bottom bar */}
        <div className="border-t border-border px-4 py-3 flex gap-3 bg-card">
          <Button
            className="flex-1 rounded-2xl font-bold text-white"
            style={{ background: "oklch(0.52 0.135 38)" }}
            data-ocid="jobs.detail.submit_button"
          >
            Apply Now
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

// ─── Filter Drawer ─────────────────────────────────────────────────────────────
function FilterDrawer({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const qualifications = ["10th Pass", "12th Pass", "Graduate", "Skill-Based"];
  const industries = [
    "Construction",
    "IT",
    "Retail",
    "NGO",
    "Government",
    "Education",
    "Health",
  ];
  const sortOptions = [
    "Latest",
    "Most Relevant",
    "Highest Salary",
    "Nearby Jobs",
  ];
  const [activeSort, setActiveSort] = useState("Latest");

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/40"
            onClick={onClose}
          />
          <motion.div
            key="filter-drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-[160] bg-card rounded-t-3xl max-h-[85vh] overflow-y-auto"
            data-ocid="jobs.filter.sheet"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className="font-bold text-foreground text-lg">
                Filter & Sort
              </h3>
              <button
                type="button"
                onClick={onClose}
                data-ocid="jobs.filter.close_button"
              >
                <X size={22} className="text-muted-foreground" />
              </button>
            </div>

            <div className="px-5 pb-8 space-y-5">
              {/* Location */}
              <div>
                <Label className="font-semibold text-foreground mb-2 block">
                  📍 Location
                </Label>
                <Input placeholder="City or State" className="rounded-xl" />
              </div>

              {/* Qualification */}
              <div>
                <Label className="font-semibold text-foreground mb-2 block">
                  🎓 Qualification
                </Label>
                <div className="flex flex-wrap gap-2">
                  {qualifications.map((q) => (
                    <label
                      key={q}
                      htmlFor={`qual-${q}`}
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <Checkbox id={`qual-${q}`} />
                      <span className="text-sm">{q}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div>
                <Label className="font-semibold text-foreground mb-2 block">
                  🏢 Industry
                </Label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <span
                      key={ind}
                      className="px-3 py-1 rounded-full text-xs border border-border cursor-pointer hover:bg-accent transition-colors"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <Label className="font-semibold text-foreground mb-2 block">
                  Sort By
                </Label>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setActiveSort(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        activeSort === s
                          ? "text-white"
                          : "bg-muted text-foreground"
                      }`}
                      style={
                        activeSort === s
                          ? { background: "oklch(0.52 0.135 38)" }
                          : {}
                      }
                      data-ocid="jobs.filter.tab"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl"
                  data-ocid="jobs.filter.cancel_button"
                >
                  Reset
                </Button>
                <Button
                  className="flex-1 rounded-2xl text-white font-bold"
                  style={{ background: "oklch(0.52 0.135 38)" }}
                  onClick={onClose}
                  data-ocid="jobs.filter.submit_button"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Post a Job Overlay ───────────────────────────────────────────────────────
function PostJobOverlay({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="post-job"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="fixed inset-0 z-[200] bg-background flex flex-col"
          data-ocid="jobs.post.modal"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b border-border"
            style={{ background: "oklch(0.52 0.135 38)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="text-white"
              data-ocid="jobs.post.close_button"
            >
              <X size={22} />
            </button>
            <span className="text-white font-bold text-base">Post a Job</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-4"
                data-ocid="jobs.post.success_state"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.52 0.12 150)" }}
                >
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <p className="font-bold text-foreground text-lg">Job Posted!</p>
                <p className="text-sm text-muted-foreground text-center">
                  Your job listing is under review and will be live shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Job Title *</Label>
                  <Input
                    className="mt-1 rounded-xl"
                    placeholder="e.g. Community Health Worker"
                    required
                    data-ocid="jobs.post.input"
                  />
                </div>
                <div>
                  <Label>Salary / Wage</Label>
                  <Input
                    className="mt-1 rounded-xl"
                    placeholder="e.g. ₹15,000/mo or ₹500/day"
                  />
                </div>
                <div>
                  <Label>Location *</Label>
                  <Input
                    className="mt-1 rounded-xl"
                    placeholder="City, State"
                    required
                  />
                </div>
                <div>
                  <Label>Job Description *</Label>
                  <Textarea
                    className="mt-1 rounded-xl min-h-[100px]"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    required
                    data-ocid="jobs.post.textarea"
                  />
                </div>
                <div>
                  <Label>Contact (WhatsApp / Phone) *</Label>
                  <Input
                    className="mt-1 rounded-xl"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-2xl font-bold text-white mt-4"
                  style={{ background: "oklch(0.52 0.135 38)" }}
                  data-ocid="jobs.post.submit_button"
                >
                  Submit Job Listing
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function CompactJobCard({
  job,
  index,
  saved,
  onSave,
  onOpen,
}: {
  job: Job;
  index: number;
  saved: boolean;
  onSave: (id: number) => void;
  onOpen: (job: Job) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-44 bg-card rounded-xl p-3 cursor-pointer relative flex flex-col"
      style={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        border: "1px solid oklch(0.89 0.032 68)",
        minHeight: "160px",
      }}
      onClick={() => onOpen(job)}
      data-ocid={`jobs.item.${index + 1}`}
    >
      {/* Save icon */}
      <button
        type="button"
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          onSave(job.id);
        }}
        data-ocid={`jobs.toggle.${index + 1}`}
      >
        <Heart
          size={13}
          className={
            saved ? "fill-red-500 text-red-500" : "text-muted-foreground"
          }
        />
      </button>

      {/* Logo + title */}
      <div className="flex items-start gap-2 mb-2 pr-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ background: "oklch(0.52 0.135 38)" }}
        >
          {job.company.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold leading-tight line-clamp-2 text-foreground">
            {job.title}
          </p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">
            {job.company}
          </p>
        </div>
      </div>

      {/* Location + salary */}
      <div className="flex flex-col gap-0.5 mb-2">
        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
          <MapPin size={9} className="flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </span>
        {job.salary && (
          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <IndianRupee size={9} className="flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </span>
        )}
      </div>

      {/* Job type badge */}
      <span
        className="text-[9px] font-semibold px-2 py-0.5 rounded-full self-start mb-2"
        style={{
          background: "oklch(0.92 0.08 145)",
          color: "oklch(0.35 0.12 145)",
        }}
      >
        {job.jobType}
      </span>

      {/* Apply button */}
      <button
        type="button"
        className="mt-auto w-full py-1.5 rounded-lg text-[10px] font-bold text-white"
        style={{ background: "oklch(0.52 0.135 38)" }}
        onClick={(e) => {
          e.stopPropagation();
          onOpen(job);
        }}
        data-ocid={`jobs.primary_button.${index + 1}`}
      >
        Apply Now
      </button>
    </motion.div>
  );
}

function _JobCard({
  job,
  index,
  saved,
  onSave,
  onOpen,
}: {
  job: Job;
  index: number;
  saved: boolean;
  onSave: (id: number) => void;
  onOpen: (job: Job) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-card rounded-2xl p-4 cursor-pointer relative"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        border: "1px solid oklch(0.89 0.032 68)",
      }}
      onClick={() => onOpen(job)}
      data-ocid={`jobs.item.${index + 1}`}
    >
      {/* Report icon */}
      <button
        type="button"
        className="absolute top-3 right-3 text-muted-foreground"
        onClick={(e) => e.stopPropagation()}
        data-ocid={`jobs.delete_button.${index + 1}`}
      >
        <Flag size={13} />
      </button>

      {/* Top row */}
      <div className="flex items-start gap-3 pr-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ background: job.companyColor }}
        >
          {job.companyInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-sm leading-tight">
            {job.title}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs text-muted-foreground truncate">
              {job.company}
            </span>
            {job.verified && (
              <CheckCircle2
                size={12}
                className="text-green-600 flex-shrink-0"
              />
            )}
          </div>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={11} /> {job.location}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <IndianRupee size={11} /> {job.salary}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
          style={{ background: "oklch(0.48 0.12 150)" }}
        >
          <Clock size={9} className="inline mr-1" />
          {job.jobType}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
        {job.description}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-3 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${tagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave(job.id);
            }}
            className="p-1"
            data-ocid={`jobs.toggle.${index + 1}`}
          >
            <Heart
              size={16}
              fill={saved ? "#e53e3e" : "none"}
              stroke={saved ? "#e53e3e" : "currentColor"}
              className="text-muted-foreground"
            />
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white flex-shrink-0"
            style={{ background: "oklch(0.52 0.135 38)" }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(job);
            }}
            data-ocid={`jobs.primary_button.${index + 1}`}
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function JobFeedSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredExpanded, setFeaturedExpanded] = useState(false);
  const [nearbyExpanded, setNearbyExpanded] = useState(false);
  const [mainListExpanded, setMainListExpanded] = useState(false);

  function toggleSave(id: number) {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id],
    );
  }

  const filteredJobs = JOBS.filter((job) => {
    const matchCategory =
      activeCategory === "All" || job.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredJobs = JOBS.filter((j) => j.featured);
  const nearbyJobs = JOBS.slice(0, 5);

  const visibleFeatured = featuredExpanded
    ? featuredJobs
    : featuredJobs.slice(0, FEATURED_DEFAULT);
  const extraFeatured = featuredJobs.slice(FEATURED_DEFAULT);

  const visibleNearby = nearbyExpanded
    ? nearbyJobs
    : nearbyJobs.slice(0, NEARBY_DEFAULT);
  const extraNearby = nearbyJobs.slice(NEARBY_DEFAULT);

  return (
    <FeedSection title="Jobs" icon={Briefcase}>
      <div className="relative">
        {/* Section Header */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-foreground text-lg">Jobs</h2>
              <p className="text-xs text-muted-foreground">
                Opportunities for Our Community
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-full bg-accent"
                onClick={() => setSearchOpen((v) => !v)}
                data-ocid="jobs.search_input"
              >
                <Search size={17} className="text-foreground" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full bg-accent"
                onClick={() => setFilterOpen(true)}
                data-ocid="jobs.filter.open_modal_button"
              >
                <SlidersHorizontal size={17} className="text-foreground" />
              </button>
            </div>
          </div>

          {/* Inline search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3"
              >
                <Input
                  autoFocus
                  placeholder="Search jobs, skills, companies…"
                  className="rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-ocid="jobs.search_input"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subcategory Pills */}
        <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide pb-2">
          {SUBCATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "text-white"
                  : "bg-muted text-foreground"
              }`}
              style={
                activeCategory === cat
                  ? { background: "oklch(0.52 0.135 38)" }
                  : {}
              }
              data-ocid="jobs.tab"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Jobs Row */}
        {activeCategory === "All" && (
          <div className="mt-4">
            <div className="px-4 flex items-center justify-between mb-2">
              <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                <Award size={15} className="text-yellow-600" /> Featured Jobs
              </span>
              {featuredJobs.length > FEATURED_DEFAULT && (
                <button
                  type="button"
                  className="flex items-center gap-0.5 text-xs font-semibold"
                  style={{ color: "oklch(0.52 0.135 38)" }}
                  onClick={() => setFeaturedExpanded((v) => !v)}
                  data-ocid="jobs.featured.toggle"
                >
                  {featuredExpanded ? (
                    <>
                      Show Less <ChevronUp size={13} />
                    </>
                  ) : (
                    <>
                      See All ({featuredJobs.length}) <ChevronDown size={13} />
                    </>
                  )}
                </button>
              )}
            </div>
            {/* Always-visible first 2 */}
            <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
              {visibleFeatured.slice(0, FEATURED_DEFAULT).map((job) => (
                <motion.div
                  key={job.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedJob(job)}
                  className="flex-shrink-0 w-56 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${job.companyColor}dd, ${job.companyColor}88)`,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  }}
                  data-ocid={`jobs.card.${job.id}`}
                >
                  <div className="p-4">
                    <Badge className="bg-white/20 text-white border-0 text-xs mb-3">
                      {job.tags.includes("Urgent")
                        ? "🔥 Urgent"
                        : "⭐ Featured"}
                    </Badge>
                    <p className="font-bold text-white text-sm leading-tight">
                      {job.title}
                    </p>
                    <p className="text-white/80 text-xs mt-1">{job.company}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <MapPin size={11} className="text-white/70" />
                      <span className="text-white/70 text-xs">
                        {job.location}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-white font-bold text-xs">
                        {job.salary}
                      </span>
                      <span className="text-white/70 text-xs">
                        {job.jobType}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Expanded extra cards */}
            <AnimatePresence>
              {featuredExpanded && extraFeatured.length > 0 && (
                <motion.div
                  key="featured-extra"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2 pt-1">
                    {extraFeatured.map((job) => (
                      <motion.div
                        key={job.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedJob(job)}
                        className="flex-shrink-0 w-56 rounded-2xl overflow-hidden cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${job.companyColor}dd, ${job.companyColor}88)`,
                          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                        }}
                        data-ocid={`jobs.card.${job.id}`}
                      >
                        <div className="p-4">
                          <Badge className="bg-white/20 text-white border-0 text-xs mb-3">
                            {job.tags.includes("Urgent")
                              ? "🔥 Urgent"
                              : "⭐ Featured"}
                          </Badge>
                          <p className="font-bold text-white text-sm leading-tight">
                            {job.title}
                          </p>
                          <p className="text-white/80 text-xs mt-1">
                            {job.company}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <MapPin size={11} className="text-white/70" />
                            <span className="text-white/70 text-xs">
                              {job.location}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-white font-bold text-xs">
                              {job.salary}
                            </span>
                            <span className="text-white/70 text-xs">
                              {job.jobType}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Main Job List */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3 px-4">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Briefcase size={15} style={{ color: "oklch(0.52 0.135 38)" }} />
              All Jobs
            </h3>
            {filteredJobs.length > MAIN_LIST_DEFAULT && (
              <button
                type="button"
                onClick={() => setMainListExpanded((v) => !v)}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  color: "oklch(0.52 0.135 38)",
                  background: "oklch(0.95 0.032 68)",
                }}
                data-ocid="jobs.main_list.toggle"
              >
                {mainListExpanded ? (
                  <>
                    Show Less <ChevronUp size={13} />
                  </>
                ) : (
                  <>
                    See All ({filteredJobs.length - MAIN_LIST_DEFAULT}){" "}
                    <ChevronDown size={13} />
                  </>
                )}
              </button>
            )}
          </div>
          {filteredJobs.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 text-muted-foreground px-4"
              data-ocid="jobs.empty_state"
            >
              <Briefcase size={36} className="mb-3 opacity-40" />
              <p className="text-sm font-medium">No jobs found</p>
              <p className="text-xs mt-1">
                Try a different category or search term
              </p>
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 px-4">
              {(mainListExpanded
                ? filteredJobs
                : filteredJobs.slice(0, MAIN_LIST_DEFAULT)
              ).map((job, idx) => (
                <CompactJobCard
                  key={job.id}
                  job={job}
                  index={idx}
                  saved={savedJobs.includes(job.id)}
                  onSave={toggleSave}
                  onOpen={setSelectedJob}
                />
              ))}
            </div>
          )}
        </div>

        {/* Skill-Based Jobs */}
        {activeCategory === "All" && (
          <div className="mt-6">
            <div className="px-4 mb-3">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Wrench size={15} style={{ color: "oklch(0.52 0.135 38)" }} />
                Skill-Based Opportunities
              </h3>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
              {SKILL_CHIPS.map(({ label, icon: Icon }) => (
                <button
                  type="button"
                  key={label}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-card cursor-pointer"
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                    border: "1px solid oklch(0.89 0.032 68)",
                  }}
                  data-ocid="jobs.tab"
                >
                  <Icon size={20} style={{ color: "oklch(0.52 0.135 38)" }} />
                  <span className="text-xs font-semibold text-foreground">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Government Jobs */}
        {(activeCategory === "All" || activeCategory === "Government Jobs") && (
          <div className="mt-6">
            <div className="px-4 mb-3 flex items-center gap-2">
              <Building2 size={15} style={{ color: "oklch(0.52 0.135 38)" }} />
              <h3 className="font-bold text-foreground text-sm">
                Government Jobs
              </h3>
              <Badge className="text-xs bg-amber-100 text-amber-700 border-0">
                Official
              </Badge>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
              {GOVT_JOBS.map((g, i) => (
                <div
                  key={g.id}
                  className="flex-shrink-0 w-56 bg-card rounded-2xl p-4"
                  style={{
                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                    border: "1px solid oklch(0.89 0.032 68)",
                  }}
                  data-ocid={`jobs.govt.item.${i + 1}`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Building2
                      size={16}
                      style={{ color: "oklch(0.52 0.135 38)" }}
                    />
                    <div>
                      <p className="font-bold text-foreground text-xs leading-tight">
                        {g.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {g.dept}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                    <span>📅 {g.lastDate}</span>
                    <span className="text-green-600 font-semibold">
                      {g.posts}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-3 w-full py-1.5 rounded-xl text-xs font-bold text-white"
                    style={{ background: "oklch(0.52 0.135 38)" }}
                    data-ocid="jobs.secondary_button"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Jobs */}
        {activeCategory === "All" && (
          <div className="mt-6 px-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={15} style={{ color: "oklch(0.52 0.135 38)" }} />
              <h3 className="font-bold text-foreground text-sm">Nearby Jobs</h3>
            </div>
            {/* Always-visible first 2 */}
            <div className="space-y-3">
              {visibleNearby.slice(0, NEARBY_DEFAULT).map((job, i) => (
                <button
                  type="button"
                  key={`nearby-${job.id}`}
                  className="flex items-center gap-3 bg-card rounded-xl p-3 cursor-pointer w-full text-left"
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    border: "1px solid oklch(0.89 0.032 68)",
                  }}
                  onClick={() => setSelectedJob(job)}
                  data-ocid={`jobs.nearby.item.${i + 1}`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ background: job.companyColor }}
                  >
                    {job.companyInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-xs truncate">
                      {job.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {job.location} · {job.salary}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-muted-foreground flex-shrink-0"
                  />
                </button>
              ))}
            </div>
            {/* Expanded extra nearby */}
            <AnimatePresence>
              {nearbyExpanded && extraNearby.length > 0 && (
                <motion.div
                  key="nearby-extra"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="space-y-3 pt-3">
                    {extraNearby.map((job, i) => (
                      <button
                        type="button"
                        key={`nearby-extra-${job.id}`}
                        className="flex items-center gap-3 bg-card rounded-xl p-3 cursor-pointer w-full text-left"
                        style={{
                          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                          border: "1px solid oklch(0.89 0.032 68)",
                        }}
                        onClick={() => setSelectedJob(job)}
                        data-ocid={`jobs.nearby.item.${NEARBY_DEFAULT + i + 1}`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                          style={{ background: job.companyColor }}
                        >
                          {job.companyInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-xs truncate">
                            {job.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {job.location} · {job.salary}
                          </p>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-muted-foreground flex-shrink-0"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* See All / Show Less toggle */}
            {extraNearby.length > 0 && (
              <button
                type="button"
                onClick={() => setNearbyExpanded((v) => !v)}
                className="mt-3 w-full flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold"
                style={{
                  color: "oklch(0.52 0.135 38)",
                  border: "1px dashed oklch(0.70 0.08 38)",
                }}
                data-ocid="jobs.nearby.toggle"
              >
                {nearbyExpanded ? (
                  <>
                    Show Less <ChevronUp size={13} />
                  </>
                ) : (
                  <>
                    See All ({nearbyJobs.length}) <ChevronDown size={13} />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Floating Post a Job button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPostJobOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-white font-bold text-sm shadow-lg"
          style={{
            background: "oklch(0.52 0.135 38)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          }}
          data-ocid="jobs.upload_button"
        >
          <Plus size={16} /> Post a Job
        </motion.button>
      </div>

      {/* Overlays */}
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
      <PostJobOverlay
        open={postJobOpen}
        onClose={() => setPostJobOpen(false)}
      />
      {selectedJob && (
        <JobDetailOverlay
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={toggleSave}
          saved={savedJobs.includes(selectedJob.id)}
        />
      )}
    </FeedSection>
  );
}
