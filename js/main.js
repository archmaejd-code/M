/* ============================================================
   MAJED ABDULLAH — main.js
   لا تعدّل هذا الملف لإضافة مشروع — عدّل js/projects.js فقط.
   Site behaviour only. Project data lives in js/projects.js
   ============================================================ */

const SITE = window.SITE || {};
const projects = (window.PROJECTS || []).map((p, i) => ({
  id: String(i + 1).padStart(2, "0"),
  coverImage: p.coverImage || (p.images && p.images[0]) || "",
  ...p,
}));

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const pad2 = (n) => String(n).padStart(2, "0");
const bySlug = (slug) => projects.find((p) => p.slug === slug);

/* prefix: project pages live one level deep */
const ROOT = document.body.dataset.root || "";
const url = (p) => ROOT + p;
const projectUrl = (slug) => url("projects/project.html?p=" + slug);

/* ---------- menu ---------- */
function initMenu() {
  const toggle = $(".menu-toggle");
  const overlay = $(".nav-overlay");
  if (!toggle || !overlay) return;
  const set = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    overlay.setAttribute("aria-hidden", String(!open));
  };
  toggle.addEventListener("click", () =>
    set(!document.body.classList.contains("menu-open"))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") set(false);
  });
  $$("a", overlay).forEach((a) => a.addEventListener("click", () => set(false)));
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((i) => io.observe(i));
}

/* ---------- shared fixed-stage slider ---------- */
function createStage({ stage, img, caption, counter, slides, onChange, autoplay }) {
  let index = 0;

  /* preload every slide so swapping is instant */
  slides.forEach((s) => {
    const pre = new Image();
    pre.src = s.src;
  });

  const render = () => {
    const s = slides[index];
    img.src = s.src;
    img.alt = s.alt;
    if (caption) caption.textContent = s.title;
    if (caption && caption.tagName === "A") caption.href = s.href || "#";
    if (counter) counter.textContent = pad2(index + 1) + " / " + pad2(slides.length);
    if (onChange) onChange(index);
  };

  const show = (next) => {
    if (!slides.length) return;
    const target = (next + slides.length) % slides.length;
    if (target === index) return;
    index = target;
    img.classList.add("is-fading");
    setTimeout(() => {
      render();
      requestAnimationFrame(() => img.classList.remove("is-fading"));
    }, 320);
  };

  let timer = null;
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const start = () => {
    if (!autoplay || slides.length < 2) return;
    stop();
    timer = setInterval(() => show(index + 1), autoplay);
  };
  const step = (n) => { show(n); start(); };

  $(".arrow-prev", stage).addEventListener("click", () => step(index - 1));
  $(".arrow-next", stage).addEventListener("click", () => step(index + 1));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(index - 1);
    if (e.key === "ArrowRight") step(index + 1);
  });
  stage.addEventListener("mouseenter", stop);
  stage.addEventListener("mouseleave", start);
  start();
  if (counter) counter.textContent = "01 / " + pad2(slides.length);
}


/* ---------- home ---------- */
function initHome() {
  const stage = $("#home-stage");
  if (!stage) return;
  const slides = projects.map((p) => ({
    src: p.coverImage,
    alt: p.title + " — " + p.category + " project by MAJED ABDULLAH, " + p.location,
    title: p.title,
    href: projectUrl(p.slug),
  }));
  const homeTitle = $("#home-title");
  if (homeTitle && slides[0]) {
    homeTitle.textContent = slides[0].title;
    homeTitle.href = slides[0].href;
  }
  createStage({
    stage,
    img: $("#home-image"),
    caption: $("#home-title"),
    counter: $("#home-counter"),
    slides,
    autoplay: 3000,
  });

  /* marquee: duplicate images for a seamless loop */
  const track = $("#marquee-track");
  if (track) {
    const build = () =>
      projects
        .map(
          (p) =>
            '<a href="' + projectUrl(p.slug) + '"><img loading="lazy" src="' +
            p.coverImage + '" alt="' + p.title + ' — ' + p.category +
            ' project by MAJED ABDULLAH"></a>'
        )
        .join("");
    track.innerHTML = build() + build();
  }
}

/* ---------- portfolio ---------- */
function initPortfolio() {
  const grid = $("#portfolio-grid");
  if (!grid) return;
  grid.innerHTML = projects
    .map(
      (p) =>
        '<a class="grid-item reveal" data-category="' + p.category +
        '" href="' + projectUrl(p.slug) + '">' +
        '<span class="frame"><img loading="lazy" src="' + p.coverImage +
        '" alt="' + p.title + ' — ' + p.category + ' project in ' + p.location +
        ' by MAJED ABDULLAH"></span>' +
        "<h3>" + p.title + "</h3><p>" + p.category + "</p></a>"
    )
    .join("");
  initReveal();

  $$(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      $$(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
      $$(".grid-item", grid).forEach((item) => {
        const match = f === "ALL" || item.dataset.category.toUpperCase() === f;
        item.style.display = match ? "" : "none";
      });
    });
  });
}

/* ---------- project detail ---------- */
function initProject() {
  const slug =
    new URLSearchParams(location.search).get("p") ||
    document.body.dataset.project;
  if (!slug) return;
  const p = bySlug(slug);
  if (!p) return;
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  document.title = p.title + " — MAJED ABDULLAH";
  $$("[data-field]").forEach((el) => {
    const v = p[el.dataset.field];
    if (v) el.textContent = v;
  });

  const stage = $("#project-stage");
  if (stage) {
    const img = $("#project-image");
    img.src = url(p.images[0]);
    img.alt = p.title + " — image 1 of " + p.images.length;
    createStage({
      stage,
      img,
      caption: null,
      counter: $("#project-counter"),
      slides: p.images.map((src, n) => ({
        src: url(src),
        alt: p.title + " — image " + (n + 1) + " of " + p.images.length,
        title: p.title,
      })),
    });
  }

  const pv = $("#nav-prev");
  const nx = $("#nav-next");
  if (pv) pv.href = "project.html?p=" + prev.slug;
  if (nx) nx.href = "project.html?p=" + next.slug;
  initReveal();
}

/* ---------- back to top ---------- */
function initToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 14 12 8 18 14"/></svg>';
  document.body.appendChild(btn);
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    btn.classList.toggle("is-visible", max > 0 && window.scrollY > max * 0.45);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHome();
  initPortfolio();
  initProject();
  initReveal();
  initToTop();
  if (window.applyI18n) window.applyI18n();
});
