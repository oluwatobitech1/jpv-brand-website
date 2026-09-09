# Deploying JPV Brand's website with GitHub + Vercel

This site is plain HTML/CSS/JS with no build step, so this is a quick
setup — no frameworks, no `npm install`, nothing to configure.

## What you need first
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account — easiest to sign up using
  "Continue with GitHub" so the two are linked automatically
- [Git](https://git-scm.com/downloads) installed on your computer
- This project folder (`jpv-site/`) downloaded/unzipped somewhere on your
  computer

## Step 1 — Push the project to GitHub

Open a terminal, `cd` into the `jpv-site` folder, then run:

```bash
git init
git add .
git commit -m "Initial commit: JPV Brand website"
```

Now create a new, empty repository on GitHub:
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `jpv-brand-website` (or whatever you'd like)
3. Leave it **empty** — don't check "Add a README," since this project
   already has one (adding one on GitHub too will cause a conflict)
4. Click **Create repository**

GitHub will show you a remote URL. Back in your terminal:

```bash
git remote add origin https://github.com/YOUR-USERNAME/jpv-brand-website.git
git branch -M main
git push -u origin main
```

Refresh the GitHub page — your files should all be there.

## Step 2 — Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to the `jpv-brand-website` repo (if you signed up
   with GitHub, it'll be listed automatically; otherwise click "Add GitHub
   Account" first)
3. Framework Preset: leave it as **Other** — this is a static site, so
   there's nothing to build
4. Build Command / Output Directory: leave both **blank/default** — Vercel
   will just serve the files as-is
5. Click **Deploy**

In under a minute you'll get a live URL like
`jpv-brand-website.vercel.app` — that's your site, live on the internet.

## Step 3 — Point your real domain at it (optional)

If you own `jpvbrand.com` (or another domain):
1. In your Vercel project, go to **Settings → Domains**
2. Add `jpvbrand.com` (and `www.jpvbrand.com` if you want both)
3. Vercel will show you DNS records (usually an `A` record or `CNAME`) to
   add at wherever you bought the domain (GoDaddy, Namecheap, etc.)
4. Once DNS propagates (a few minutes to a few hours), your domain will
   point straight at this site

## After that — updates are automatic

Every time you `git push` to the `main` branch, Vercel automatically
rebuilds and redeploys the live site within seconds. There's no separate
"upload" step — GitHub is the source of truth, Vercel just watches it.

A typical update looks like:
```bash
git add .
git commit -m "Add real photos to the homepage"
git push
```

## Notes specific to this project
- `vercel.json` in this folder enables **clean URLs** — so
  `jpvbrand.com/exports` works the same as `jpvbrand.com/exports.html`
  (the `.html` version still works too, it just redirects).
- Nothing needs an API key, database, or environment variable — this is a
  fully static site, so Vercel's free tier comfortably covers it.
- If you add real photos/videos later (see `MEDIA-MANIFEST.md` and
  `README.md`), just commit and push them the same way — Vercel will pick
  them up on the next deploy.
