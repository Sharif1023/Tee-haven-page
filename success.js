const $ = (s, r=document) => r.querySelector(s);

const oid = $("#oid");
const ototal = $("#ototal");
const opay = $("#opay");
const otrx = $("#otrx");
const olist = $("#olist");

function loadLastOrder(){
  try { return JSON.parse(localStorage.getItem(STORE.LAST_ORDER_KEY) || "null"); } catch { return null; }
}

const order = loadLastOrder();
if (!order){
  location.href = "shop.html";
} else {
  oid.textContent = order.id;
  ototal.textContent = STORE.money(order.total);
  opay.textContent = (order.payment?.method || "").toUpperCase();
  otrx.textContent = order.payment?.trx ? `• TRX: ${order.payment.trx}` : "";

  olist.innerHTML = order.items.map(it => {
    const p = STORE.productById(it.id);
    const title = p ? p.title : it.id;
    return `
      <div class="flex items-start justify-between gap-3 text-sm">
        <div class="min-w-0">
          <div class="font-bold text-slate-900 truncate">${title}</div>
          <div class="text-xs text-slate-600">Size ${it.size} • ${it.color} • Qty ${it.qty}</div>
        </div>
        <div class="font-extrabold text-slate-900">${STORE.money((p?.price || 0) * it.qty)}</div>
      </div>
    `;
  }).join("");
}
