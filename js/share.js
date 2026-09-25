// ==========================================================
// PRODUCT SHARE / LINK
// ==========================================================
// Every product card has an id ("product-<slug>"), so it can be
// linked to directly as products.html#product-<slug>. This wires
// up a small share menu per card: copy link, or share straight to
// WhatsApp / X / Facebook. Uses the native share sheet on mobile
// when available.

function productUrl(id) {
  return `${window.location.origin}${window.location.pathname}#${id}`;
}

function closeAllShareMenus(except) {
  document.querySelectorAll('.share-menu').forEach(menu => {
    if (menu !== except) {
      menu.hidden = true;
      const btn = menu.previousElementSibling;
      if (btn && btn.classList.contains('btn-share')) {
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

document.querySelectorAll('.btn-share').forEach(btn => {
  const id = btn.getAttribute('data-share-id');
  const card = btn.closest('.product-card');
  const name = card ? card.getAttribute('data-product-name') : 'this product';
  const menu = btn.nextElementSibling;
  if (!menu) return;

  const url = productUrl(id);
  const shareText = encodeURIComponent(`${name}: JPV Brand / JPLUX UK`);
  const shareUrl = encodeURIComponent(url);

  const waLink = menu.querySelector('.share-whatsapp');
  const xLink = menu.querySelector('.share-x');
  const fbLink = menu.querySelector('.share-facebook');
  if (waLink) waLink.href = `https://wa.me/?text=${shareText}%20${shareUrl}`;
  if (xLink) xLink.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  if (fbLink) fbLink.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  btn.addEventListener('click', async (e) => {
    e.stopPropagation();

    // Prefer the native share sheet on supported devices
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: name, url });
        return;
      } catch (err) {
        // user cancelled or share failed — fall back to the menu below
      }
    }

    const isOpen = !menu.hidden;
    closeAllShareMenus(menu);
    menu.hidden = isOpen;
    btn.setAttribute('aria-expanded', String(!isOpen));
  });

  const copyBtn = menu.querySelector('.share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(url);
        if (typeof showToast === 'function') showToast('Link copied');
      } catch (err) {
        if (typeof showToast === 'function') showToast(url);
      }
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  menu.querySelectorAll('a.share-option').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    });
  });
});

document.addEventListener('click', () => closeAllShareMenus());
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllShareMenus();
});
