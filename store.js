// ===== Shared Store =====
const STORE = {
  CART_KEY: "tee_haven_cart_v1",
  LAST_ORDER_KEY: "tee_haven_last_order_v1",

  // Demo products (change images as you want)
  PRODUCTS: [
    { id:"tee-001", title:"Classic Tee — Sky Blue", price:650, category:"classic", badge:"Best Seller",
      img:"image/shop/tee1.webp", fabric:"100% Cotton", fit:"Regular", gsm:"180",
      colors:["Sky Blue","White","Black"], features:["Soft combed cotton","Breathable for daily wear","Color stays after wash","Premium stitching"]
    },
    { id:"tee-002", title:"Oversized Tee — Jet Black", price:790, category:"oversized", badge:"Oversized",
      img:"image/shop/tee2.webp", fabric:"Cotton Blend", fit:"Oversized", gsm:"200",
      colors:["Jet Black","Ash","Olive"], features:["Streetwear oversized fit","Thicker feel","Drop shoulder","Perfect for layering"]
    },
    { id:"tee-003", title:"Graphic Tee — Neon Vibes", price:850, category:"graphic", badge:"New Drop",
      img:"image/shop/tee3.webp", fabric:"100% Cotton", fit:"Regular", gsm:"190",
      colors:["White","Black"], features:["HD print (long-lasting)","Soft neck rib","Fade resistant","Comfort stretch"]
    },
    { id:"tee-004", title:"Premium Tee — Minimal Logo", price:990, category:"premium", badge:"Premium",
      img:"image/shop/tee4.webp", fabric:"Supima Cotton", fit:"Regular", gsm:"210",
      colors:["Navy","White","Black"], features:["Ultra-soft premium cotton","Luxury feel","Clean minimal look","Durable seams"]
    },
    { id:"tee-005", title:"Classic Tee — Pure White", price:620, category:"classic", badge:"Classic",
      img:"image/shop/tee5.webp", fabric:"100% Cotton", fit:"Regular", gsm:"180",
      colors:["White","Beige","Black"], features:["Everyday essential","Breathable","Perfect for print","Skin-friendly"]
    },
    { id:"tee-006", title:"Oversized Tee — Sand Beige", price:820, category:"oversized", badge:"Trend",
      img:"image/shop/tee6.webp", fabric:"Cotton Blend", fit:"Oversized", gsm:"200",
      colors:["Beige","Brown","Black"], features:["Relaxed comfy fit","Premium drape","Soft hand-feel","Street style look"]
    },
    { id:"tee-007", title:"Graphic Tee — Retro Wave", price:880, category:"graphic", badge:"Limited",
      img:"image/shop/tee7.webp", fabric:"100% Cotton", fit:"Regular", gsm:"190",
      colors:["Black","White"], features:["Retro graphic print","No-crack ink","Smooth neck band","Long-lasting color"]
    },
    { id:"tee-008", title:"Premium Tee — Deep Navy", price:1050, category:"premium", badge:"Premium",
      img:"image/shop/tee8.webp", fabric:"Supima Cotton", fit:"Regular", gsm:"210",
      colors:["Navy","Charcoal","Black"], features:["Luxury soft","Shape retention","Premium stitching","Elegant everyday"]
    }
  ],

  money(n){ return `৳${Number(n||0).toLocaleString("en-US")}`; },

  loadCart(){
    try { return JSON.parse(localStorage.getItem(this.CART_KEY) || "[]"); } catch { return []; }
  },
  saveCart(cart){ localStorage.setItem(this.CART_KEY, JSON.stringify(cart)); },
  clearCart(){ localStorage.removeItem(this.CART_KEY); },

  productById(id){ return this.PRODUCTS.find(p => p.id === id); },

  cartKey(it){ return `${it.id}__${it.size}__${it.color}`; },

  calcSubtotal(cart){
    return cart.reduce((sum, it) => {
      const p = this.productById(it.id);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
  },

  genOrderId(){
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    const rnd = Math.floor(1000 + Math.random()*9000);
    return `TH-${y}${m}${day}-${rnd}`;
  }
};
