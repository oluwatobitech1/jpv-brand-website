// ==========================================================
// MARKET CART
// ==========================================================
// A simple bulk-order "quote list" cart. No prices, no payment —
// this is a B2B catalog where pricing depends on quantity and
// shipping destination. People pick quantities, add products to
// a list, and "checkout" turns that list into an email to
// contact@jpvbrand.com so JPV can reply with a real quote.
//
// The cart is saved in localStorage so it survives while browsing
// between categories on this page (and reloads of this page).

const CART_KEY = 'jpv_quote_cart';
const QUOTE_EMAIL = 'contact@jpvbrand.com';

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    // storage unavailable — cart just won't persist this session
  }
}

let cart = loadCart();

// ---------- DOM refs ----------
const cartToggle = document.getElementById('cartToggle');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItemsEl = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotalCount = document.getElementById('cartTotalCount');
const cartCheckout = document.getElementById('cartCheckout');
const cartClear = document.getElementById('cartClear');

// ---------- toast ----------
let toastEl = null;
let toastTimer = null;
function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'cart-toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// ---------- cart data helpers ----------
function totalItemCount() {
  return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

function upsertItem(id, name, category, qty) {
  if (cart[id]) {
    cart[id].qty += qty;
  } else {
    cart[id] = { name, category, qty };
  }
  if (cart[id].qty < 1) cart[id].qty = 1;
  saveCart(cart);
  renderCart();
  updateBadge();
}

function setItemQty(id, qty) {
  if (!cart[id]) return;
  if (qty < 1) qty = 1;
  cart[id].qty = qty;
  saveCart(cart);
  renderCart();
  updateBadge();
}

function removeItem(id) {
  delete cart[id];
  saveCart(cart);
  renderCart();
  updateBadge();
}

function clearCart() {
  cart = {};
  saveCart(cart);
  renderCart();
  updateBadge();
}

// ---------- rendering ----------
function updateBadge() {
  const count = totalItemCount();
  if (cartBadge) {
    if (count > 0) {
      cartBadge.textContent = count > 99 ? '99+' : String(count);
      cartBadge.hidden = false;
    } else {
      cartBadge.hidden = true;
    }
  }
}

function renderCart() {
  if (!cartItemsEl) return;
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your list is empty. Add products and their quantities, and we\'ll turn it into a quote request.</p>';
  } else {
    cartItemsEl.innerHTML = ids.map(id => {
      const item = cart[id];
      return `
        <div class="cart-item" data-id="${id}">
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-cat">${item.category}</p>
          </div>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn qty-minus" aria-label="Decrease quantity">&#8722;</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" step="1" inputmode="numeric" aria-label="Quantity">
            <button type="button" class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="cart-item-remove" aria-label="Remove ${item.name}">&times;</button>
        </div>
      `;
    }).join('');
  }

  if (cartTotalCount) cartTotalCount.textContent = String(totalItemCount());
  const hasItems = ids.length > 0;
  if (cartCheckout) cartCheckout.disabled = !hasItems;
  if (cartClear) cartClear.disabled = !hasItems;

  // wire up per-item controls (re-attached each render since markup is rebuilt)
  cartItemsEl.querySelectorAll('.cart-item').forEach(row => {
    const id = row.getAttribute('data-id');
    const input = row.querySelector('.qty-input');
    row.querySelector('.qty-minus').addEventListener('click', () => {
      setItemQty(id, (cart[id]?.qty || 1) - 1);
    });
    row.querySelector('.qty-plus').addEventListener('click', () => {
      setItemQty(id, (cart[id]?.qty || 1) + 1);
    });
    input.addEventListener('change', () => {
      const val = parseInt(input.value, 10);
      setItemQty(id, isNaN(val) ? 1 : val);
    });
    row.querySelector('.cart-item-remove').addEventListener('click', () => {
      removeItem(id);
    });
  });
}

// ---------- drawer open/close ----------
function openDrawer() {
  // if the chat widget is open, close it first so the two floating
  // panels don't stack on top of each other
  const chatWidgetEl = document.getElementById('chatWidget');
  if (chatWidgetEl) chatWidgetEl.classList.remove('open');

  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartToggle.setAttribute('aria-expanded', 'true');
  cartToggle.classList.add('active');
}
function closeDrawer() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartToggle.setAttribute('aria-expanded', 'false');
  cartToggle.classList.remove('active');
}

if (cartToggle && cartDrawer) {
  cartToggle.addEventListener('click', () => {
    cartDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  cartClose.addEventListener('click', closeDrawer);
  cartOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer.classList.contains('open')) closeDrawer();
  });
}

if (cartClear) {
  cartClear.addEventListener('click', () => {
    if (cartClear.disabled) return;
    clearCart();
    showToast('List cleared');
  });
}

