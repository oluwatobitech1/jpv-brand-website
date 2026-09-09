# JPV Brand — Website

A multi-page site built with plain HTML, CSS, and JavaScript (no frameworks,
no build step) — just open `index.html` in a browser, or upload the whole
folder to any static host.

## Site map
```
jpv-site/
├── index.html          ← home: hero, story, services, projects highlight,
│                           our brands, feedback, subscribe + contact teaser
├── exports.html         ← Export Services — JPV Auto Spare Parts Trading LLC
├── middle-east.html      ← Middle East project case studies (Dubai)
├── africa.html             ← Africa project case studies (Lagos)
├── europe.html               ← Europe "coming soon" page with email signup
├── contact.html                ← full Contact Us page: form, address, hours, map
├── products.html                  ← full JPLUX-UK product catalog, by category
├── jplux-uk.html                    ← JPLUX-UK premium tech accessories brand page
├── css/
│   ├── style.css                       ← shared design system (colors, fonts, layout)
│   └── jplux.css                         ← gold/black premium overrides, jplux-uk.html only
├── js/script.js                        ← mobile menu + all forms (shared)
└── assets/
    ├── images/                            ← put your real photos here
    └── videos/                            ← put your real videos here
```

`index.html` is the landing page — it stays focused on who you are, your
story, services, and how to reach you (email, socials, a short feedback
form, and a subscribe form all live right there). Everything else branches
off from it, each with its own full nav and footer:
- `exports.html` — JPV Auto Spare Parts Trading LLC's export categories, "Why
  Choose JPV," and contact details.
- `middle-east.html` — six Dubai project case studies plus JPV Brand Project
  Management background.
- `africa.html` — full case studies for JP Estate, Palms Court Estate, the 6
  and 8 Bedroom Detached Houses, and the Auto Spare Parts & truck shipments
  story.
- `europe.html` — a "coming soon" page with an email notify-me signup.
- `contact.html` — the full contact experience: a message form, the Dubai
  office address/phone/email/hours, and an embedded map.
- `products.html` — the JPLUX‑UK product catalog.
- `jplux-uk.html` — the JPLUX‑UK premium brand page, styled distinctly in
  gold-on-black.

The homepage's "Get in touch" block stays light (email, socials, a link to
the full contact page) rather than duplicating the whole address/hours/map —
that detail lives on `contact.html`, which every page's top nav links to.

## How the forms send messages (mailto — no backend)
Every form on the site (subscribe, feedback, the Contact page message form,
and the Europe notify-me form) uses a plain `mailto:contact@jpvbrand.com`
form action. When someone submits one:
1. Their own email app opens with a pre-filled message addressed to
   `contact@jpvbrand.com`, subject line already set, and their form answers
   laid out as the message body.
2. They still have to hit **send** from their own email app — this is a
   no-backend approach, so the page itself can't send email on its own.

This needs no server or third-party service, but two limitations to know:
- It only works if the visitor has an email app configured on their device
  (common on phones; not guaranteed on every desktop browser).
- Nothing is actually delivered until the visitor clicks send in their app.

If you'd rather messages land in your inbox immediately without relying on
the visitor's own email client, swap the `action="mailto:..."` attribute on
each `<form>` (in `index.html`, `contact.html`, `europe.html`) for an
endpoint from a service like Formspree or Web3Forms — the JS status-note
logic in `script.js` (`wireMailtoForm`) will keep working either way, you'd
just point `action` at the new URL.

## What I need from you for photos, videos, and social links
- **Photos/videos**: real image and video files for each placeholder block
  (hero, about, services, exports, projects, products, JPLUX‑UK). Any common
  format works (JPG/PNG/WebP for images, MP4 for video). Drop them into
  `assets/images/` and `assets/videos/`, then follow the swap-in pattern
  above — or send them to me and I'll wire them in directly.
  **See `MEDIA-MANIFEST.md`** for the exact filename to use for every single
  placeholder on the site (also shown right inside each placeholder box on
  the page itself, e.g. "Team / office photo — use: assets/images/about-team.jpg").
  Save your file with that exact name and it drops straight into place.
- **Social links**: Instagram, X (Twitter), YouTube, and TikTok are already
  live and correctly linked in every page's footer (plus the homepage
  contact block):
  - Instagram: instagram.com/jpvestate
  - X: x.com/jpvestate
  - YouTube: your channel
  - TikTok: tiktok.com/@jpv_brand

## Adding your real photos & videos
Every image spot is currently a styled placeholder block so you can see the
layout without real files. Each one is marked in the HTML with a comment or
a `placeholder-label` span like `<span class="placeholder-label">...</span>`.

To swap a placeholder for a real photo, replace this:
```html
<div class="media-placeholder dark">
  <span class="placeholder-label">Team / office photo</span>
</div>
```
with:
```html
<div class="media-placeholder dark">
  <img src="assets/images/your-photo.jpg" alt="Describe the photo">
</div>
```
(Drop your file into `assets/images/` first.) The same pattern applies to
`.case-media`, `.product-media`, `.project-media`, and `.coming-soon-image`
blocks.

