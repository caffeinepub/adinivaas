import { Image, Users } from "lucide-react";
import { motion } from "motion/react";
import FeedSection from "./FeedSection";

const mockJobs = [
  {
    id: 1,
    image: "https://picsum.photos/seed/job1/280/180",
    title: "Community Outreach Officer",
    company: "Tribal Welfare Board",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/job2/280/180",
    title: "Forest Ranger – Jharkhand",
    company: "State Forest Dept.",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/job3/280/180",
    title: "Cultural Program Coordinator",
    company: "Adivasi Academy",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/job4/280/180",
    title: "Handicraft Export Manager",
    company: "Vana Exports Ltd.",
  },
];

export default function JobFeedSection() {
  return (
    <FeedSection title="Job Feed" icon={Users}>
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {mockJobs.map((job, idx) => (
          <motion.div
            key={job.id}
            data-ocid={`jobs.item.${idx + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="flex-shrink-0 w-44 bg-card rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            style={{
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              border: "1px solid oklch(0.89 0.032 68)",
            }}
          >
            <div className="relative">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-28 object-cover"
              />
              <span
                className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-600 text-white"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Image size={10} /> Images
              </span>
            </div>
            <div className="px-3 py-3">
              <p
                className="text-xs font-700 text-foreground leading-tight mb-0.5"
                style={{ fontWeight: 700 }}
              >
                {job.title}
              </p>
              <p className="text-xs text-muted-foreground">{job.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </FeedSection>
  );
}
