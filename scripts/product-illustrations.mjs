/**
 * শেষ ৪টি পণ্যের জন্য মৌলিক, ব্র্যান্ড-টোন product illustration (demo imagery)।
 * কোনো copyrighted ছবি ব্যবহার করা হয়নি — ফাইনাল product photography আসার আগে
 * এগুলো প্রিমিয়াম "coming soon" স্টেট হিসেবে কাজ করে।
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const W = 1400, H = 1400;
const BG = { wood: "#f6f1e8", line: "#7a5a33", fill: "#ece3d6", fill2: "#dfd2be", accent: "#a9853f" };

const frame = (inner, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#faf7f1"/><stop offset="60%" stop-color="#f4eee4"/><stop offset="100%" stop-color="#ece3d6"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="62%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".85"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <ellipse cx="${W / 2}" cy="${H * 0.79}" rx="470" ry="46" fill="#c3b29a" opacity=".26"/>
  ${inner}
  <g transform="translate(${W / 2} ${H - 96})">
    <text text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#2b1f12" font-weight="600">WOODORA</text>
    <text y="46" text-anchor="middle" font-family="Georgia, serif" font-size="27" fill="#7c746a">${label}</text>
    <text y="92" text-anchor="middle" font-family="Georgia, serif" font-size="21" fill="#9c9184">Demo illustration · photo coming soon</text>
  </g>
</svg>`;

/* ---------------------------- 1. Minimal TV cabinet ---------------------------- */
const tvCabinet = frame(`
  <g transform="translate(250 560)" stroke="${BG.line}" stroke-width="4" stroke-linejoin="round">
    <rect x="0" y="0" width="900" height="190" rx="8" fill="${BG.fill}"/>
    <line x1="450" y1="6" x2="450" y2="184"/>
    <rect x="300" y="60" width="300" height="70" rx="6" fill="${BG.fill2}" stroke-width="3"/>
    <rect x="70" y="70" width="150" height="50" rx="4" fill="#ffffff" stroke-width="3"/>
    <rect x="680" y="70" width="150" height="50" rx="4" fill="#ffffff" stroke-width="3"/>
    <line x1="70" y1="190" x2="70" y2="274"/><line x1="150" y1="190" x2="150" y2="274"/>
    <line x1="750" y1="190" x2="750" y2="274"/><line x1="830" y1="190" x2="830" y2="274"/>
    <line x1="40" y1="274" x2="860" y2="274" stroke-width="6"/>
  </g>`, "Minimal TV Cabinet");

/* ---------------------------- 2. Danish side table ---------------------------- */
const sideTable = frame(`
  <g transform="translate(330 640)" stroke="${BG.line}" stroke-width="4" stroke-linejoin="round">
    <rect x="0" y="0" width="740" height="42" rx="10" fill="${BG.fill2}"/>
    <path d="M70 42 L120 330 M670 42 L620 330" />
    <rect x="70" y="150" width="600" height="30" rx="8" fill="${BG.fill}"/>
    <circle cx="500" cy="-58" r="46" fill="#ffffff" stroke-width="3"/>
    <rect x="170" y="-108" width="120" height="108" rx="6" fill="${BG.fill}" stroke-width="3"/>
  </g>`, "Danish Side Table");

/* --------------------------- 3. Walnut storage cabinet --------------------------- */
const storageCabinet = frame(`
  <g transform="translate(340 430)" stroke="${BG.line}" stroke-width="4" stroke-linejoin="round">
    <rect x="0" y="120" width="720" height="640" rx="10" fill="${BG.fill}"/>
    <rect x="24" y="146" width="320" height="288" rx="6" fill="#f9f5ee" stroke-width="3"/>
    <rect x="376" y="146" width="320" height="288" rx="6" fill="#f9f5ee" stroke-width="3"/>
    <rect x="24" y="462" width="320" height="130" rx="6" fill="${BG.fill2}" stroke-width="3"/>
    <rect x="376" y="462" width="320" height="130" rx="6" fill="${BG.fill2}" stroke-width="3"/>
    <line x1="300" y1="500" x2="300" y2="556" stroke="${BG.accent}" stroke-width="7" stroke-linecap="round"/>
    <line x1="420" y1="500" x2="420" y2="556" stroke="${BG.accent}" stroke-width="7" stroke-linecap="round"/>
    <line x1="60" y1="760" x2="60" y2="830"/><line x1="660" y1="760" x2="660" y2="830"/>
    <line x1="20" y1="830" x2="700" y2="830" stroke-width="6"/>
  </g>`, "Storage Cabinet");