For a video hero background, replace the `.visual-panel` markup with:
```html
<video class="visual-panel" autoplay muted loop playsinline>
  <source src="assets/videos/your-video.mp4" type="video/mp4">
</video>
```

## Site search
Every page has a search icon in the header (next to the mobile menu button).
Clicking it opens a dropdown panel with a text input; typing filters a small
hand-built index (in `js/script.js`, the `searchIndex` array) covering every
major section across all 8 pages, and clicking a result jumps straight
there. It's pure client-side substring matching — no server or third-party
search service required.

To make something new searchable (e.g. a new project or product category
you add later), add a `{ title, url, meta, keywords }` entry to
`searchIndex` in `js/script.js`.

## FAQ
The homepage has a 5-question FAQ section (`#faq`) using native
`<details>/<summary>` accordions — no JS needed for the expand/collapse.
The five questions I drafted cover what JPV Brand does, where it operates,
how to request an export quote, whether JPLUX‑UK products can be bought
directly, and how to stay updated — feel free to edit the wording in
`index.html` to match your exact answers.

## The map on contact.html
It currently uses Google's free "no API key" embed (a plain `<iframe>`
pointed at Business Bay, Dubai). If you want the exact pin/address, replace
the `src` URL with the embed link Google Maps gives you when you search your
address, click Share → Embed a map, and copy the `src` value.

## Brand colors
Main site (`css/style.css` → `:root`):
- `--black: #0b0b0c` — primary background / text
- `--yellow: #f4c10f` — accent (buttons, highlights, dividers)
- `--white: #faf9f6` — light backgrounds / text on black

JPLUX‑UK brand page (`css/jplux.css` → `:root`), a deliberately distinct
gold-on-black palette for this premium sub-brand:
- `--jplux-black: #0c0c0d`
- `--jplux-gold: #c9a24b` / `--jplux-gold-light: #e7cf94`

## Page-by-page summary

**Home (index.html)**
1. Hero — headline + trade/property intro
2. About — "Grow Your Vision" intro + "The JPV Story"
3. Services — Construction Management, Property Management & Coordination, Investment Management
4. Export services teaser → exports.html
5. Recent Projects highlight grid, with links through to africa.html and middle-east.html
6. Products link-out band → products.html
7. Our Brands — JP Views & Suites, JPV Auto Spare Parts Trading, JP Estate, JPLUX‑UK
8. Feedback form (first/last name, email, message)
9. Subscribe form + "Get in touch" (email, socials, link to full contact page) + footer

**Export Services (exports.html)** — export categories (Heavy Construction
Machinery, Building Materials, Auto Spare Parts, China‑to‑Africa sourcing),
"Why Choose JPV" checklist, and contact details with a "Request a quote" CTA.

**Middle East Projects (middle-east.html)** — six case-study cards (Ovilio
Warehouse, PCI Gym, Khaleej Travel, KCA Al‑Neeb, Siteway Core, DCI
Interiors), the Auto Spare Parts & truck shipments story, and "Grow Your
Vision" on JPV Brand Project Management (est. UAE, 2021).

**Africa Projects (africa.html)** — full case studies for JP Estate
(Sangotedo, completed March 2024), Palms Court Estate (Ajah, under
construction, Q4 2026), the 6 Bedroom Detached House (Sangotedo), the 8
Bedroom Detached House (Alatushe), and the Auto Spare Parts & truck
shipments story.

**Europe (europe.html)** — a "coming soon" hero with an email notify-me
form.

**Contact (contact.html)** — a "Send us a message" form, then address /
phone / email / office hours, then an embedded map of Business Bay, Dubai.

**Products (products.html)** — sticky category jump-nav, then a section per
category: Security Cameras, Plumbing & Sanitary, Lifestyle & Gadgets, Power
Charging & Accessories, Track & Ring Lights, Indoor Lighting, Electrical
Accessories, and Solar & Outdoor Lighting (marked "coming soon").

**JPLUX‑UK (jplux-uk.html)** — hero statement, "What We Offer," "Why Choose
JPLUX‑UK," and "Our Philosophy" including "Built for Global Markets."

## Making the forms work
Right now every "Send," "Join," and "Notify me" button just shows a
confirmation message in the browser (see `js/script.js`). To actually
collect submissions, connect them to a service like Mailchimp, Brevo, or a
simple form backend (e.g. Formspree), and replace the `TODO` comments in
`script.js` with that provider's API call.

## Adding more products, categories, or case studies
- More products: copy a `.product-card` inside the relevant category
  `<section>` in `products.html`, and add a link in the sticky category nav.
- More Middle East / Africa case studies: copy a `.case-card` (middle-east.html)
  or a full case-study `<section>` (africa.html).
