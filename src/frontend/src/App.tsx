import { motion } from "motion/react";
import { useState } from "react";
import BottomNav from "./components/BottomNav";
import CategoryGrid from "./components/CategoryGrid";
import CulturalFeedSection from "./components/CulturalFeedSection";
import EdTechSection from "./components/EdTechSection";
import Header from "./components/Header";
import JobFeedSection from "./components/JobFeedSection";
import LatestFeed from "./components/LatestFeed";
import ProfileDrawer from "./components/ProfileDrawer";
import TribalSangiSection from "./components/TribalSangiSection";
import TribalTalesSection from "./components/TribalTalesSection";
import TribalpreneurSection from "./components/TribalpreneurSection";

const MOCK_USER = {
  name: "Saurav",
  avatar: "https://picsum.photos/seed/saurav/100/100",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-background flex justify-center"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Mobile container */}
      <div className="relative w-full max-w-[390px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <Header
          onProfileClick={() => setDrawerOpen(true)}
          userName={MOCK_USER.name}
          userAvatar={MOCK_USER.avatar}
        />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto pb-24">
          {/* Category Grid */}
          <CategoryGrid />

          {/* Divider */}
          <div className="mx-4 h-px bg-border mb-5" />

          {/* Feed sections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <LatestFeed />
            <TribalTalesSection />
            <TribalpreneurSection />
            <CulturalFeedSection />
            <EdTechSection />
            <JobFeedSection />
            <TribalSangiSection />
          </motion.div>

          {/* Footer */}
          <footer className="px-4 py-6 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()}. Built with{" "}
              <span style={{ color: "oklch(0.52 0.135 38)" }}>♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.52 0.135 38)" }}
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </main>

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Profile drawer */}
        <ProfileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          userName={MOCK_USER.name}
          userAvatar={MOCK_USER.avatar}
        />
      </div>
    </div>
  );
}
