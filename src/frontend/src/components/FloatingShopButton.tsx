import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

interface FloatingShopButtonProps {
  visible: boolean;
  onOpen: () => void;
}

export default function FloatingShopButton({
  visible,
  onOpen,
}: FloatingShopButtonProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed z-30"
      style={{ bottom: "88px", right: "16px" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-1"
      >
        <button
          type="button"
          onClick={onOpen}
          data-ocid="shop.open_modal_button"
          aria-label="Open Adinivaas Shop"
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.135 38), oklch(0.42 0.12 30))",
            boxShadow:
              "0 4px 20px oklch(0.52 0.135 38 / 0.5), 0 0 0 4px oklch(0.52 0.135 38 / 0.12)",
          }}
        >
          <ShoppingBag size={24} color="white" strokeWidth={2} />
        </button>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.52 0.135 38)",
            color: "white",
            fontSize: "10px",
          }}
        >
          Shop
        </span>
      </motion.div>
    </motion.div>
  );
}
