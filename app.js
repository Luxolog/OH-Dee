// OH-Dee online-store preview. Update contact/payment details only after the owner approves them.
const WHATSAPP_NUMBER = ""; // Add international digits only, e.g. 27XXXXXXXXX, once confirmed by the owner.
const products = [
 {id:"home-diffuser",name:"Home Diffuser",category:"Home",description:"200ml home fragrance diffuser.",price:200,kind:"home",symbol:"OH-Dee",caption:"HOME FRAGRANCE"},
 {id:"car-8ml",name:"Car Diffuser — 8ml",category:"Car",description:"A compact fragrance for your daily drive.",price:100,kind:"car",symbol:"OH-Dee",caption:"CAR FRAGRANCE"},
 {id:"car-15ml",name:"Car Diffuser — 15ml",category:"Car",description:"A premium-sized car fragrance.",price:110,kind:"car",symbol:"OH-Dee",caption:"CAR FRAGRANCE"},
 {id:"air-freshener",name:"Air Freshener",category:"Home",description:"500ml air freshener for a fresher space.",price:99,kind:"home",symbol:"FRESH",caption:"FRESH HOME"},
 {id:"lotion",name:"Hand/Body Lotion",category:"Self-care",description:"A daily self-care essential.",price:99,kind:"self",symbol:"CARE",caption:"SELF-CARE"},
 {id:"sea-moss-original",name:"Original Sea Moss",category:"Wellness",description:"Original sea moss — product details to be confirmed by OH-Dee.",price:200,kind:"self",symbol:"SEA MOSS",caption:"WELLNESS"},
 {id:"sea-moss-flavoured",name:"Flavoured Sea Moss",category:"Wellness",description:"Flavoured sea moss — confirm flavours and details with OH-Dee.",price:220,kind:"self",symbol:"SEA MOSS",caption:"WELLNESS"},
 {id:"hibiscus-10",name:"Hibiscus Tea — 10 Bags",category:"Wellness",description:"Hibiscus tea in a 10-bag pack.",price:60,kind:"tea",symbol:"HIBISCUS",caption:"HIBISCUS TEA"},
 {id:"hibiscus-20",name:"Hibiscus Tea — 20 Bags",category:"Wellness",description:"Hibiscus tea in a 20-bag pack.",price:110,kind:"tea",symbol:"HIBISCUS",caption:"HIBISCUS TEA"}
];
const combos = [
 {id:"combo-car",name:"Car Duo",description:"2 × 8ml car diffusers",price:180,tag:"Car fragrance"},
 {id:"combo-car-premium",name:"Car Premium Duo",description:"2 × 15ml car diffusers",price:200,tag:"Car fragrance"},
 {id:"combo-home-car",name:"Home & Car",description:"200ml home diffuser + 8ml car diffuser",price:280,tag:"Customer favourite"},
 {id:"combo-home-premium",name:"Home Premium",description:"200ml home diffuser + 15ml car diffuser",price:300,tag:"Home fragrance"},
 {id:"combo-fresh-home",name:"Fresh Home",description:"200ml home diffuser + air freshener",price:280,tag:"Home fragrance"},
 {id:"combo-fresh-car",name:"Fresh Car",description:"8ml car diffuser + air freshener",price:180,tag:"Freshness"},
 {id:"combo-self",name:"Self-Care",description:"Hand/body lotion + original sea moss",price:280,tag:"Wellness"},
 {id:"combo-self-plus",name:"Self-Care Plus",description:"Hand/body lotion + flavoured sea moss",price:300,tag:"Wellness"},
 {id:"combo-tea-original-10",name:"Tea & Wellness — Original",description:"10 tea bags + original sea moss",price:240,tag:"Tea & wellness"},
 {id:"combo-tea-original-20",name:"Tea & Wellness — Original XL",description:"20 tea bags + original sea moss",price:280,tag:"Tea & wellness"},
 {id:"combo-tea-flavoured-10",name:"Tea & Wellness — Flavoured",description:"10 tea bags + flavoured sea moss",price:260,tag:"Tea & wellness"},
 {id:"combo-tea-flavoured-20",name:"Tea & Wellness — Flavoured XL",description:"20 tea bags + flavoured sea moss",price:300,tag:"Tea & wellness"},
 {id:"combo-home-freshness",name:"Home Freshness",description:"Home diffuser + air freshener + 8ml car diffuser",price:370,tag:"Best value"},
 {id:"combo-complete",name:"OH-Dee Complete",description:"Home diffuser + air freshener + car diffuser + lotion + sea moss",price:650,tag:"Complete bundle"}
];
const cart = new Map();
const fmt = n => new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR",maximumFractionDigits:0}).format(n).replace("ZAR","R").trim();
const productGrid = document.getElementById("productGrid");
const comboList = document.getElementById("comboList");
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300)}
function renderProducts(filter="All"){
 const filtered=products.filter(p=>filter==="All"||p.category===filter);
 productGrid.innerHTML=filtered.map(p=>`<article class="product-card"><div class="product-visual ${p.kind}"><div class="symbol">${p.symbol}</div><span class="visual-caption">${p.caption}</span></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-foot"><span class="price">${fmt(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div></div></article>`).join("");
}
function renderCombos(){
 comboList.innerHTML=combos.map(c=>`<article class="combo-card"><span class="combo-tag">${c.tag}</span><h3>${c.name}</h3><p>${c.description}</p><div class="combo-bottom"><span class="combo-price">${fmt(c.price)}</span><button class="combo-add" data-combo="${c.id}">Add combo +</button></div></article>`).join("");
}
function addItem(item){const existing=cart.get(item.id);if(existing)existing.qty++;else cart.set(item.id,{...item,qty:1});renderCart();showToast(`${item.name} added to your bag`)}
function renderCart(){
 let count=0,total=0;cart.forEach(item=>{count+=item.qty;total+=item.price*item.qty});
 document.getElementById("cartCount").textContent=count;
 document.getElementById("drawerCount").textContent=`(${count})`;
 document.getElementById("cartSubtotal").textContent=fmt(total);
 const empty=cart.size===0;
 document.getElementById("cartEmpty").hidden=!empty;
 document.getElementById("cartBottom").hidden=empty;
 document.getElementById("cartItems").innerHTML=[...cart.values()].map(item=>`<div class="cart-line"><div><h3>${item.name}</h3><small>${fmt(item.price)} each</small><div class="qty-control"><button data-qty="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-change="1" aria-label="Increase quantity">+</button><button class="remove-line" data-remove="${item.id}">Remove</button></div></div><strong>${fmt(item.price*item.qty)}</strong></div>`).join("");
}
function openCart(){document.getElementById("cartOverlay").hidden=false;document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){document.getElementById("cartOverlay").hidden=true;document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.getElementById("filters").addEventListener("click",e=>{const btn=e.target.closest("[data-filter]");if(!btn)return;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts(btn.dataset.filter)});
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add){const p=products.find(x=>x.id===add.dataset.add);if(p)addItem(p);return}
 const combo=e.target.closest("[data-combo]");if(combo){const c=combos.find(x=>x.id===combo.dataset.combo);if(c)addItem({...c,category:"Combo",kind:"combo"});return}
 const qty=e.target.closest("[data-qty]");if(qty){const item=cart.get(qty.dataset.qty);if(item){item.qty+=Number(qty.dataset.change);if(item.qty<=0)cart.delete(item.id);renderCart()}return}
 const remove=e.target.closest("[data-remove]");if(remove){cart.delete(remove.dataset.remove);renderCart()}
});
document.getElementById("cartTrigger").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("cartOverlay").addEventListener("click",closeCart);
document.getElementById("continueShopping").addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>{
 if(cart.size===0)return;
 const lines=[...cart.values()].map(i=>`${i.qty} x ${i.name} — ${fmt(i.price*i.qty)}`);
 const total=[...cart.values()].reduce((sum,i)=>sum+i.price*i.qty,0);
 const message=`Hello OH-Dee, I would like to enquire about this order:\n${lines.join("\n")}\nSubtotal: ${fmt(total)}\nPlease confirm availability, delivery fee and payment options.`;
 if(!WHATSAPP_NUMBER){showToast("Preview only: the owner's WhatsApp number must be added before checkout can be used.");alert("This is a store preview. Before launch, confirm the OH-Dee WhatsApp number and configure a secure payment/ordering process.\n\nOrder summary:\n"+lines.join("\n")+"\nSubtotal: "+fmt(total));return}
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Preview only: connect an email service before collecting subscribers.");document.getElementById("newsletterMessage").textContent="No email was saved. Connect a consent-based email marketing service before launch."});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCombos();renderCart();
