import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";

type FormType = "latest-feed" | "cultural-content" | "jobs" | "business";

interface PostFormModalProps {
  formType: FormType | null;
  onClose: () => void;
}

const TITLES: Record<FormType, string> = {
  "latest-feed": "Share to Latest Feed",
  "cultural-content": "Add Cultural Content",
  jobs: "Post a Job",
  business: "Add My Business",
};

export default function PostFormModal({
  formType,
  onClose,
}: PostFormModalProps) {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string, val: string) =>
    setFields((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFields({});
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setFields({});
    setSubmitted(false);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {formType && (
        <motion.div
          key="post-sheet"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          data-ocid="post_form.modal"
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px 12px",
              borderBottom: "1px solid oklch(0.93 0.02 60)",
              flexShrink: 0,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>
              {TITLES[formType]}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              data-ocid="post_form.close_button"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: "oklch(0.95 0.02 60)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} style={{ color: "oklch(0.45 0.05 50)" }} />
            </button>
          </div>

          {/* Form body */}
          <div style={{ flex: 1, padding: "20px" }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 0",
                    gap: 16,
                  }}
                  data-ocid="post_form.success_state"
                >
                  <CheckCircle2
                    size={56}
                    style={{ color: "oklch(0.52 0.135 38)" }}
                  />
                  <p style={{ fontSize: 16, fontWeight: 600 }}>
                    Posted successfully!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {formType === "latest-feed" && (
                    <>
                      <div className="space-y-1.5">
                        <Label htmlFor="lf-title">Title</Label>
                        <Input
                          id="lf-title"
                          placeholder="What's the story?"
                          value={fields.title || ""}
                          onChange={(e) => set("title", e.target.value)}
                          data-ocid="post_form.input"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lf-caption">Caption</Label>
                        <Textarea
                          id="lf-caption"
                          placeholder="Share more details…"
                          value={fields.caption || ""}
                          onChange={(e) => set("caption", e.target.value)}
                          data-ocid="post_form.textarea"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Media Type</Label>
                        <Select
                          value={fields.media || ""}
                          onValueChange={(v) => set("media", v)}
                        >
                          <SelectTrigger data-ocid="post_form.select">
                            <SelectValue placeholder="Select media type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="images">Images</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  {formType === "cultural-content" && (
                    <>
                      <div className="space-y-1.5">
                        <Label htmlFor="cc-name">Event Name</Label>
                        <Input
                          id="cc-name"
                          placeholder="Name of the cultural event"
                          value={fields.name || ""}
                          onChange={(e) => set("name", e.target.value)}
                          data-ocid="post_form.input"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cc-desc">Description</Label>
                        <Textarea
                          id="cc-desc"
                          placeholder="Describe the event…"
                          value={fields.description || ""}
                          onChange={(e) => set("description", e.target.value)}
                          data-ocid="post_form.textarea"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cc-date">Date</Label>
                        <Input
                          id="cc-date"
                          type="date"
                          value={fields.date || ""}
                          onChange={(e) => set("date", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cc-location">Location</Label>
                        <Input
                          id="cc-location"
                          placeholder="Village, district or city"
                          value={fields.location || ""}
                          onChange={(e) => set("location", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {formType === "jobs" && (
                    <>
                      <div className="space-y-1.5">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input
                          id="job-title"
                          placeholder="e.g. Community Coordinator"
                          value={fields.jobTitle || ""}
                          onChange={(e) => set("jobTitle", e.target.value)}
                          data-ocid="post_form.input"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="job-company">Company</Label>
                        <Input
                          id="job-company"
                          placeholder="Organisation or department"
                          value={fields.company || ""}
                          onChange={(e) => set("company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="job-location">Location</Label>
                        <Input
                          id="job-location"
                          placeholder="Where is this role based?"
                          value={fields.location || ""}
                          onChange={(e) => set("location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="job-desc">Description</Label>
                        <Textarea
                          id="job-desc"
                          placeholder="Responsibilities, requirements…"
                          value={fields.description || ""}
                          onChange={(e) => set("description", e.target.value)}
                          data-ocid="post_form.textarea"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Job Type</Label>
                        <Select
                          value={fields.jobType || ""}
                          onValueChange={(v) => set("jobType", v)}
                        >
                          <SelectTrigger data-ocid="post_form.select">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  {formType === "business" && (
                    <>
                      <div className="space-y-1.5">
                        <Label htmlFor="biz-name">Business Name</Label>
                        <Input
                          id="biz-name"
                          placeholder="Your business name"
                          value={fields.bizName || ""}
                          onChange={(e) => set("bizName", e.target.value)}
                          data-ocid="post_form.input"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="biz-tagline">Tagline</Label>
                        <Input
                          id="biz-tagline"
                          placeholder="One-line pitch"
                          value={fields.tagline || ""}
                          onChange={(e) => set("tagline", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Category</Label>
                        <Select
                          value={fields.category || ""}
                          onValueChange={(v) => set("category", v)}
                        >
                          <SelectTrigger data-ocid="post_form.select">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="handicrafts">
                              Handicrafts
                            </SelectItem>
                            <SelectItem value="food">
                              Food &amp; Beverage
                            </SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="agriculture">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="biz-desc">Description</Label>
                        <Textarea
                          id="biz-desc"
                          placeholder="Tell the community about your business…"
                          value={fields.description || ""}
                          onChange={(e) => set("description", e.target.value)}
                          data-ocid="post_form.textarea"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="biz-contact">Contact</Label>
                        <Input
                          id="biz-contact"
                          placeholder="Phone or email"
                          value={fields.contact || ""}
                          onChange={(e) => set("contact", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      paddingTop: 16,
                      paddingBottom: 32,
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleClose}
                      data-ocid="post_form.cancel_button"
                      style={{
                        flex: 1,
                        padding: "14px 0",
                        borderRadius: 14,
                        fontSize: 15,
                        fontWeight: 600,
                        border: "1.5px solid oklch(0.85 0.03 50)",
                        color: "oklch(0.45 0.05 50)",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      data-ocid="post_form.submit_button"
                      style={{
                        flex: 1,
                        padding: "14px 0",
                        borderRadius: 14,
                        fontSize: 15,
                        fontWeight: 600,
                        background: "oklch(0.52 0.135 38)",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Post
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
