import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Screen = "listing" | "checkout" | "confirmed";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hasSizes: boolean;
  description: string;
}

interface CartItem {
  product: Product;
  qty: number;
  size: string | null;
}

const PRODUCTS: Product[] = [
  {
    id: "tshirt1",
    name: "Custom T-Shirt (Tribal Print)",
    price: 699,
    image: "https://picsum.photos/seed/tshirt1/300/300",
    hasSizes: true,
    description:
      "Bold tribal motifs inspired by indigenous art. 100% cotton, breathable and vibrant.",
  },
  {
    id: "tshirt2",
    name: "Custom T-Shirt (Earth Tone)",
    price: 749,
    image: "https://picsum.photos/seed/tshirt2/300/300",
    hasSizes: true,
    description:
      "Earthy palette celebrating nature and roots. Soft premium fabric with tribal embroidery detail.",
  },
  {
    id: "tshirt3",
    name: "Custom T-Shirt (Heritage)",
    price: 799,
    image: "https://picsum.photos/seed/tshirt3/300/300",
    hasSizes: true,
    description:
      "Heritage-inspired design blending tradition with modern streetwear silhouettes.",
  },
  {
    id: "bag1",
    name: "Tribal Tote Bag",
    price: 449,
    image: "https://picsum.photos/seed/bag1/300/300",
    hasSizes: false,
    description:
      "Spacious canvas tote with hand-block-printed tribal patterns. Eco-friendly and durable.",
  },
  {
    id: "bag2",
    name: "Adinivaas Backpack",
    price: 1299,
    image: "https://picsum.photos/seed/bag2/300/300",
    hasSizes: false,
    description:
      "Rugged 20L backpack with tribal embroidery, padded straps, and laptop compartment.",
  },
  {
    id: "bag3",
    name: "Handcraft Sling Bag",
    price: 599,
    image: "https://picsum.photos/seed/bag3/300/300",
    hasSizes: false,
    description:
      "Artisan-crafted sling bag with woven tribal texture. Perfect for everyday carry.",
  },
];

const SIZES = ["S", "M", "L", "XL"];

