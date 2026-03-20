import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar?: string;
  onSave: (data: {
    name: string;
    bio: string;
    location: string;
    interests: string;
    avatarUrl: string;
  }) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  userName,
  userAvatar,
  onSave,
}: ProfileEditModalProps) {
  const [name, setName] = useState(userName);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(userAvatar || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(userName);
      setAvatarUrl(userAvatar || "");
    }
  }, [isOpen, userName, userAvatar]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, bio, location, interests, avatarUrl });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setSaved(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="edit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          <motion.div
            key="edit-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white z-50 rounded-t-3xl"
            style={{
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
            }}
            data-ocid="profile_edit.modal"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: "oklch(0.85 0.02 50)" }}
              />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid oklch(0.93 0.02 60)" }}
            >
              <h2 className="text-base font-bold text-foreground">
                Edit Profile
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                data-ocid="profile_edit.close_button"
              >
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-5 py-4">
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-10 gap-3"
                    data-ocid="profile_edit.success_state"
                  >
                    <CheckCircle2
                      size={48}
                      style={{ color: "oklch(0.52 0.135 38)" }}
                    />
                    <p className="text-base font-semibold text-foreground">
                      Profile updated!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="edit-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSave}
                    className="space-y-4"
                  >
                    {/* Avatar preview */}
                    {avatarUrl && (
                      <div className="flex justify-center">
                        <img
                          src={avatarUrl}
                          alt="Profile preview"
                          className="w-20 h-20 rounded-full object-cover"
                          style={{ border: "3px solid oklch(0.92 0.06 40)" }}
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="pe-avatar">Profile Picture URL</Label>
                      <Input
                        id="pe-avatar"
                        placeholder="https://..."
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        data-ocid="profile_edit.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pe-name">Name</Label>
                      <Input
                        id="pe-name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pe-bio">Bio</Label>
                      <Textarea
                        id="pe-bio"
                        placeholder="Tell your community about yourself…"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        data-ocid="profile_edit.textarea"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pe-location">Location</Label>
                      <Input
                        id="pe-location"
                        placeholder="Your village, district or city"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pe-interests">Interests</Label>
                      <Input
                        id="pe-interests"
                        placeholder="e.g. Tribal art, Folk music, Agriculture"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3 pt-2 pb-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-colors hover:bg-accent"
                        style={{
                          border: "1.5px solid oklch(0.85 0.03 50)",
                          color: "oklch(0.45 0.05 50)",
                        }}
                        data-ocid="profile_edit.cancel_button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
                        style={{ background: "oklch(0.52 0.135 38)" }}
                        data-ocid="profile_edit.save_button"
                      >
                        Save
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
