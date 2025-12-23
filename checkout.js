const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const coItems = $("#coItems");
const coSubtotal = $("#coSubtotal");
const coShip = $("#coShip");
const coTotal = $("#coTotal");
const coDelivery = $("#coDelivery");

const coName = $("#coName");
const coPhone = $("#coPhone");
const coAddress = $("#coAddress");
const coCity = $("#coCity");
const coTrx = $("#coTrx");

const trxWrap = $("#trxWrap");
const payInfo = $("#payInfo");
const payBtns = $$(".payBtn");

const placeOrderBtn = $("#placeOrderBtn");
const err = $("#err");

let cart = [];
let payMethod = "cod";

function showErr(msg){
  err.textContent = msg;
  err.classList.remove("hidden");
}
function clearErr(){ err.classList.add("hidden"); err.textContent=""; }

function renderSummary(){
  if (!cart.length){
    // If cart empty -> back to shop
    location.href = "shop.html";
    return;
  }

  coItems.innerHTML = cart.map(it => {
    const p = STORE.productById(it.id);
    const line = p ? p.price * it.qty : 0;
    return `
      <div class="flex items-start justify-between gap-3 text-sm">
        <div class="min-w-0">
          <div class="font-bold text-slate-900 truncate">${p ? p.title : it.id}</div>
          <div class="text-xs text-slate-600">Size ${it.size} • ${it.color} • Qty ${it.qty}</div>
        </div>
        <div class="font-extrabold text-slate-900">${STORE.money(line)}</div>
      </div>
    `;
  }).join("");

  const subtotal = STORE.calcSubtotal(cart);
  const ship = parseInt(coDelivery.value || "80", 10) || 0;

  coSubtotal.textContent = STORE.money(subtotal);
  coShip.textContent = STORE.money(ship);
  coTotal.textContent = STORE.money(subtotal + ship);

  setPayMethod(payMethod);
}

function setPayMethod(m){
  payMethod = m;
  payBtns.forEach(b => {
    const active = b.dataset.pay === m;
    b.style.background = active ? "linear-gradient(90deg,#2563eb,#7c3aed,#ec4899)" : "";
    b.style.color = active ? "white" : "";
    b.style.borderColor = active ? "transparent" : "";
  });

  payInfo.classList.remove("hidden");
  trxWrap.classList.add("hidden");

  if (m === "bkash"){
    payInfo.innerHTML = `Send <b>${coTotal.textContent}</b> to <b>01XXXXXXXXX</b> (bKash). তারপর Transaction ID দিন।`;
    trxWrap.classList.remove("hidden");
  } else if (m === "nagad"){
    payInfo.innerHTML = `Send <b>${coTotal.textContent}</b> to <b>01XXXXXXXXX</b> (Nagad). তারপর Transaction ID দিন।`;
    trxWrap.classList.remove("hidden");
  } else if (m === "card"){
    payInfo.innerHTML = `Card payment এখন demo. পরে gateway connect করা যাবে।`;
  } else {
    payInfo.innerHTML = `Cash on Delivery selected.`;
  }
}

payBtns.forEach(btn => btn.addEventListener("click", () => setPayMethod(btn.dataset.pay)));
coDelivery.addEventListener("change", renderSummary);

placeOrderBtn.addEventListener("click", () => {
  clearErr();

  const name = (coName.value || "").trim();
  const phone = (coPhone.value || "").trim();
  const address = (coAddress.value || "").trim();
  const city = (coCity.value || "").trim();

  if (!name || !phone || !address || !city) return showErr("Name / Phone / Address / City required!");

  if ((payMethod === "bkash" || payMethod === "nagad") && !(coTrx.value || "").trim()){
    return showErr("Transaction ID required for bKash/Nagad!");
  }

  const ship = parseInt(coDelivery.value || "80", 10) || 0;
  const subtotal = STORE.calcSubtotal(cart);
  const total = subtotal + ship;

  const order = {
    id: STORE.genOrderId(),
    createdAt: new Date().toISOString(),
    customer: { name, phone, address, city },
    payment: {
      method: payMethod,
      trx: (coTrx.value || "").trim(),
      status: (payMethod === "cod") ? "Pending" : "Pending Verification"
    },
    items: cart.map(x => ({ ...x })),
    subtotal,
    shipping: ship,
    total
  };

  localStorage.setItem(STORE.LAST_ORDER_KEY, JSON.stringify(order));
  STORE.clearCart();

  location.href = "success.html";
});

// Init
cart = STORE.loadCart();
renderSummary();