function ProductCard({
  product,
  onTap,
  onAddToCart,
}: {
  product: Product;
  onTap: () => void;
  onAddToCart: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "oklch(0.98 0.01 60)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
      onClick={onTap}
      data-ocid={`shop.${product.id}.card`}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
          style={{ background: "oklch(0.52 0.135 38)" }}
        >
          ₹{product.price}
        </div>
      </div>
      <div className="p-3">
        <p
          className="text-xs font-semibold leading-tight mb-2"
          style={{ color: "oklch(0.28 0.07 38)" }}
        >
          {product.name}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          data-ocid={`shop.${product.id}.button`}
          className="w-full py-1.5 rounded-xl text-xs font-semibold text-white transition-opacity active:opacity-70"
          style={{ background: "oklch(0.52 0.135 38)" }}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

function ProductDetailSheet({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (size: string | null, qty: number) => void;
}) {
  const [size, setSize] = useState<string>("M");
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: "rgba(0,0,0,0.45)",
        maxWidth: "390px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="w-full rounded-t-3xl pb-6 overflow-hidden"
        style={{ background: "oklch(0.99 0.005 60)" }}
        onClick={(e) => e.stopPropagation()}
        data-ocid="shop.product.sheet"
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            data-ocid="shop.product.close_button"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <X size={16} color="white" />
          </button>
        </div>
        <div className="px-5 pt-4">
          <h3
            className="font-bold text-base mb-1"
            style={{ color: "oklch(0.28 0.07 38)" }}
          >
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xl font-bold"
              style={{ color: "oklch(0.52 0.135 38)" }}
            >
              ₹{product.price}
            </span>
          </div>

          {product.hasSizes && (
            <div className="mb-4">
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "oklch(0.4 0.05 38)" }}
              >
                Select Size
              </p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-ocid={`shop.size.${s.toLowerCase()}.button`}
                    onClick={() => setSize(s)}
                    className="w-10 h-10 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background:
                        size === s
                          ? "oklch(0.52 0.135 38)"
                          : "oklch(0.93 0.02 60)",
                      color: size === s ? "white" : "oklch(0.38 0.06 38)",
                      border:
                        size === s ? "none" : "1.5px solid oklch(0.85 0.03 60)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-5">
            <p
              className="text-xs font-semibold"
              style={{ color: "oklch(0.4 0.05 38)" }}
            >
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-ocid="shop.qty.minus.button"
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.93 0.02 60)" }}
              >
                <Minus size={14} style={{ color: "oklch(0.38 0.06 38)" }} />
              </button>
              <span
                className="text-base font-bold w-6 text-center"
                style={{ color: "oklch(0.28 0.07 38)" }}
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                data-ocid="shop.qty.plus.button"
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.52 0.135 38)" }}
              >
                <Plus size={14} color="white" />
              </button>
            </div>
          </div>

          <button
            type="button"
            data-ocid="shop.add_to_cart.primary_button"
            onClick={() => {
              onAddToCart(product.hasSizes ? size : null, qty);
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-opacity active:opacity-80"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.135 38), oklch(0.42 0.12 30))",
            }}
          >
            Add to Cart — ₹{product.price * qty}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CartDrawer({
  cart,
  onClose,
  onRemove,
  onCheckout,
}: {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string, size: string | null) => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      style={{
        background: "rgba(0,0,0,0.45)",
        maxWidth: "390px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="w-[320px] h-full flex flex-col"
        style={{ background: "oklch(0.99 0.005 60)" }}
        onClick={(e) => e.stopPropagation()}
        data-ocid="shop.cart.panel"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} style={{ color: "oklch(0.52 0.135 38)" }} />
            <h3
              className="font-bold text-base"
              style={{ color: "oklch(0.28 0.07 38)" }}
            >
              Your Cart
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="shop.cart.close_button"
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.93 0.02 60)" }}
          >
            <X size={16} style={{ color: "oklch(0.38 0.06 38)" }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3">
          {cart.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-3"
              data-ocid="shop.cart.empty_state"
            >
              <ShoppingBag size={48} style={{ color: "oklch(0.75 0.04 60)" }} />
              <p className="text-sm text-muted-foreground">
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3 items-center p-3 rounded-xl"
                  style={{ background: "oklch(0.96 0.01 60)" }}
                  data-ocid={`shop.cart.item.${idx + 1}`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-tight truncate"
                      style={{ color: "oklch(0.28 0.07 38)" }}
                    >
                      {item.product.name}
                    </p>
                    {item.size && (
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size}
                      </p>
                    )}
                    <p
                      className="text-xs font-bold"
                      style={{ color: "oklch(0.52 0.135 38)" }}
                    >
                      ₹{item.product.price} × {item.qty}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.product.id, item.size)}
                    data-ocid={`shop.cart.delete_button.${idx + 1}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.93 0.02 60)" }}
                  >
                    <Trash2 size={13} style={{ color: "oklch(0.5 0.12 20)" }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-border">
            <div className="flex justify-between mb-3">
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.38 0.06 38)" }}
              >
                Subtotal
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "oklch(0.28 0.07 38)" }}
              >
                ₹{total}
              </span>
            </div>
            <button
              type="button"
              data-ocid="shop.checkout.primary_button"
              onClick={onCheckout}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.135 38), oklch(0.42 0.12 30))",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CheckoutScreen({
  cart,
  onBack,
  onPlaceOrder,
}: {
  cart: CartItem[];
  onBack: () => void;
  onPlaceOrder: () => void;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState<"cod" | "upi">("cod");
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  const canOrder = name.trim() && address.trim() && phone.trim();

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      className="flex flex-col h-full"
      data-ocid="shop.checkout.panel"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-border"
        style={{ background: "oklch(0.98 0.01 60)" }}
      >
        <button
          type="button"
          onClick={onBack}
          data-ocid="shop.checkout.cancel_button"
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "oklch(0.93 0.02 60)" }}
        >
          <ArrowLeft size={18} style={{ color: "oklch(0.38 0.06 38)" }} />
        </button>
        <h2
          className="font-bold text-base"
          style={{ color: "oklch(0.28 0.07 38)" }}
        >
          Checkout
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Delivery Info */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "oklch(0.98 0.01 60)",
            border: "1px solid oklch(0.9 0.02 60)",
          }}
        >
          <h3
            className="text-sm font-bold mb-3"
            style={{ color: "oklch(0.28 0.07 38)" }}
          >
            Delivery Details
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <label
                htmlFor="checkout-name"
                className="text-xs font-semibold mb-1 block"
                style={{ color: "oklch(0.4 0.05 38)" }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="checkout-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-ocid="shop.name.input"
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: "oklch(0.95 0.01 60)",
                  border: "1.5px solid oklch(0.88 0.03 60)",
                  color: "oklch(0.28 0.07 38)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="checkout-address"
                className="text-xs font-semibold mb-1 block"
                style={{ color: "oklch(0.4 0.05 38)" }}
              >
                Delivery Address
              </label>
              <textarea
                id="checkout-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full address with pin code"
                rows={3}
                data-ocid="shop.address.textarea"
                className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: "oklch(0.95 0.01 60)",
                  border: "1.5px solid oklch(0.88 0.03 60)",
                  color: "oklch(0.28 0.07 38)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="checkout-phone"
                className="text-xs font-semibold mb-1 block"
                style={{ color: "oklch(0.4 0.05 38)" }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="checkout-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                data-ocid="shop.phone.input"
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: "oklch(0.95 0.01 60)",
                  border: "1.5px solid oklch(0.88 0.03 60)",
                  color: "oklch(0.28 0.07 38)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "oklch(0.98 0.01 60)",
            border: "1px solid oklch(0.9 0.02 60)",
          }}
        >
          <h3
            className="text-sm font-bold mb-3"
            style={{ color: "oklch(0.28 0.07 38)" }}
          >
            Payment Method
          </h3>
          <div className="flex flex-col gap-2">
            {(["cod", "upi"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPayment(method)}
                data-ocid={`shop.payment.${method}.radio`}
                className="flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                style={{
                  background:
                    payment === method
                      ? "oklch(0.52 0.135 38 / 0.1)"
                      : "oklch(0.94 0.01 60)",
                  border:
                    payment === method
                      ? "2px solid oklch(0.52 0.135 38)"
                      : "1.5px solid oklch(0.88 0.03 60)",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor:
                      payment === method
                        ? "oklch(0.52 0.135 38)"
                        : "oklch(0.7 0.04 60)",
                  }}
                >
                  {payment === method && (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "oklch(0.52 0.135 38)" }}
                    />
                  )}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.28 0.07 38)" }}
                >
                  {method === "cod" ? "💵 Cash on Delivery" : "📱 UPI Payment"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "oklch(0.98 0.01 60)",
            border: "1px solid oklch(0.9 0.02 60)",
          }}
        >
          <h3
            className="text-sm font-bold mb-3"
            style={{ color: "oklch(0.28 0.07 38)" }}
          >
            Order Summary
          </h3>
          <div className="flex flex-col gap-2 mb-3">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex justify-between text-xs"
              >
                <span className="text-muted-foreground truncate flex-1 mr-2">
                  {item.product.name} {item.size ? `(${item.size})` : ""} ×{" "}
                  {item.qty}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.28 0.07 38)" }}
                >
                  ₹{item.product.price * item.qty}
                </span>
              </div>
            ))}
          </div>
          <div
            className="flex justify-between pt-2"
            style={{ borderTop: "1px solid oklch(0.9 0.02 60)" }}
          >
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(0.28 0.07 38)" }}
            >
              Total
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(0.52 0.135 38)" }}
            >
              ₹{total}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-t border-border">
        <button
          type="button"
          disabled={!canOrder}
          onClick={onPlaceOrder}
          data-ocid="shop.place_order.submit_button"
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-opacity"
          style={{
            background: canOrder
              ? "linear-gradient(135deg, oklch(0.52 0.135 38), oklch(0.42 0.12 30))"
              : "oklch(0.75 0.04 60)",
            cursor: canOrder ? "pointer" : "not-allowed",
          }}
        >
          Place Order
        </button>
      </div>
    </motion.div>
  );
}

function OrderConfirmedScreen({
  orderId,
  onContinue,
}: {
  orderId: string;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center flex-1 px-6 text-center"
      data-ocid="shop.order_confirmed.panel"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.2 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "oklch(0.88 0.15 145 / 0.2)",
          border: "3px solid oklch(0.55 0.14 145)",
        }}
      >
        <Check
          size={44}
          style={{ color: "oklch(0.45 0.14 145)" }}
          strokeWidth={3}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "oklch(0.28 0.07 38)" }}
        >
          Order Placed! 🎉
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          Thank you for supporting Adinivaas!
        </p>
        <div
          className="inline-block px-4 py-2 rounded-xl mb-4"
          style={{
            background: "oklch(0.52 0.135 38 / 0.12)",
            border: "1.5px solid oklch(0.52 0.135 38 / 0.3)",
          }}
        >
          <p className="text-xs text-muted-foreground">Order ID</p>
          <p
            className="text-sm font-bold"
            style={{ color: "oklch(0.52 0.135 38)" }}
          >
            {orderId}
          </p>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Your order will arrive in 5–7 business days.
        </p>
        <button
          type="button"
          onClick={onContinue}
          data-ocid="shop.continue_shopping.button"
          className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.135 38), oklch(0.42 0.12 30))",
          }}
        >
          Continue Shopping
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function MerchandiseShopPage({
  onBack,
}: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>("listing");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product: Product, size: string | null, qty: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item,
        );
      }
      return [...prev, { product, qty, size }];
    });
  };

  const removeFromCart = (id: string, size: string | null) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === id && item.size === size)),
    );
  };

  const handlePlaceOrder = () => {
    const id = `ADN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(id);
    setScreen("confirmed");
    setCartOpen(false);
  };

  const handleContinueShopping = () => {
    setScreen("listing");
    setCart([]);
    setOrderId("");
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "oklch(0.97 0.01 60)" }}
    >
      {/* Header */}
      {screen !== "confirmed" && (
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-border"
          style={{
            background: "oklch(0.99 0.005 60)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              data-ocid="shop.back.button"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.93 0.02 60)" }}
            >
              <ArrowLeft size={18} style={{ color: "oklch(0.38 0.06 38)" }} />
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag
                size={20}
                style={{ color: "oklch(0.52 0.135 38)" }}
              />
              <h1
                className="font-bold text-base"
                style={{ color: "oklch(0.38 0.08 38)" }}
              >
                ADINIVAAS Shop
              </h1>
            </div>
          </div>

          {screen === "listing" && (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              data-ocid="shop.cart.open_modal_button"
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.93 0.02 60)" }}
            >
              <ShoppingCart
                size={18}
                style={{ color: "oklch(0.38 0.06 38)" }}
              />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "oklch(0.52 0.135 38)" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      )}

      {/* Screens */}
      <AnimatePresence mode="wait">
        {screen === "listing" && (
          <motion.div
            key="listing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto px-3 py-4"
          >
            {/* Hero Banner */}
            <div
              className="rounded-2xl px-5 py-5 mb-5 flex items-center gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.09 38), oklch(0.52 0.135 38))",
                boxShadow: "0 4px 16px oklch(0.52 0.135 38 / 0.35)",
              }}
            >
              <div className="flex-1">
                <p className="text-white text-xs font-semibold opacity-80 mb-1">
                  Official Store
                </p>
                <h2 className="text-white text-lg font-bold leading-tight">
                  Adinivaas Merchandise
                </h2>
                <p className="text-white text-xs opacity-70 mt-1">
                  Wear your roots. Carry your culture.
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <ShoppingBag size={32} color="white" />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onTap={() => setSelectedProduct(product)}
                  onAddToCart={() =>
                    addToCart(product, product.hasSizes ? "M" : null, 1)
                  }
                />
              ))}
            </div>
          </motion.div>
        )}

        {screen === "checkout" && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <CheckoutScreen
              cart={cart}
              onBack={() => setScreen("listing")}
              onPlaceOrder={handlePlaceOrder}
            />
          </motion.div>
        )}

        {screen === "confirmed" && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <OrderConfirmedScreen
              orderId={orderId}
              onContinue={handleContinueShopping}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Sheet */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailSheet
            key="product-sheet"
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(size, qty) => addToCart(selectedProduct, size, qty)}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            key="cart-drawer"
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onCheckout={() => {
              setCartOpen(false);
              setScreen("checkout");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
