/***********************
 * Helpers
 ***********************/
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const money = (n) => `৳${Number(n || 0).toLocaleString("en-US")}`;

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(msg) {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-slate-900 text-white text-sm shadow-2xl z-[9999]";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1600);
}

function genOrderId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `TH-${y}${m}${day}-${rnd}`;
}

/***********************
 * Demo Products (replace images)
 ***********************/
const PRODUCTS = [
  {
    id: "tee-001",
    title: "Classic Tee — Sky Blue",
    category: "classic",
    price: 650,
    img: "image/shop/tee1.webp",
    badge: "Best Seller",
    fabric: "100% Cotton",
    fit: "Regular",
    gsm: "180",
    colors: ["Sky Blue", "White", "Black"],
    features: ["Soft combed cotton", "Breathable for daily wear", "Color stays after wash", "Premium stitching"]
  },
  {
    id: "tee-002",
    title: "Oversized Tee — Jet Black",
    category: "oversized",
    price: 790,
    img: "image/shop/tee2.webp",
    badge: "Oversized",
    fabric: "Cotton + Blend",
    fit: "Oversized",
    gsm: "200",
    colors: ["Jet Black", "Ash", "Olive"],
    features: ["Streetwear oversized fit", "Thicker fabric feel", "Drop shoulder", "Perfect for layering"]
  },
  {
    id: "tee-003",
    title: "Graphic Tee — Neon Vibes",
    category: "graphic",
    price: 850,
    img: "image/shop/tee3.webp",
    badge: "New Drop",
    fabric: "100% Cotton",
    fit: "Regular",
    gsm: "190",
    colors: ["White", "Black"],
    features: ["HD print (long-lasting)", "Soft neck rib", "Fade resistant", "Comfort stretch"]
  },
  {
    id: "tee-004",
    title: "Premium Tee — Minimal Logo",
    category: "premium",
    price: 990,
    img: "image/shop/tee4.webp",
    badge: "Premium",
    fabric: "Supima Cotton",
    fit: "Slim/Regular",
    gsm: "210",
    colors: ["Navy", "White", "Black"],
    features: ["Ultra-soft premium cotton", "Luxury feel", "Clean minimal look", "Durable seams"]
  },
  {
    id: "tee-005",
    title: "Classic Tee — Pure White",
    category: "classic",
    price: 620,
    img: "image/shop/tee5.webp",
    badge: "Classic",
    fabric: "100% Cotton",
    fit: "Regular",
    gsm: "180",
    colors: ["White", "Beige", "Black"],
    features: ["Everyday essential", "Breathable", "Perfect for print", "Skin-friendly"]
  },
  {
    id: "tee-006",
    title: "Oversized Tee — Sand Beige",
    category: "oversized",
    price: 820,
    img: "image/shop/tee6.webp",
    badge: "Trend",
    fabric: "Cotton + Blend",
    fit: "Oversized",
    gsm: "200",
    colors: ["Beige", "Brown", "Black"],
    features: ["Relaxed comfy fit", "Premium drape", "Soft hand-feel", "Street style look"]
  },
  {
    id: "tee-007",
    title: "Graphic Tee — Retro Wave",
    category: "graphic",
    price: 880,
    img: "image/shop/tee7.webp",
    badge: "Limited",
    fabric: "100% Cotton",
    fit: "Regular",
    gsm: "190",
    colors: ["Black", "White"],
    features: ["Retro graphic print", "No-crack ink", "Smooth neck band", "Long-lasting color"]
  },
  {
    id: "tee-008",
    title: "Premium Tee — Deep Navy",
    category: "premium",
    price: 1050,
    img: "image/shop/tee8.webp",
    badge: "Premium",
    fabric: "Supima Cotton",
    fit: "Regular",
    gsm: "210",
    colors: ["Navy", "Charcoal", "Black"],
    features: ["Luxury soft", "Better shape retention", "Premium stitching", "Elegant everyday"]
  },
  // extra products to make "onk gula"
  {
    id: "tee-009",
    title: "Classic Tee — Olive Green",
    category: "classic",
    price: 680,
    img: "image/shop/tee9.webp",
    badge: "Hot",
    fabric: "100% Cotton",
    fit: "Regular",
    gsm: "180",
    colors: ["Olive", "Black", "White"],
    features: ["Comfort daily wear", "Breathable cotton", "Great color tone", "Strong seam"]
  },
  {
    id: "tee-010",
    title: "Oversized Tee — Ash Gray",
    category: "oversized",
    price: 810,
    img: "image/shop/tee10.webp",
    badge: "Oversized",
    fabric: "Cotton + Blend",
    fit: "Oversized",
    gsm: "200",
    colors: ["Ash", "Black", "White"],
    features: ["Relaxed look", "Premium drape", "Comfort fit", "Urban vibe"]
  },
  {
    id: "tee-011",
    title: "Graphic Tee — Bold Type",
    category: "graphic",
    price: 860,
    img: "image/shop/tee11.webp",
    badge: "Graphic",
    fabric: "100% Cotton",
    fit: "Regular",
    gsm: "190",
    colors: ["White", "Black"],
    features: ["Bold print", "Soft cotton", "Easy wash", "Comfort neckline"]
  },
  {
    id: "tee-012",
    title: "Premium Tee — Charcoal",
    category: "premium",
    price: 1020,
    img: "image/shop/tee12.webp",
    badge: "Premium",
    fabric: "Supima Cotton",
    fit: "Regular",
    gsm: "210",
    colors: ["Charcoal", "Black", "Navy"],
    features: ["Luxury cotton feel", "Clean silhouette", "Durable", "All day comfort"]
  }
];

