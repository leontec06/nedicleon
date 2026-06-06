/* =========================================================================
   YOUR PHOTOS
   -------------------------------------------------------------------------
   To add a picture: drop the file into the  images/  folder and add an
   entry below. Order here = order in the grid (left → right, top → bottom).
   The gallery shows uniform 3:2 tiles (images are centre-cropped to fit);
   clicking a tile opens the full image in the lightbox.
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

// Portrait shown in the About section.
const PORTRAIT = "images/portrait.jpg";


/* ---------------- render gallery ---------------- */
const masonry = document.getElementById('masonry');
photos.forEach((p, i) => {
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = p.src;
  img.alt = p.alt;
  img.loading = 'lazy';
  fig.appendChild(img);
  fig.addEventListener('click', () => openLB(i));
  masonry.appendChild(fig);
});

// portrait in the About section
const portraitEl = document.getElementById('portrait');
portraitEl.style.backgroundImage = `url("${PORTRAIT.replace(/"/g, '\\"')}")`;
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
  lbImg.src = photos[cur].src;
  lbImg.alt = photos[cur].alt;
  lbCount.textContent = (cur + 1) + ' / ' + photos.length;
}
function closeLB() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function step(d) {
  cur = (cur + d + photos.length) % photos.length;
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
