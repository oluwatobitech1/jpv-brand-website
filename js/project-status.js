// ==========================================================
// PROJECT STATUS FILTER + ETA COUNTDOWN
// ==========================================================
// Filters project sections by their data-status attribute, and
// fills in a plain-language countdown for anything with a
// data-eta date (computed live from today's date, not a fixed
// guess, so it stays accurate whenever the page is viewed).

const statusButtons = document.querySelectorAll('.status-btn');
const statusSections = document.querySelectorAll('[data-status]');

if (statusButtons.length && statusSections.length) {
  statusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      statusButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      statusSections.forEach(section => {
        const status = section.getAttribute('data-status');
        const show = filter === 'all' || status === filter;
        section.classList.toggle('project-hidden', !show);
      });
    });
  });
}

// ---------- ETA countdown ----------
function monthsBetween(from, to) {
  return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
}

document.querySelectorAll('[data-eta]').forEach(section => {
  const note = section.querySelector('[data-eta-note]');
  if (!note) return;

  const eta = new Date(section.getAttribute('data-eta') + 'T00:00:00');
  const now = new Date();
  const months = monthsBetween(now, eta);

  if (isNaN(eta.getTime())) return;

  if (months > 1) {
    note.textContent = `About ${months} months to go`;
  } else if (months === 1) {
    note.textContent = 'About a month to go';
  } else if (months === 0) {
    note.textContent = 'Expected this month';
  } else {
    note.textContent = 'Past the original target date, contact us for the latest timeline';
  }
});