/***********************
 * State (Cart)
 ***********************/
const CART_KEY = "tee_haven_cart_v1";
let cart = loadCart(); // [{id, size, color, qty}]

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/***********************
 * Parallax (rAF)
 ***********************/
const layers = Array.from(document.querySelectorAll(".parallax-layer"));
let latestY = 0, ticking = false;

function onScroll() {
  latestY = window.scrollY || 0;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || "0.2");
        layer.style.transform = `translate3d(0, ${latestY * speed}px, 0)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/***********************
 * Mobile: 3D stage entry when middle
 ***********************/
(function stageEntryOnMobileMid(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const stage = document.getElementById("stage3d");
  if (!stage) return;

  if (reduceMotion || !isMobile) {
    stage.classList.add("is-live");
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stage.classList.add("is-live");
        obs.disconnect();
      }
    });
  }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });

  obs.observe(stage);
})();

/***********************
 * Render Shop Grid
 ***********************/
const shopGrid = $("#shopGrid");
const searchInput = $("#searchInput");
const filterSelect = $("#filterSelect");

function getFilteredProducts() {
  const q = (searchInput?.value || "").trim().toLowerCase();
  const f = (filterSelect?.value || "all");
  return PRODUCTS.filter(p => {
    const okCat = (f === "all") || (p.category === f);
    const okQ = !q || p.title.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q);
    return okCat && okQ;
  });
}

function shopCardHTML(p) {
  const safeTitle = escapeHtml(p.title);
  const safeBadge = escapeHtml(p.badge);
  return `
    <div class="glass p-5 bg-white/55 border-white/50 transition-transform duration-300 hover:-translate-y-1 reveal-card">
      <div class="rounded-2xl overflow-hidden border border-white/60 bg-white/40">
        <img src="${escapeHtml(p.img)}" alt="${safeTitle}"
             class="w-full h-52 object-cover"
             onerror="this.src='https://via.placeholder.com/800x600?text=Tee+Haven'">
      </div>

      <div class="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-extrabold text-slate-900 leading-snug">${safeTitle}</h3>
          <div class="mt-1 text-xs inline-flex px-3 py-1 rounded-full bg-white/70 border border-white/60 text-slate-700">
            ${safeBadge}
          </div>
        </div>
        <div class="text-xl font-black text-slate-900">${money(p.price)}</div>
      </div>

      <p class="mt-3 text-sm text-slate-700">
        Fabric: <span class="font-semibold">${escapeHtml(p.fabric)}</span> • Fit: <span class="font-semibold">${escapeHtml(p.fit)}</span> • GSM: <span class="font-semibold">${escapeHtml(p.gsm)}</span>
      </p>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <button data-view="${escapeHtml(p.id)}"
          class="px-4 py-3 rounded-2xl bg-white/70 border border-white/60 text-slate-800 font-semibold hover:bg-white">
          View Details
        </button>
        <button data-quickadd="${escapeHtml(p.id)}"
          class="px-4 py-3 rounded-2xl text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition"
          style="background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899);">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

function renderShop() {
  if (!shopGrid) return;
  const list = getFilteredProducts();
  shopGrid.innerHTML = list.map(shopCardHTML).join("");

  // reveal animation (mobile: when grid hits middle; desktop: instant)
  setupRevealForElements($$(".reveal-card", shopGrid));
}

searchInput?.addEventListener("input", renderShop);
filterSelect?.addEventListener("change", renderShop);

/***********************
 * Reveal helper (mobile mid-screen)
 ***********************/
