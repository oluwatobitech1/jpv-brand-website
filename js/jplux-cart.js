// ==========================================================
// JPLUX UK "ADD TO LIST" WIRING
// ==========================================================
// This page shows brand categories, not individual SKUs like
// products.html, so each offer block has one add-to-list control
// tied to its featured item name. It feeds the same shared
// cart (upsertItem/renderCart/etc. come from cart.js, loaded
// just before this file).

document.querySelectorAll('.jplux-order').forEach(order => {
  const id = order.getAttribute('data-product-id');
  const name = order.getAttribute('data-product-name');
  const category = order.getAttribute('data-product-category');
  const qtyInput = order.querySelector('.qty-input');
  const minusBtn = order.querySelector('.qty-minus');
  const plusBtn = order.querySelector('.qty-plus');
  const addBtn = order.querySelector('.btn-add-cart');

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
    if (typeof showToast === 'function') showToast(`Added ${qty} × ${name} to your list`);

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
