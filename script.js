// ==========================================================
// SITE SEARCH
// ==========================================================
// A small hand-built index of every major section across all 8 pages.
// Purely client-side (substring match against title/keywords) — no
// server needed. Add a new {title, url, keywords, meta} entry here
// whenever you add a new page or section you want searchable.
const searchIndex = [
  // Home
  { title: "About JPV Brand — The JPV Story", url: "index.html#about", meta: "Home / About", keywords: "about story founders 2000 mission vision uae china africa grow your vision" },
  { title: "Construction Management", url: "index.html#services", meta: "Home / Services", keywords: "construction management build development nigeria west africa jp views suites free estimate" },
  { title: "Property Management & Coordination", url: "index.html#services", meta: "Home / Services", keywords: "property management coordination developer customer satisfaction" },
  { title: "Investment Management", url: "index.html#services", meta: "Home / Services", keywords: "investment management consultation clients complex projects book a consultation" },
  { title: "Recent Projects", url: "index.html#projects", meta: "Home / Projects", keywords: "projects jp estate 6 bedroom 8 bedroom palms court auto spare parts sangotedo lagos" },
  { title: "Our Brands", url: "index.html#brands", meta: "Home / Our Brands", keywords: "brands jp views suites jpv auto spare parts trading jp estate jplux-uk" },
  { title: "Frequently Asked Questions", url: "index.html#faq", meta: "Home / FAQ", keywords: "faq frequently asked questions help support" },
  { title: "Feedback", url: "index.html#feedback", meta: "Home / Feedback", keywords: "feedback tell us what did you think first name last name" },
  { title: "Subscribe & Get in Touch", url: "index.html#contact", meta: "Home / Contact", keywords: "subscribe email newsletter get in touch contact social media join" },

  // Exports
  { title: "Export Services Overview", url: "exports.html", meta: "Exports", keywords: "export services jpv auto spare parts trading llc uae china africa dubai" },
  { title: "Heavy Construction Machinery Exports", url: "exports.html#categories", meta: "Exports / Categories", keywords: "excavators loaders bulldozers cranes road construction machines heavy machinery" },
  { title: "Building Materials Exports", url: "exports.html#categories", meta: "Exports / Categories", keywords: "cement steel roofing sheets tiles doors sanitary wares building materials" },
  { title: "Auto Spare Parts Exports", url: "exports.html#categories", meta: "Exports / Categories", keywords: "auto spare parts cars trucks heavy equipment genuine speed reliability" },
  { title: "Why Choose JPV", url: "exports.html#why-choose", meta: "Exports", keywords: "licensed trusted uae exporter quality assurance competitive pricing shipping" },
  { title: "Request an Export Quote", url: "exports.html#get-in-touch", meta: "Exports / Contact", keywords: "request quote export contact dubai head office phone email" },

  // Middle East
  { title: "Ovilio Warehouse (Dubai)", url: "middle-east.html#ovilio-warehouse", meta: "Middle East Projects", keywords: "ovilio warehouse commercial offices north tower dubai project cost management" },
  { title: "PCI Gym (Dubai)", url: "middle-east.html#pci-gym", meta: "Middle East Projects", keywords: "pci gym redesign design district dubai" },
  { title: "Khaleej Travel (Dubai)", url: "middle-east.html#khaleej-travel", meta: "Middle East Projects", keywords: "khaleej travel bur dubai commercial offices evaluation construction" },
  { title: "KCA Al-Neeb (Dubai)", url: "middle-east.html#kca-al-neeb", meta: "Middle East Projects", keywords: "kca al neeb business bay commercial offices" },
  { title: "Siteway Core (Dubai)", url: "middle-east.html#siteway-core", meta: "Middle East Projects", keywords: "siteway core innovation hub design construction" },
  { title: "DCI Interiors (Dubai)", url: "middle-east.html#dci-interiors", meta: "Middle East Projects", keywords: "dci interiors restaurant redesign jbr beach" },
  { title: "JPV Brand Project Management (est. 2021)", url: "middle-east.html#grow-your-vision", meta: "Middle East", keywords: "jpv brand project management uae 2021 cost management consultancy grow your vision" },

  // Africa
  { title: "JP Estate (Sangotedo, Lagos)", url: "africa.html#jp-estate", meta: "Africa Projects", keywords: "jp estate sangotedo lagos completed march 2024 football pitch basketball court gym" },
  { title: "Palms Court Estate (Ajah, Lagos)", url: "africa.html#palms-court", meta: "Africa Projects", keywords: "palms court estate ajah lagos swimming pool tennis court q4 2026" },
  { title: "6 Bedroom Detached House (Sangotedo)", url: "africa.html#six-bedroom", meta: "Africa Projects", keywords: "6 bedroom detached house sangotedo lagos almost there" },
  { title: "8 Bedroom Detached House (Alatushe)", url: "africa.html#eight-bedroom", meta: "Africa Projects", keywords: "8 bedroom detached house alatushe lagos ongoing 2026" },
  { title: "Auto Spare Parts & Truck Shipments", url: "africa.html#auto-spare-parts", meta: "Africa Projects", keywords: "auto spare parts truck shipments excavators compactors cranes dump trucks tractors grader" },

  // Europe
  { title: "Europe — Coming Soon", url: "europe.html", meta: "Europe", keywords: "europe coming soon notify me launch sign up" },

  // Contact
  { title: "Send Us a Message", url: "contact.html#message-form", meta: "Contact", keywords: "contact form send message first name last name email" },
  { title: "Office Address & Hours", url: "contact.html#details", meta: "Contact", keywords: "address business bay dubai office hours phone email iris bay tower" },
  { title: "Map & Location", url: "contact.html#map", meta: "Contact", keywords: "map location directions dubai business bay" },

  // Products
  { title: "Security Cameras", url: "products.html#security-cameras", meta: "Products", keywords: "security cameras indoor camera solar camera v720 eseecloud" },
  { title: "Plumbing & Sanitary", url: "products.html#plumbing-sanitary", meta: "Products", keywords: "plumbing sanitary sink tissue holder shower kitchen faucet chrome" },
  { title: "Lifestyle & Gadgets", url: "products.html#lifestyle-gadgets", meta: "Products", keywords: "lifestyle gadgets aer air freshener laptop bag smart watch" },
  { title: "Power, Charging & Accessories", url: "products.html#power-charging", meta: "Products", keywords: "power bank torch adaptor plug extension cable charging solar" },
  { title: "Track & Ring Lights", url: "products.html#track-ring-lights", meta: "Products", keywords: "track light rail ring light tripod" },
  { title: "Indoor Lighting", url: "products.html#indoor-lighting", meta: "Products", keywords: "spot light panel light indoor lighting" },
  { title: "Electrical Accessories", url: "products.html#electrical-accessories", meta: "Products", keywords: "switches sockets tv socket 25a 45a electrical accessories" },
  { title: "Solar & Outdoor Lighting", url: "products.html#solar-outdoor", meta: "Products", keywords: "solar outdoor lighting coming soon" },

  // JPLUX-UK
  { title: "JPLUX-UK Premium Audio Products", url: "jplux-uk.html#what-we-offer", meta: "JPLUX-UK", keywords: "jplux headphones wireless bluetooth audio premium" },
  { title: "JPLUX-UK Fast Charging & Power Accessories", url: "jplux-uk.html#what-we-offer", meta: "JPLUX-UK", keywords: "jplux fast charging type-c cable power accessories 6a" },
  { title: "JPLUX-UK Mobile & Smart Accessories", url: "jplux-uk.html#what-we-offer", meta: "JPLUX-UK", keywords: "jplux mobile smart accessories connectors universal compatibility" },
  { title: "Why Choose JPLUX-UK", url: "jplux-uk.html#why-choose", meta: "JPLUX-UK", keywords: "jplux why choose premium build quality luxury design" },
  { title: "JPLUX-UK Philosophy", url: "jplux-uk.html#philosophy", meta: "JPLUX-UK", keywords: "jplux philosophy built for global markets power you can trust" },
];

