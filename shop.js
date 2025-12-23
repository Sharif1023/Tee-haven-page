const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function esc(str){
  return String(str ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

const backdrop = $("#backdrop");
const cartDrawer = $("#cartDrawer");
const cartItemsEl = $("#cartItems");
const cartTotalEl = $("#cartTotal");
const cartSub = $("#cartSub");
const cartCount = $("#cartCount");

const openCartBtn = $("#openCartBtn");
const cartClose = $("#cartClose");

const searchInput = $("#searchInput");
const filterSelect = $("#filterSelect");
const shopGrid = $("#shopGrid");

// Product modal
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

let cart = [];
let activeProduct = null;

function openBackdrop(){ backdrop.classList.add("show"); }
function closeBackdropIfNone(){
  const any = cartDrawer.classList.contains("show") || productModal.classList.contains("show");
  if (!any) backdrop.classList.remove("show");
}

function openCart(){ openBackdrop(); cartDrawer.classList.add("show"); }
function closeCart(){ cartDrawer.classList.remove("show"); closeBackdropIfNone(); }

function openModal(p){
  activeProduct = p;

  pmTitle.textContent = p.title;
  pmSubtitle.textContent = `${p.category.toUpperCase()} • ${p.fabric} • ${p.fit}`;
  pmImg.src = p.img;
  pmImg.onerror = () => { pmImg.src = "https://via.placeholder.com/900x700?text=Tee+Haven"; };
  pmPrice.textContent = STORE.money(p.price);
  pmBadge.textContent = p.badge;
  pmFeatures.innerHTML = p.features.map(x => `<li>✅ ${esc(x)}</li>`).join("");

  pmColor.innerHTML = p.colors.map(c => `<option>${esc(c)}</option>`).join("");
  pmQty.value = "1";
  pmFabric.textContent = p.fabric;
  pmFit.textContent = p.fit;
  pmGsm.textContent = p.gsm;

  openBackdrop();
  productModal.classList.add("show");
}

function closeModal(){
  productModal.classList.remove("show");
  activeProduct = null;
  closeBackdropIfNone();
}

function cartKey(it){ return STORE.cartKey(it); }

function addToCart(id, size="L", color="Black", qty=1){
  const key = `${id}__${size}__${color}`;
  const existing = cart.find(x => cartKey(x) === key);
  if (existing) existing.qty += qty;
  else cart.push({ id, size, color, qty });

  STORE.saveCart(cart);
  renderCart();
}

function removeFromCart(key){
  cart = cart.filter(x => cartKey(x) !== key);
  STORE.saveCart(cart);
  renderCart();
}

function setQty(key, qty){
  qty = Math.max(1, qty|0);
  const it = cart.find(x => cartKey(x) === key);
  if (!it) return;
  it.qty = qty;
  STORE.saveCart(cart);
  renderCart();
}

function renderCart(){
  const count = cart.reduce((s, it) => s + it.qty, 0);
  cartCount.textContent = String(count);
  cartSub.textContent = `${count} items`;

  const subtotal = STORE.calcSubtotal(cart);
  cartTotalEl.textContent = STORE.money(subtotal);

  if (!cart.length){
    cartItemsEl.innerHTML = `<div class="glass p-4 bg-white/55 border-white/50 text-slate-700">Cart is empty.</div>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map(it => {
    const p = STORE.productById(it.id);
    const key = cartKey(it);
    const title = p ? p.title : it.id;
    const line = p ? p.price * it.qty : 0;
    return `
      <div class="glass p-4 bg-white/55 border-white/50">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="font-extrabold text-slate-900 text-sm truncate">${esc(title)}</div>
            <div class="text-xs text-slate-600 mt-1">Size: <b>${esc(it.size)}</b> • Color: <b>${esc(it.color)}</b></div>
          </div>
          <button data-remove="${esc(key)}" class="px-2 py-1 rounded-lg bg-white/70 border border-white/60 hover:bg-white text-slate-700">Remove</button>
        </div>

        <div class="mt-3 flex items-center justify-between">
          <div class="text-sm font-bold text-slate-900">${STORE.money(line)}</div>
          <div class="flex items-center gap-2">
            <button data-dec="${esc(key)}" class="w-9 h-9 rounded-xl bg-white/70 border border-white/60 hover:bg-white">−</button>
            <input data-qty="${esc(key)}" value="${it.qty}" type="number" min="1"
              class="w-14 h-9 text-center rounded-xl bg-white/70 border border-white/60" />
            <button data-inc="${esc(key)}" class="w-9 h-9 rounded-xl bg-white/70 border border-white/60 hover:bg-white">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

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
  $$("[data-qty]", cartItemsEl).forEach(inp => inp.addEventListener("change", () => {
    setQty(inp.dataset.qty, parseInt(inp.value || "1", 10) || 1);
  }));
}

function filteredProducts(){
  const q = (searchInput.value || "").trim().toLowerCase();
  const f = filterSelect.value || "all";
  return STORE.PRODUCTS.filter(p => {
    const okCat = (f === "all") || (p.category === f);
    const okQ = !q || p.title.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q);
    return okCat && okQ;
  });
}

function productCard(p){
  return `
    <div class="glass p-5 bg-white/55 border-white/50">
      <div class="rounded-2xl overflow-hidden border border-white/60 bg-white/40">
        <img src="${esc(p.img)}" alt="${esc(p.title)}" class="w-full h-52 object-cover"
             onerror="this.src='https://via.placeholder.com/900x700?text=Tee+Haven'">
      </div>

      <div class="mt-4 flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h3 class="text-lg font-extrabold text-slate-900 leading-snug">${esc(p.title)}</h3>
          <div class="mt-1 text-xs inline-flex px-3 py-1 rounded-full bg-white/70 border border-white/60 text-slate-700">${esc(p.badge)}</div>
        </div>
        <div class="text-xl font-black text-slate-900">${STORE.money(p.price)}</div>
      </div>

      <p class="mt-3 text-sm text-slate-700">
        Fabric: <b>${esc(p.fabric)}</b> • Fit: <b>${esc(p.fit)}</b> • GSM: <b>${esc(p.gsm)}</b>
      </p>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <button data-view="${esc(p.id)}" class="px-4 py-3 rounded-2xl bg-white/70 border border-white/60 text-slate-800 font-semibold hover:bg-white">
          View Details
        </button>
        <button data-add="${esc(p.id)}"
          class="px-4 py-3 rounded-2xl text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition"
          style="background: linear-gradient(90deg,#2563eb,#7c3aed,#ec4899);">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

function renderShop(){
  const list = filteredProducts();
  shopGrid.innerHTML = list.map(productCard).join("");
}

document.addEventListener("click", (e) => {
  const v = e.target.closest("[data-view]");
  const a = e.target.closest("[data-add]");
  if (v){
    const p = STORE.productById(v.dataset.view);
    if (p) openModal(p);
  }
  if (a){
    const p = STORE.productById(a.dataset.add);
    if (!p) return;
    addToCart(p.id, "L", p.colors[0] || "Black", 1);
    openCart();
  }
});

pmClose.addEventListener("click", closeModal);
pmDec.addEventListener("click", () => pmQty.value = String(Math.max(1,(parseInt(pmQty.value||"1",10)||1)-1)));
pmInc.addEventListener("click", () => pmQty.value = String((parseInt(pmQty.value||"1",10)||1)+1));
pmAdd.addEventListener("click", () => {
  if (!activeProduct) return;
  const qty = Math.max(1, parseInt(pmQty.value || "1", 10) || 1);
  addToCart(activeProduct.id, pmSize.value, pmColor.value, qty);
  closeModal();
  openCart();
});

openCartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);

backdrop.addEventListener("click", () => {
  if (productModal.classList.contains("show")) closeModal();
  else if (cartDrawer.classList.contains("show")) closeCart();
});

searchInput.addEventListener("input", renderShop);
filterSelect.addEventListener("change", renderShop);

// Init
cart = STORE.loadCart();
renderShop();
renderCart();