function setupRevealForElements(els) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (reduceMotion || !isMobile) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }

  // trigger when each card is around middle area
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });

  els.forEach(el => obs.observe(el));
}

/***********************
 * Product Modal
 ***********************/
const backdrop = $("#backdrop");
const productModal = $("#productModal");
const pmClose = $("#pmClose");
const pmTitle = $("#pmTitle");
const pmSubtitle = $("#pmSubtitle");
const pmImg = $("#pmImg");
const pmPrice = $("#pmPrice");
const pmBadge = $("#pmBadge");
const pmFeatures = $("#pmFeatures");
const pmSize = $("#pmSize");
const pmColor = $("#pmColor");
const pmQty = $("#pmQty");
const pmDec = $("#pmDec");
const pmInc = $("#pmInc");
const pmAdd = $("#pmAdd");
const pmFabric = $("#pmFabric");
const pmFit = $("#pmFit");
const pmGsm = $("#pmGsm");

let activeProduct = null;

function openBackdrop() { backdrop?.classList.add("show"); }
function closeBackdropIfNone() {
  const anyOpen = $("#cartDrawer")?.classList.contains("show") || productModal?.classList.contains("show") || $("#checkoutModal")?.classList.contains("show");
  if (!anyOpen) backdrop?.classList.remove("show");
}

function openProductModal(p) {
  activeProduct = p;
  pmTitle.textContent = p.title;
  pmSubtitle.textContent = `${p.category.toUpperCase()} • ${p.fabric} • ${p.fit}`;
  pmImg.src = p.img;
  pmPrice.textContent = money(p.price);
  pmBadge.textContent = p.badge;

  pmFeatures.innerHTML = p.features.map(x => `<li>✅ ${escapeHtml(x)}</li>`).join("");

  pmColor.innerHTML = p.colors.map(c => `<option>${escapeHtml(c)}</option>`).join("");
  pmQty.value = "1";
  pmFabric.textContent = p.fabric;
  pmFit.textContent = p.fit;
  pmGsm.textContent = p.gsm;

  openBackdrop();
  productModal.classList.add("show");
}

function closeProductModal() {
  productModal.classList.remove("show");
  activeProduct = null;
  closeBackdropIfNone();
}

pmClose?.addEventListener("click", closeProductModal);
pmDec?.addEventListener("click", () => { pmQty.value = String(Math.max(1, (parseInt(pmQty.value||"1",10)||1) - 1)); });
pmInc?.addEventListener("click", () => { pmQty.value = String((parseInt(pmQty.value||"1",10)||1) + 1); });

pmAdd?.addEventListener("click", () => {
  if (!activeProduct) return;
  const qty = Math.max(1, parseInt(pmQty.value || "1", 10) || 1);
  addToCart(activeProduct.id, pmSize.value, pmColor.value, qty);
  closeProductModal();
  openCart();
});

backdrop?.addEventListener("click", () => {
  // close topmost
  if ($("#checkoutModal")?.classList.contains("show")) closeCheckout();
  else if (productModal?.classList.contains("show")) closeProductModal();
  else if ($("#cartDrawer")?.classList.contains("show")) closeCart();
});

/***********************
 * Cart Drawer
 ***********************/
const cartDrawer = $("#cartDrawer");
const cartFab = $("#cartFab");
const cartClose = $("#cartClose");
const cartItemsEl = $("#cartItems");
const cartTotalEl = $("#cartTotal");
const cartCountEl = $("#cartCount");
const cartSub = $("#cartSub");
const checkoutBtn = $("#checkoutBtn");

function productById(id){ return PRODUCTS.find(p => p.id === id); }

function cartKey(item){ return `${item.id}__${item.size}__${item.color}`; }

function addToCart(id, size="L", color="Black", qty=1) {
  const p = productById(id);
  if (!p) return;

  const item = { id, size, color, qty };
  const key = cartKey(item);

  const existing = cart.find(x => cartKey(x) === key);
  if (existing) existing.qty += qty;
  else cart.push(item);

  saveCart();
  updateCartUI();
  toast("Added to cart ✅");
}

function removeFromCart(key) {
  cart = cart.filter(x => cartKey(x) !== key);
  saveCart();
  updateCartUI();
}

function setQty(key, qty) {
  qty = Math.max(1, qty|0);
  const it = cart.find(x => cartKey(x) === key);
  if (!it) return;
  it.qty = qty;
  saveCart();
  updateCartUI();
}

function calcSubtotal() {
  return cart.reduce((sum, it) => {
    const p = productById(it.id);
    return sum + (p ? p.price * it.qty : 0);
  }, 0);
}

