import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesFile = readFileSync(join(root, "lib/data/images.ts"), "utf8");
const paths = [...imagesFile.matchAll(/"(\.?\/images\/[^"]+\.jpg)"/g)].map((m) => m[1]);
const unique = [...new Set(paths)];

function slugLabel(path) {
  const base = path.split("/").pop().replace(".jpg", "");
  return base.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

const created = [];
for (const path of [...unique, "/images/og-woodora.jpg"]) {
  const file = join(root, "public", path.replace(/^\//, ""));
  if (existsSync(file)) continue;
  mkdirSync(dirname(file), { recursive: true });
  const isOg = path.includes("og-woodora");
  const width = 1200;
  const height = isOg ? 630 : 1200;
  const label = isOg ? "Premium Furniture Store in Bangladesh" : slugLabel(path);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4eee4"/><stop offset="55%" stop-color="#ece3d6"/><stop offset="100%" stop-color="#dfd2be"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect x="${width * 0.08}" y="${height * 0.08}" width="${width * 0.84}" height="${height * 0.84}" fill="none" stroke="#c6a97f" stroke-width="2"/>
    <g transform="translate(${width / 2} ${height / 2 - 40})">
      <path d="M-90 -60 L0 -100 L90 -60 L0 -20 Z" fill="#d8bd88"/>
      <path d="M-90 -30 L0 10 L90 -30 L90 20 L0 60 L-90 20 Z" fill="#a9853f"/>
    </g>
    <text x="${width / 2}" y="${height / 2 + 150}" text-anchor="middle" font-family="Georgia, serif" font-size="${isOg ? 44 : 52}" fill="#2b1f12" font-weight="600">WOODORA</text>
    <text x="${width / 2}" y="${height / 2 + 210}" text-anchor="middle" font-family="Georgia, serif" font-size="${isOg ? 26 : 30}" fill="#7c746a">${label}</text>
    <text x="${width / 2}" y="${height - 70}" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#9c9184">Demo imagery · CodePixel Web</text>
  </svg>`;
  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toBuffer();
  writeFileSync(file, buffer);
  created.push(path);
}
console.log(`Placeholder তৈরি হয়েছে: ${created.length}`);
created.forEach((p) => console.log("  ·", p));
