/**
 * Builds app/icon.png: circular crop + transparent corners (works as tab favicon).
 * Run: node scripts/generate-circular-icon.mjs
 */
import { writeFile } from "fs/promises";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public", "image", "Me.jpeg");
async function writeCirclePng(outPath, size) {
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );
  await sharp(input)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: circleSvg, blend: "dest-in" }])
    .png()
    .toFile(outPath);
  console.log("Wrote", outPath);
}

await writeCirclePng(join(root, "app", "icon.png"), 512);
await writeCirclePng(join(root, "app", "apple-icon.png"), 180);
