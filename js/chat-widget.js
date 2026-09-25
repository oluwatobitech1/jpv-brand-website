// ==========================================================
// CHAT WIDGET
// ==========================================================
// A floating, WhatsApp-style contact widget. There's no live
// chat behind this — it composes an email to contact@jpvbrand.com
// and opens the visitor's own email app. The panel is honest
// about that (see the note under the input).

(function () {
  const widget = document.getElementById('chatWidget');
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatPanelClose');
  const form = document.getElementById('chatForm');
  const textarea = document.getElementById('chatMessage');
  const options = document.querySelectorAll('.chat-option');

  if (!widget || !toggle || !panel || !form || !textarea) return;

  const CHAT_EMAIL = 'contact@jpvbrand.com';

  function openPanel() {
    // if the bulk-order cart drawer is open on this page, close it first
    // so the two floating panels don't stack on top of each other
    if (typeof closeDrawer === 'function') {
      try { closeDrawer(); } catch (e) { /* no cart on this page */ }
    }
    widget.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => textarea.focus(), 150);
  }
  function closePanel() {
    widget.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    widget.classList.contains('open') ? closePanel() : openPanel();
  });
  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('open')) closePanel();
  });
  document.addEventListener('click', (e) => {
    if (widget.classList.contains('open') && !widget.contains(e.target)) closePanel();
  });

  // quick options prefill the message box rather than sending
  // immediately, so the visitor can add their own details first
  options.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt') || '';
      textarea.value = prompt;
      textarea.focus();
      textarea.setSelectionRange(prompt.length, prompt.length);
    });
  });

  // auto-grow the textarea a little as the visitor types
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 90) + 'px';
  });

  // ---------- toast ----------
  let toastEl = null;
  let toastTimer = null;
  function showChatToast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'chat-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = textarea.value.trim();
    if (!message) {
      textarea.focus();
      return;
    }
    const subject = encodeURIComponent('Website chat enquiry');
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${CHAT_EMAIL}?subject=${subject}&body=${body}`;

    showChatToast('Opening your email app...');
    window.location.href = mailtoLink;

    textarea.value = '';
    textarea.style.height = 'auto';
  });
})();
