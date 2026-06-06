/* =========================================================================
   YOUR PHOTOS
   -------------------------------------------------------------------------
   To show your own pictures:
     1. Drop image files into the  images/  folder.
     2. Add an entry to the `photos` list below, e.g.
            { src: "images/zurich-sunset.jpg", alt: "Sunset over Zurich" }
     3. Order here = order in the grid (top → bottom). Mix portrait &
        landscape freely — the grid keeps every aspect ratio (no cropping).

   Leave the list empty to fall back to the striped placeholders, so the
   page never looks broken while you are still adding photos.
   ========================================================================= */

const photos = [
  { src: "images/red-crane.jpg", alt: "Red harbour crane" },
  
  { src: "images/wildflowers-hill.jpg", alt: "Wildflowers on a green hillside" },
  { src: "images/alpine-cabin-snow.jpg", alt: "Red cabin below snowy mountains" },
  { src: "images/alpine-cabin-meadow.jpg", alt: "Red cabin in a green meadow" },
  { src: "images/pink-facade.jpg", alt: "Playful pink facade" },
  { src: "images/bw-birds-street.jpg", alt: "Black and white street with birds" },
  
  
  { src: "images/bw-lakeshore.jpg", alt: "Black and white figure at the lakeshore" },
  { src: "images/abstract-red.jpg", alt: "Glossy red abstract close-up" },
  { src: "images/bw-bicycles.jpg", alt: "Black and white parked bicycles" },
  { src: "images/bw-light-trails.jpg", alt: "Black and white light trails" },
  { src: "images/carousel.jpg", alt: "Carousel lit up at night" },
  { src: "images/funfair-dusk.jpg", alt: "Funfair at dusk" },
  
  { src: "images/window-display.jpg", alt: "Window display interior" },
  { src: "images/bw-bench.jpg", alt: "Black and white bench silhouette" },
  { src: "images/minimal-wall.jpg", alt: "Minimal object on a wall" },
  { src: "images/bw-city-street.jpg", alt: "Black and white city street" },
  { src: "images/bw-giant-chess.jpg", alt: "Black and white giant chess game" },
  { src: "images/bw-park.jpg", alt: "Black and white people on park benches" },
  { src: "images/bw-street.jpg", alt: "Black and white street photograph" },
];

// Portrait shown in the About section. Leave empty for a placeholder.
const PORTRAIT = "images/portrait.jpg"; // e.g. "images/portrait.jpg"


/* ---------- placeholder generator (only used until real photos exist) ---- */
const TONES = ['#E2D0B6', '#EBCFB0', '#CDDCE2', '#D8C3A6'];
function placeholder(w, h, i) {
  const tone = TONES[i % TONES.length];
  const ratio = (w / h).toFixed(2);
  const svg =
   `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <defs>
        <pattern id='p' width='22' height='22' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
          <rect width='22' height='22' fill='${tone}'/>
          <line x1='0' y1='0' x2='0' y2='22' stroke='rgba(74,66,59,.05)' stroke-width='11'/>
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill='${tone}'/>
      <rect width='100%' height='100%' fill='url(%23p)'/>
      <text x='50%' y='50%' fill='rgba(74,66,59,.5)' font-family='monospace' font-size='${Math.round(Math.min(w,h)/14)}' text-anchor='middle' dominant-baseline='middle'>photo ${String(i + 1).padStart(2, '0')} · ${ratio}:1</text>
    </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.replace(/\n\s*/g, ''));
}

// Mixed aspect ratios for a natural editorial rhythm when no real photos yet.
const FALLBACK_RATIOS = [
  [1200, 1600], [1600, 1067], [1067, 1600], [1600, 1200],
  [1600, 1066], [1200, 1500], [1500, 1000], [1080, 1080],
  [1600, 1040], [1100, 1500], [1600, 1200], [1000, 1500]
];

// Use the real photos if any were added, otherwise the placeholders.
const gallery = photos.length
  ? photos
  : FALLBACK_RATIOS.map((r, i) => ({ src: placeholder(r[0], r[1], i), alt: 'Photograph ' + (i + 1) }));


/* ---------------- render gallery ---------------- */
const masonry = document.getElementById('masonry');
gallery.forEach((p, i) => {
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = p.src;
  img.alt = p.alt;
  img.loading = 'lazy';
  img.dataset.index = i;
  fig.appendChild(img);
  fig.addEventListener('click', () => openLB(i));
  masonry.appendChild(fig);
});

// portrait in the About section
const portraitEl = document.getElementById('portrait');
const portraitSrc = PORTRAIT || placeholder(800, 1000, 1);
portraitEl.style.backgroundImage = `url("${portraitSrc.replace(/"/g, '\\"')}")`;
portraitEl.style.backgroundSize = 'cover';
portraitEl.style.backgroundPosition = 'center';


/* ---------------- marquee ---------------- */
const mq = document.getElementById('marquee');
const bits = ['ETH Student', 'Life Enjoyer', 'Photographer'];
const glyphs = ['⭒', '⋆', '☾', '✧', '₊˚'];
let unit = '';
const seq = bits.concat(bits, bits); // repeat so the track is wide enough to loop seamlessly
seq.forEach((b, i) => { unit += `<span>${b}</span><span class="g">${glyphs[i % glyphs.length]}</span>`; });
mq.innerHTML = unit + unit; // duplicate for seamless 50% loop


/* ---------------- lightbox ---------------- */
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
const lbCount = document.getElementById('lbCount');
let cur = 0;

function openLB(i) {
  cur = i;
  showLB();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function showLB() {
  lbImg.src = gallery[cur].src;
  lbImg.alt = gallery[cur].alt;
  lbCount.textContent = (cur + 1) + ' / ' + gallery.length;
}
function closeLB() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function step(d) {
  cur = (cur + d + gallery.length) % gallery.length;
  showLB();
}
document.getElementById('lbClose').addEventListener('click', closeLB);
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); step(-1); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); step(1); });
lb.addEventListener('click', e => { if (e.target === lb || e.target === lbImg) closeLB(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

/* ---------------- mobile nav (hamburger) ---------------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close the menu after tapping a link
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

document.getElementById('yr').textContent = new Date().getFullYear();
