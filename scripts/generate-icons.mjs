#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import toIco from 'to-ico';

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function svgToPng(svgPath, size, outPath) {
  const buf = await sharp(svgPath, { limitInputPixels: false })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await fs.writeFile(outPath, buf);
  return buf;
}

async function main() {
  const svgArg = process.argv[2] || process.env.SOURCE_SVG || path.join(projectRoot, 'public', 'icons', 'logo.svg');
  const svgPath = path.isAbsolute(svgArg) ? svgArg : path.resolve(process.cwd(), svgArg);

  // Output directories
  const publicDir = path.join(projectRoot, 'public');
  const iconsDir = path.join(publicDir, 'icons');
  await ensureDir(iconsDir);

  // Validate source
  try { await fs.access(svgPath); } catch {
    console.error(`Source SVG not found: ${svgPath}`);
    console.error('Provide the path as an arg, e.g.: node scripts/generate-icons.mjs public/icons/logo.svg');
    process.exit(1);
  }

  // Define sizes
  const favSizes = [16, 32, 96, 128];
  const pwaSizes = [128, 192, 256, 384, 512];
  const appleSizes = [120, 152, 167, 180];
  const msSize = 144;

  // Generate favicon PNGs
  for (const s of favSizes) {
    const out = path.join(iconsDir, `favicon-${s}x${s}.png`);
    await svgToPng(svgPath, s, out);
  }

  // Generate PWA icons
  for (const s of pwaSizes) {
    const out = path.join(iconsDir, `icon-${s}x${s}.png`);
    await svgToPng(svgPath, s, out);
  }

  // Generate Apple touch icons
  for (const s of appleSizes) {
    const out = path.join(iconsDir, `apple-icon-${s}x${s}.png`);
    await svgToPng(svgPath, s, out);
  }

  // Microsoft tile icon
  await svgToPng(svgPath, msSize, path.join(iconsDir, `ms-icon-${msSize}x${msSize}.png`));

  // ICO: use common sizes for crisp rendering
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const s of icoSizes) {
    const png = await sharp(svgPath)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    icoPngs.push(png);
  }
  const ico = await toIco(icoPngs);
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico);

  console.log('Icons generated from:', svgPath);
  console.log('Updated files in public/ and public/icons/.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