const ORDER_DETAILS_KEY = 'jpv_order_details';

const orderFieldIds = ['orderCompany', 'orderContact', 'orderEmail', 'orderPhone', 'orderRegion', 'orderNotes'];

function loadOrderDetails() {
  try {
    const raw = localStorage.getItem(ORDER_DETAILS_KEY);
    const details = raw ? JSON.parse(raw) : {};
    orderFieldIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && details[id]) el.value = details[id];
    });
  } catch (e) {
    // no saved details, start blank
  }
}

function saveOrderDetails() {
  const details = {};
  orderFieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) details[id] = el.value;
  });
  try {
    localStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(details));
  } catch (e) {
    // storage unavailable, details just won't persist
  }
}

orderFieldIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', saveOrderDetails);
});
loadOrderDetails();

// ---------- checkout: build a bulk order request email ----------
if (cartCheckout) {
  cartCheckout.addEventListener('click', () => {
    if (cartCheckout.disabled) return;

    const ids = Object.keys(cart);
    if (ids.length === 0) return;

    const companyEl = document.getElementById('orderCompany');
    const contactEl = document.getElementById('orderContact');
    const emailEl = document.getElementById('orderEmail');
    const phoneEl = document.getElementById('orderPhone');
    const regionEl = document.getElementById('orderRegion');
    const notesEl = document.getElementById('orderNotes');

    const company = companyEl ? companyEl.value.trim() : '';
    const contact = contactEl ? contactEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';

    if (!company || !contact || !email) {
      showToast('Please fill in company, contact name, and email');
      const firstEmpty = !company ? companyEl : (!contact ? contactEl : emailEl);
      if (firstEmpty) firstEmpty.focus();
      return;
    }

    const phone = phoneEl ? phoneEl.value.trim() : '';
    const region = regionEl ? regionEl.value : '';
    const notes = notesEl ? notesEl.value.trim() : '';

    // Group by category for a readable email
    const byCategory = {};
    ids.forEach(id => {
      const item = cart[id];
      if (!byCategory[item.category]) byCategory[item.category] = [];
      byCategory[item.category].push(item);
    });

    let bodyLines = [
      'Hello JPV Brand,',
      '',
      'We would like to request a bulk order quote. Our details:',
      '',
      `Company: ${company}`,
      `Contact person: ${contact}`,
      `Email: ${email}`,
    ];
    if (phone) bodyLines.push(`Phone: ${phone}`);
    if (region) bodyLines.push(`Delivery region: ${region}`);
    bodyLines.push('');
    bodyLines.push('Items requested:');
    bodyLines.push('');
    Object.keys(byCategory).forEach(cat => {
      bodyLines.push(`${cat}:`);
      byCategory[cat].forEach(item => {
        bodyLines.push(`  - ${item.name} x ${item.qty}`);
      });
      bodyLines.push('');
    });
    if (notes) {
      bodyLines.push(`Notes: ${notes}`);
      bodyLines.push('');
    }
    bodyLines.push('Please send pricing and shipping options for these quantities.');
    bodyLines.push('');
    bodyLines.push('Thank you.');

    const subject = encodeURIComponent('Bulk order request, JPV Brand products');
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoLink = `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;

    showToast('Opening your email app...');
    window.location.href = mailtoLink;
  });
}

// ---------- product card wiring ----------
document.querySelectorAll('.product-card').forEach(card => {
  const id = card.getAttribute('data-product-id');
  const name = card.getAttribute('data-product-name');
  const category = card.getAttribute('data-product-category');
  const qtyInput = card.querySelector('.qty-input');
  const minusBtn = card.querySelector('.qty-minus');
  const plusBtn = card.querySelector('.qty-plus');
  const addBtn = card.querySelector('.btn-add-cart');

  if (!id || !qtyInput || !addBtn) return;

  minusBtn.addEventListener('click', () => {
    const val = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
    qtyInput.value = val;
  });
  plusBtn.addEventListener('click', () => {
    const val = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + 1);
    qtyInput.value = val;
  });
  qtyInput.addEventListener('change', () => {
    const val = parseInt(qtyInput.value, 10);
    qtyInput.value = isNaN(val) || val < 1 ? 1 : val;
  });

  addBtn.addEventListener('click', () => {
    const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    upsertItem(id, name, category, qty);
    showToast(`Added ${qty} × ${name} to your list`);

    addBtn.classList.add('added');
    const originalText = addBtn.textContent;
    addBtn.textContent = 'Added';
    setTimeout(() => {
      addBtn.classList.remove('added');
      addBtn.textContent = originalText;
    }, 1200);

    qtyInput.value = 1;
  });
});

// ---------- initial paint ----------
renderCart();
updateBadge();