function updateCartUI() {
  const count = cart.reduce((s, it) => s + it.qty, 0);
  cartCountEl.textContent = String(count);
  cartSub.textContent = `${count} items`;

  const subtotal = calcSubtotal();
  cartTotalEl.textContent = money(subtotal);

  if (!cartItemsEl) return;
  if (!cart.length) {
    cartItemsEl.innerHTML = `
      <div class="glass p-4 bg-white/55 border-white/50 text-slate-700">
        Cart is empty. Shop section থেকে tee add করো 😊
      </div>
    `;
    return;
  }

  cartItemsEl.innerHTML = cart.map(it => {
    const p = productById(it.id);
    const key = cartKey(it);
    const title = p ? p.title : it.id;
    const price = p ? p.price : 0;
    return `
      <div class="glass p-4 bg-white/55 border-white/50">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="font-extrabold text-slate-900 text-sm truncate">${escapeHtml(title)}</div>
            <div class="text-xs text-slate-600 mt-1">Size: <b>${escapeHtml(it.size)}</b> • Color: <b>${escapeHtml(it.color)}</b></div>
          </div>
          <button data-remove="${escapeHtml(key)}" class="px-2 py-1 rounded-lg bg-white/70 border border-white/60 hover:bg-white text-slate-700">
            Remove
          </button>
        </div>

        <div class="mt-3 flex items-center justify-between">
          <div class="text-sm font-bold text-slate-900">${money(price * it.qty)}</div>
          <div class="flex items-center gap-2">
            <button data-dec="${escapeHtml(key)}" class="w-9 h-9 rounded-xl bg-white/70 border border-white/60 hover:bg-white">−</button>
            <input data-qty="${escapeHtml(key)}" value="${it.qty}" type="number" min="1"
              class="w-14 h-9 text-center rounded-xl bg-white/70 border border-white/60" />
            <button data-inc="${escapeHtml(key)}" class="w-9 h-9 rounded-xl bg-white/70 border border-white/60 hover:bg-white">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // bind events
  $$("[data-remove]", cartItemsEl).forEach(btn => btn.addEventListener("click", () => removeFromCart(btn.dataset.remove)));
  $$("[data-dec]", cartItemsEl).forEach(btn => btn.addEventListener("click", () => {
    const key = btn.dataset.dec;
    const it = cart.find(x => cartKey(x) === key);
    if (it) setQty(key, it.qty - 1);
  }));
  $$("[data-inc]", cartItemsEl).forEach(btn => btn.addEventListener("click", () => {
    const key = btn.dataset.inc;
    const it = cart.find(x => cartKey(x) === key);
    if (it) setQty(key, it.qty + 1);
  }));
  $$("[data-qty]", cartItemsEl).forEach(inp => inp.addEventListener("change", () => setQty(inp.dataset.qty, parseInt(inp.value||"1",10)||1)));
}

function openCart() {
  openBackdrop();
  cartDrawer.classList.add("show");
}
function closeCart() {
  cartDrawer.classList.remove("show");
  closeBackdropIfNone();
}

cartFab?.addEventListener("click", openCart);
cartClose?.addEventListener("click", closeCart);

/***********************
 * Checkout
 ***********************/
const checkoutModal = $("#checkoutModal");
const coClose = $("#coClose");
const coItems = $("#coItems");
const coSubtotal = $("#coSubtotal");
const coShip = $("#coShip");
const coTotal = $("#coTotal");
const coDelivery = $("#coDelivery");
const placeOrderBtn = $("#placeOrderBtn");

const coName = $("#coName");
const coPhone = $("#coPhone");
const coAddress = $("#coAddress");
const coCity = $("#coCity");
const coTrx = $("#coTrx");
const trxWrap = $("#trxWrap");
const payInfo = $("#payInfo");
const payBtns = $$(".payBtn");

let payMethod = "cod"; // default

function openCheckout() {
  if (!cart.length) return toast("Cart empty!");
  openBackdrop();
  checkoutModal.classList.add("show");
  renderCheckout();
}
function closeCheckout() {
  checkoutModal.classList.remove("show");
  closeBackdropIfNone();
}

checkoutBtn?.addEventListener("click", openCheckout);
coClose?.addEventListener("click", closeCheckout);

function renderCheckout() {
  // summary list
  coItems.innerHTML = cart.map(it => {
    const p = productById(it.id);
    const line = p ? p.price * it.qty : 0;
    return `
      <div class="flex items-start justify-between gap-3 text-sm">
        <div class="min-w-0">
          <div class="font-bold text-slate-900 truncate">${escapeHtml(p?.title || it.id)}</div>
          <div class="text-xs text-slate-600">Size ${escapeHtml(it.size)} • ${escapeHtml(it.color)} • Qty ${it.qty}</div>
        </div>
        <div class="font-extrabold text-slate-900">${money(line)}</div>
      </div>
    `;
  }).join("");

  const subtotal = calcSubtotal();
  const ship = parseInt(coDelivery.value || "80", 10) || 0;
  coSubtotal.textContent = money(subtotal);
  coShip.textContent = money(ship);
  coTotal.textContent = money(subtotal + ship);

  // payment ui
  setPayMethod(payMethod);
}

coDelivery?.addEventListener("change", renderCheckout);

function setPayMethod(m) {
  payMethod = m;
  payBtns.forEach(b => {
    const active = b.dataset.pay === m;
    b.style.background = active ? "linear-gradient(90deg,#2563eb,#7c3aed,#ec4899)" : "";
    b.style.color = active ? "white" : "";
    b.style.borderColor = active ? "transparent" : "";
  });

  // info
  payInfo.classList.remove("hidden");
  trxWrap.classList.add("hidden");

  if (m === "bkash") {
    payInfo.innerHTML = `Send <b>${escapeHtml(coTotal.textContent)}</b> to <b>01XXXXXXXXX</b> (bKash). তারপর Transaction ID দিন।`;
    trxWrap.classList.remove("hidden");
  } else if (m === "nagad") {
    payInfo.innerHTML = `Send <b>${escapeHtml(coTotal.textContent)}</b> to <b>01XXXXXXXXX</b> (Nagad). তারপর Transaction ID দিন।`;
    trxWrap.classList.remove("hidden");
  } else if (m === "card") {
    payInfo.innerHTML = `Card payment demo mode. Later you can connect Stripe/SSLCOMMERZ/etc.`;
  } else {
    payInfo.innerHTML = `Cash on Delivery selected. Delivery time 1–3 days (demo).`;
    payInfo.classList.remove("hidden");
  }
}

payBtns.forEach(btn => btn.addEventListener("click", () => setPayMethod(btn.dataset.pay)));

placeOrderBtn?.addEventListener("click", () => {
  if (!cart.length) return toast("Cart empty!");
  const name = (coName.value || "").trim();
  const phone = (coPhone.value || "").trim();
  const address = (coAddress.value || "").trim();
  const city = (coCity.value || "").trim();

  if (!name || !phone || !address || !city) {
    return toast("Name/Phone/Address/City required!");
  }

  const ship = parseInt(coDelivery.value || "80", 10) || 0;
  const subtotal = calcSubtotal();
  const total = subtotal + ship;

  // trx required for bkash/nagad
  if ((payMethod === "bkash" || payMethod === "nagad") && !(coTrx.value || "").trim()) {
    return toast("Transaction ID required!");
  }

  const order = {
    id: genOrderId(),
    createdAt: new Date().toISOString(),
    customer: { name, phone, address, city },
    payment: { method: payMethod, trx: (coTrx.value || "").trim(), status: (payMethod === "cod") ? "Pending" : "Pending Verification" },
    items: cart.map(it => ({ ...it })),
    subtotal,
    shipping: ship,
    total
  };

  // store last order (demo)
  localStorage.setItem("tee_haven_last_order_v1", JSON.stringify(order));

  // clear cart
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  closeCart();

  toast(`Order Placed ✅ (${order.id})`);

  // quick confirmation modal via alert (you can replace with fancy UI later)
  alert(
    `✅ Order Confirmed!\n\nOrder ID: ${order.id}\nTotal: ${money(order.total)}\nPayment: ${order.payment.method.toUpperCase()}\n\n(You can replace this alert with a proper confirmation page later.)`
  );
});

/***********************
 * Shop Events (delegation)
 ***********************/
document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest("[data-view]");
  const addBtn = e.target.closest("[data-quickadd]");

  if (viewBtn) {
    const p = productById(viewBtn.dataset.view);
    if (p) openProductModal(p);
  }

  if (addBtn) {
    const p = productById(addBtn.dataset.quickadd);
    if (p) {
      // quick add default options
      addToCart(p.id, "L", p.colors?.[0] || "Black", 1);
      openCart();
    }
  }
});

/***********************
 * Smooth scroll to shop
 ***********************/
$("#shopBtn")?.addEventListener("click", (e) => {
  // allow anchor but smooth
  e.preventDefault();
  const target = document.getElementById("shop");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
});

/***********************
 * Initial
 ***********************/
renderShop();
updateCartUI();

// reveal your old feature cards too
setupRevealForElements($$(".reveal-card").filter(el => !el.closest("#shopGrid")));