const searchToggle = document.getElementById('searchToggle');
const searchPanel = document.getElementById('searchPanel');
const searchInput = document.getElementById('siteSearchInput');
const searchClose = document.getElementById('searchClose');
const searchResults = document.getElementById('searchResults');

function openSearch() {
  if (!searchPanel) return;
  searchPanel.classList.add('open');
  searchToggle.setAttribute('aria-expanded', 'true');
  searchToggle.classList.add('active');
  searchResults.innerHTML = '<p class="search-hint">Try "excavators", "JP Estate", "headphones", "contact"...</p>';
  setTimeout(() => searchInput.focus(), 50);
}

function closeSearch() {
  if (!searchPanel) return;
  searchPanel.classList.remove('open');
  searchToggle.setAttribute('aria-expanded', 'false');
  searchToggle.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = '<p class="search-hint">Try "excavators", "JP Estate", "headphones", "contact"...</p>';
    return;
  }
  const matches = searchIndex.filter(item =>
    item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
  ).slice(0, 10);

  if (matches.length === 0) {
    searchResults.innerHTML = `<p class="search-empty">No results for "${query}". Try a different word, or check the nav for Exports, Products, Middle East, Africa, or Contact.</p>`;
    return;
  }

  searchResults.innerHTML = matches.map(item => `
    <a class="search-result-item" href="${item.url}">
      <span class="search-result-title">${item.title}</span>
      <div class="search-result-meta">${item.meta}</div>
    </a>
  `).join('');
}

