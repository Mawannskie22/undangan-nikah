const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const SRC_DIR = path.join(process.cwd(), "foto");
const OUT_DIR = path.join(process.cwd(), "public", "images", "foto", "webp");

// Nama yang benar-benar direferensikan full.html (tanpa ekstensi)
const htmlPath = path.join(process.cwd(), "public", "clone", "full.html");
const html = fs.readFileSync(htmlPath, "utf8");
const used = [
  ...new Set(
    [...html.matchAll(/\/webp\/(MLP\d+)\.webp/g)].map((m) => m[1])
  ),
];

const missing = used.filter((base) => !fs.existsSync(path.join(SRC_DIR, `${base}.jpg`)));
if (missing.length) {
  console.error("JPG tidak ditemukan di foto/:", missing);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

let totalBefore = 0;
let totalAfter = 0;

(async () => {
  for (const base of used) {
    const src = path.join(SRC_DIR, `${base}.jpg`);
    const out = path.join(OUT_DIR, `${base}.webp`);
    const before = fs.statSync(src).size;

    const info = await sharp(src)
      .rotate()
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);

    totalBefore += before;
    totalAfter += info.size;
    console.log(
      `${base.padEnd(10)} ${(before / 1024).toFixed(0).padStart(4)} KB -> ${
        (info.size / 1024).toFixed(0).padStart(4)
      } KB  (${info.width}x${info.height})`
    );
  }

  console.log("\nTotal:", (totalBefore / 1024 / 1024).toFixed(2), "MB ->", (totalAfter / 1024 / 1024).toFixed(2), "MB");
})();