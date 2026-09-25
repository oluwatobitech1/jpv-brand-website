// ==========================================================
// SITE-WIDE ANIMATIONS (v2)
// ==========================================================
// Loaded on every page. Everything is guarded, so it is safe on
// pages that lack a given element. All motion is enhancement only:
// under prefers-reduced-motion this file exits before doing anything.

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var hasIO = 'IntersectionObserver' in window;
  var isSmall = function () { return window.innerWidth <= 760; };
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ----------------------------------------------------------
  // 1. SCROLL REVEAL (left / right / up, staggered)
  // ----------------------------------------------------------
  var revealTargets = [];

  function markReveal(el, direction, index) {
    if (!el || el.hasAttribute('data-reveal')) return;
    el.setAttribute('data-reveal', direction || 'up');
    if (index != null) el.style.setProperty('--reveal-i', Math.min(index, 8));
    revealTargets.push(el);
  }

  $('.section-head, .spotlight-card, .cart-drawer-intro, .promo-band, .feedback-form, .contact-form').forEach(function (el) { markReveal(el, 'up'); });

  $('.section-grid, .story-grid, .jplux-offer').forEach(function (el) {
    var reversed = el.classList.contains('reverse');
    var kids = Array.prototype.filter.call(el.children, function (c) { return c.nodeType === 1; });
    var copy = kids[0], media = kids[kids.length - 1];
    if (copy) markReveal(copy, reversed ? 'right' : 'left');
    if (media && media !== copy) markReveal(media, reversed ? 'left' : 'right');
  });

  $('.products-grid, .projects-grid, .case-grid, .brands-grid, .cards-grid, .jplux-lookbook, .stats-band-inner, .contact-details-grid, .footer-top').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) { markReveal(child, 'up', i % 6); });
  });

  $('.tick-list, .checklist').forEach(function (list) {
    Array.prototype.forEach.call(list.children, function (li, i) { markReveal(li, 'left', i % 6); });
  });

  // Banner copy slides in from the side the text sits on
  $('.banner').forEach(function (b) {
    var dir = b.classList.contains('banner-right') ? 'right' : 'left';
    $('.banner-inner > :not(h2)', b).forEach(function (el, i) { markReveal(el, dir, i === 0 ? 0 : i + 1); });
  });

  function finishReveal(el) {
    // Hand the element back to its normal CSS (hover transforms, etc.)
    // and free the compositor layer.
    var delay = 1900 + (parseInt(el.style.getPropertyValue('--reveal-i'), 10) || 0) * 90;
    setTimeout(function () {
      el.removeAttribute('data-reveal');
      el.classList.remove('is-visible');
      el.style.removeProperty('--reveal-i');
    }, delay);
  }

  if (revealTargets.length && hasIO) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
          finishReveal(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ----------------------------------------------------------
  // 2. SPLIT-WORD HEADINGS
  // ----------------------------------------------------------
  function splitWords(root) {
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement('span');
            s.className = 'w';
            s.setAttribute('aria-hidden', 'true');
            s.style.setProperty('--wi', Math.min(n++, 14));
            s.textContent = p;
            frag.appendChild(s);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    })(root);
  }

  var heroHeads = $('.hero h1, .page-hero h1, .catalog-hero h1');
  var scrollHeads = $('.section-head h2, .banner h2, .text-block h2, .promo-copy h2, .spotlight-body h2');
  var label = function (el) { el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim()); };

  heroHeads.forEach(function (h) { label(h); splitWords(h); h.classList.add('split-words'); h.style.setProperty('--base', '250ms'); });
  requestAnimationFrame(function () { requestAnimationFrame(function () {
    heroHeads.forEach(function (h) { h.classList.add('is-in'); });
  }); });

  scrollHeads.forEach(function (h) { label(h); splitWords(h); h.classList.add('split-words'); });
  if (hasIO) {
    var headObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); headObserver.unobserve(e.target); }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -6% 0px' });
    scrollHeads.forEach(function (h) { headObserver.observe(h); });
  } else {
    scrollHeads.forEach(function (h) { h.classList.add('is-in'); });
  }

  // ----------------------------------------------------------
  // 3. ANIMATED COUNTERS (numbers, years, "5+", "1,200" ...)
  // ----------------------------------------------------------
  var counterEls = $('.stat-item strong, .hero-stats dt, [data-counter]').map(function (el) {
    var m = el.textContent.trim().match(/^([^\d]*)([\d,]+)([+%kKM]*)$/);
    return m ? { el: el, prefix: m[1], raw: m[2], suffix: m[3] } : null;
  }).filter(Boolean);

  function runCounter(c) {
    var target = parseInt(c.raw.replace(/,/g, ''), 10);
    if (isNaN(target)) return;
    var withCommas = c.raw.indexOf(',') > -1;
    var isYear = !withCommas && target >= 1900 && target <= 2100;
    var from = isYear ? target - 40 : 0;
    var duration = isYear ? 1400 : 1200;
    var t0 = performance.now();
    var fmt = function (v) { return c.prefix + (withCommas ? v.toLocaleString() : String(v)) + c.suffix; };
    (function tick(now) {
      var p = Math.min((now - t0) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      c.el.textContent = fmt(Math.round(from + (target - from) * eased));
      if (p < 1) requestAnimationFrame(tick);
      else c.el.textContent = fmt(target);
    })(t0);
  }

  if (counterEls.length && hasIO) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var c = counterEls.filter(function (x) { return x.el === e.target; })[0];
        if (c) runCounter(c);
        counterObserver.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counterEls.forEach(function (c) { counterObserver.observe(c.el); });
  }

  // ----------------------------------------------------------
  // 4. MARQUEES (duplicate track once for a seamless loop)
  // ----------------------------------------------------------
  $('.marquee-track').forEach(function (track) { track.innerHTML += track.innerHTML; });

  // Pause looping animations while they are off-screen (saves CPU/battery)
  if (hasIO) {
    var loopObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('is-offscreen', !e.isIntersecting); });
    }, { rootMargin: '120px 0px' });
    $('.section-dark, .page-hero, .catalog-hero, .marquee-strip, .marquee-band, .capabilities, .hero').forEach(function (el) { loopObserver.observe(el); });
  }

  // ----------------------------------------------------------
  // 5. ARROW NUDGE on text links ("Read more →")
  // ----------------------------------------------------------
  $('.text-link').forEach(function (a) {
    var t = a.lastChild;
    if (t && t.nodeType === 3 && /\u2192\s*$/.test(t.textContent)) {
      var txt = t.textContent.replace(/\s*\u2192\s*$/, '');
      var span = document.createElement('span');
      span.className = 'arrow';
      span.textContent = '\u2192';
      a.replaceChild(document.createTextNode(txt + ' '), t);
      a.appendChild(span);
    }
  });

  // ----------------------------------------------------------
  // 6. PARALLAX (banners + hero), progress bar, header state
  // ----------------------------------------------------------
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  var header = document.querySelector('.site-header');
  var heroBg = document.getElementById('heroVisual');
  var heroCopy = document.querySelector('.hero-copy');

  var banners = $('.banner').map(function (b) {
    var cs = getComputedStyle(b);
    if (!cs.backgroundImage || cs.backgroundImage === 'none') return null;
    var layer = document.createElement('div');
    layer.className = 'banner-bg';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.backgroundImage = cs.backgroundImage;
    layer.style.backgroundPosition = cs.backgroundPosition;
    b.classList.add('has-parallax');
    b.insertBefore(layer, b.firstChild);
    return { section: b, layer: layer, visible: false };
  }).filter(Boolean);

  if (hasIO && banners.length) {
    var bannerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        banners.forEach(function (b) { if (b.section === e.target) b.visible = e.isIntersecting; });
      });
      requestTick();
    }, { rootMargin: '10% 0px' });
    banners.forEach(function (b) { bannerObserver.observe(b.section); });
  } else {
    banners.forEach(function (b) { b.visible = true; });
  }

  var ticking = false;
  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight;
    var docH = document.documentElement.scrollHeight - vh;

    bar.style.transform = 'scaleX(' + (docH > 0 ? Math.min(y / docH, 1) : 0) + ')';
    if (header) header.classList.toggle('is-scrolled', y > 20);

    if (heroBg && y < vh * 1.2) {
      heroBg.style.transform = 'translate3d(0,' + Math.max(-40, Math.min(40, y * 0.12)) + 'px,0)';
    }
    if (heroCopy && y < vh) {
      heroCopy.style.transform = 'translate3d(0,' + (-y * 0.06).toFixed(1) + 'px,0)';
    }

    var factor = isSmall() ? 0.06 : 0.1;
    banners.forEach(function (b) {
      if (!b.visible) return;
      var r = b.section.getBoundingClientRect();
      var offset = (r.top + r.height / 2 - vh / 2) * -factor;
      var max = r.height * 0.1;
      offset = Math.max(-max, Math.min(max, offset));
      b.layer.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
    });
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  update();

  // ----------------------------------------------------------
  // 7. PAGE TRANSITIONS (fade out before navigating internally)
  // ----------------------------------------------------------
  var veil = document.createElement('div');
  veil.className = 'page-transition';
  veil.setAttribute('aria-hidden', 'true');
  document.body.appendChild(veil);

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.documentElement.classList.remove('page-leaving');
  });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|sms:|javascript:)/i.test(href)) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // same page (hash jumps)
    e.preventDefault();
    document.documentElement.classList.add('page-leaving');
    setTimeout(function () { location.href = url.href; }, 280);
  });
})();
