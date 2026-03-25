import { motion } from "motion/react";
import { useRef, useState } from "react";
import BottomNav from "./components/BottomNav";
import CategoryGrid from "./components/CategoryGrid";
import ChatPage from "./components/ChatPage";
import CulturalFeedSection from "./components/CulturalFeedSection";
import EBookSection from "./components/EBookSection";
import EdTechSection from "./components/EdTechSection";
import FestivalAdBanners from "./components/FestivalAdBanners";
import FloatingShopButton from "./components/FloatingShopButton";
import Header from "./components/Header";
import JobFeedSection from "./components/JobFeedSection";
import LatestFeed from "./components/LatestFeed";
import MerchandiseShopPage from "./components/MerchandiseShopPage";
import PostFormModal from "./components/PostFormModal";
import ProfileDrawer from "./components/ProfileDrawer";
import ProfileEditModal from "./components/ProfileEditModal";
import SangiDatingPage from "./components/SangiDatingPage";
import SearchPage from "./components/SearchPage";
import TribalSangiSection from "./components/TribalSangiSection";
import TribalTalesSection from "./components/TribalTalesSection";
import TribalpreneurSection from "./components/TribalpreneurSection";

type AddFormType = "latest-feed" | "cultural-content" | "jobs" | "business";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<AddFormType | null>(null);
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [mockUser, setMockUser] = useState({
    name: "Saurav",
    avatar: "https://picsum.photos/seed/saurav/100/100",
  });
  const [newMatchContact, setNewMatchContact] = useState<{
    name: string;
    avatar: string;
  } | null>(null);
  const mainScrollRef = useRef<HTMLElement>(null);

  const handleCategoryClick = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleStartChat = (name: string, avatar: string) => {
    setNewMatchContact({ name, avatar });
    setActiveTab("chat");
  };

  const handleHomeClick = () => {
    setActiveTab("home");
    setTimeout(() => {
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div
      className="min-h-screen bg-background flex justify-center"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Mobile container */}
      <div className="relative w-full max-w-[390px] min-h-screen bg-background flex flex-col">
        {/* Header always visible */}
        <Header
          onProfileClick={() => setDrawerOpen(true)}
          onHomeClick={handleHomeClick}
          userName={mockUser.name}
          userAvatar={mockUser.avatar}
        />

        {/* Page content */}
        {activeTab === "chat" ? (
          <div className="flex-1 flex flex-col overflow-hidden pb-24">
            <ChatPage
              newMatchContact={newMatchContact}
              onNewMatchHandled={() => setNewMatchContact(null)}
            />
          </div>
        ) : activeTab === "search" ? (
          <div className="flex-1 overflow-y-auto pb-24">
            <SearchPage />
          </div>
        ) : activeTab === "sangi" ? (
          <div className="flex-1 flex flex-col overflow-hidden pb-24">
            <SangiDatingPage onStartChat={handleStartChat} />
          </div>
        ) : activeTab === "shop" ? (
          <div className="flex-1 flex flex-col overflow-hidden pb-16">
            <MerchandiseShopPage onBack={() => setActiveTab("home")} />
          </div>
        ) : (
          <main ref={mainScrollRef} className="flex-1 overflow-y-auto pb-24">
            {/* Category Grid */}
            <CategoryGrid onCategoryClick={handleCategoryClick} />

            {/* Divider */}
            <div className="mx-4 h-px bg-border mb-4" />

            {/* Ad Banners — before latest feed */}
            <FestivalAdBanners />

            {/* Feed sections */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div id="section-latest">
                <LatestFeed />
              </div>
              <div id="section-tribal-tales">
                <TribalTalesSection />
              </div>
              <div id="section-tribalpreneurs">
                <TribalpreneurSection />
              </div>
              <div id="section-cultural">
                <CulturalFeedSection />
              </div>
              <div id="section-jobs">
                <JobFeedSection />
              </div>
              <div id="section-ebook">
                <EBookSection />
              </div>
              <div id="section-tribal-sangi">
                <TribalSangiSection onOpenSangi={() => setActiveTab("sangi")} />
              </div>
              <EdTechSection />
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
        )}

        {/* Floating Shop Button - visible on home tab only */}
        <FloatingShopButton
          visible={activeTab === "home"}
          onOpen={() => setActiveTab("shop")}
        />

        {/* Bottom navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddOption={(type) => setActiveForm(type)}
        />

        {/* Profile drawer */}
        <ProfileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          userName={mockUser.name}
          userAvatar={mockUser.avatar}
          onEditProfile={() => setProfileEditOpen(true)}
        />

        {/* Post form modal */}
        <PostFormModal
          formType={activeForm}
          onClose={() => setActiveForm(null)}
        />

        {/* Profile edit modal */}
        <ProfileEditModal
          isOpen={profileEditOpen}
          onClose={() => setProfileEditOpen(false)}
          userName={mockUser.name}
          userAvatar={mockUser.avatar}
          onSave={(data) => {
            setMockUser({
              name: data.name,
              avatar: data.avatarUrl || mockUser.avatar,
            });
          }}
        />
      </div>
    </div>
  );
}