/* --------------------------- 4. Metal storage shelf --------------------------- */
const metalShelf = frame(`
  <g transform="translate(330 300)" stroke="${BG.line}" stroke-width="4" stroke-linejoin="round">
    <line x1="0" y1="0" x2="0" y2="760" stroke-width="7"/>
    <line x1="740" y1="0" x2="740" y2="760" stroke-width="7"/>
    ${[0, 190, 380, 570, 750].map((y) => `<rect x="8" y="${y}" width="724" height="26" rx="6" fill="${BG.fill2}"/>`).join("")}
    <rect x="60" y="70" width="150" height="112" rx="6" fill="#ffffff" stroke-width="3"/>
    <rect x="250" y="96" width="220" height="86" rx="6" fill="${BG.fill}" stroke-width="3"/>
    <circle cx="590" cy="126" r="58" fill="#ffffff" stroke-width="3"/>
    <rect x="80" y="240" width="260" height="132" rx="6" fill="#f9f5ee" stroke-width="3"/>
    <rect x="400" y="270" width="300" height="102" rx="6" fill="${BG.fill}" stroke-width="3"/>
    <rect x="60" y="430" width="180" height="132" rx="6" fill="#ffffff" stroke-width="3"/>
    <rect x="300" y="450" width="380" height="112" rx="6" fill="${BG.fill2}" stroke-width="3"/>
  </g>`, "Metal Storage Shelf");


/* --------------------------- 5. Oslo TV unit --------------------------- */
const osloTvUnit = frame(`
  <g transform="translate(230 590)" stroke="${BG.line}" stroke-width="4" stroke-linejoin="round">
    <rect x="0" y="0" width="940" height="176" rx="10" fill="${BG.fill2}"/>
    <rect x="26" y="24" width="330" height="128" rx="6" fill="#f9f5ee" stroke-width="3"/>
    <rect x="584" y="24" width="330" height="128" rx="6" fill="#f9f5ee" stroke-width="3"/>
    <rect x="380" y="46" width="180" height="84" rx="5" fill="#ffffff" stroke-width="3"/>
    <circle cx="192" cy="88" r="11" fill="${BG.accent}" stroke="none"/>
    <circle cx="748" cy="88" r="11" fill="${BG.accent}" stroke="none"/>
    <line x1="80" y1="176" x2="80" y2="252"/><line x1="180" y1="176" x2="180" y2="252"/>
    <line x1="760" y1="176" x2="760" y2="252"/><line x1="860" y1="176" x2="860" y2="252"/>
    <line x1="46" y1="252" x2="894" y2="252" stroke-width="6"/>
  </g>`, "Oslo TV Unit");

/* --------------------------- 6. Slim shoe rack --------------------------- */
const slimShoeRack = frame(`
  <g transform="translate(430 420)" stroke="${BG.line}" stroke-width="4" stroke-linejoin="round">
    <line x1="0" y1="0" x2="0" y2="700" stroke-width="7"/>
    <line x1="330" y1="0" x2="330" y2="700" stroke-width="7"/>
    ${[0, 168, 336, 504, 682].map((y) => `<rect x="6" y="${y}" width="318" height="22" rx="5" fill="${BG.fill2}"/>`).join("")}
    ${[64, 232, 400].map((y) => `
      <path d="M34 ${y + 78} q34 -52 96 -52 q62 0 96 52 q-52 22 -96 22 q-44 0 -96 -22 z" fill="#ffffff" stroke-width="3"/>
      <path d="M196 ${y + 78} q34 -52 84 -52 q40 0 50 40 q-40 20 -84 22 z" fill="${BG.fill}" stroke-width="3"/>
    `).join("")}
    <path d="M34 546 q34 -52 96 -52 q62 0 96 52 q-52 22 -96 22 q-44 0 -96 -22 z" fill="${BG.fill}" stroke-width="3"/>
  </g>`, "Slim Shoe Rack");

const jobs = [
  ["oslo-tv-unit", osloTvUnit],
  ["slim-shoe-rack", slimShoeRack],
  ["minimal-tv-cabinet", tvCabinet],
  ["danish-side-table", sideTable],
  ["storage-cabinet", storageCabinet],
  ["metal-storage-shelf", metalShelf],
];

for (const [slug, svg] of jobs) {
  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();
  writeFileSync(`public/images/products/${slug}.jpg`, buffer);
  console.log("illustration →", `${slug}.jpg`);
}