if (searchToggle && searchPanel) {
  searchToggle.addEventListener('click', () => {
    const isOpen = searchPanel.classList.contains('open');
    isOpen ? closeSearch() : openSearch();
  });

  searchClose.addEventListener('click', closeSearch);

  searchInput.addEventListener('input', (e) => runSearch(e.target.value));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchPanel.classList.contains('open')) {
      closeSearch();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      searchPanel.classList.contains('open') &&
      !searchPanel.contains(e.target) &&
      !searchToggle.contains(e.target)
    ) {
      closeSearch();
    }
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after tapping a link (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/*
 * All forms on this site (subscribe, feedback, contact, Europe notify) use
 * a plain HTML `mailto:` action - no backend required. When someone submits
 * one, their own email app opens with a pre-filled message addressed to
 * contact@jpvbrand.com, and THEY choose to hit send from their own inbox.
 *
 * This is the simplest option with no server, but two things to know:
 * - It only works if the visitor has an email app configured on their
 *   device/browser (many phones do by default; some desktop browsers don't).
 * - The message is not actually sent until the visitor clicks "send" in
 *   their own email client - this page cannot send it for them.
 *
 * For a form that sends immediately without relying on the visitor's own
 * email app, swap the action="mailto:..." on each <form> for an endpoint
 * from a service like Formspree, Web3Forms, or your own backend, and this
 * status-note logic will still work unchanged.
 */
function wireMailtoForm(formId, noteId, message) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);
  if (!form) return;

  form.addEventListener('submit', () => {
    // Let the native mailto submission proceed (no preventDefault) -
    // just let the visitor know what's about to happen.
    if (note) {
      note.textContent = message;
    }
    // Some browsers stay on the page after a mailto submit, so reset
    // the form shortly after for a clean slate.
    setTimeout(() => form.reset(), 300);
  });
}

wireMailtoForm(
  'subscribeForm',
  'formNote',
  'Opening your email app so you can send this to contact@jpvbrand.com...'
);

wireMailtoForm(
  'feedbackForm',
  'feedbackNote',
  'Opening your email app so you can send this to contact@jpvbrand.com...'
);

wireMailtoForm(
  'europeForm',
  'europeNote',
  'Opening your email app so you can send this to contact@jpvbrand.com...'
);

wireMailtoForm(
  'contactForm',
  'contactNote',
  'Opening your email app so you can send this to contact@jpvbrand.com...'
);
