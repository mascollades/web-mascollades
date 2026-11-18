const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'Docs', 'AirBNB');
const OUT = path.join(__dirname, '..', 'assets', 'img');

const files = fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|heic|heif|webp)$/i.test(f));

(async () => {
  let ok = 0, fail = 0;
  for (const f of files) {
    const src = path.join(SRC, f);
    const base = f.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    try {
      const img = sharp(src, { failOn: 'none' });
      const meta = await img.metadata();
      await img
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(OUT, base + '.webp'));
      ok++;
      console.log('OK  ', f, `(${meta.width}x${meta.height})`);
    } catch (e) {
      fail++;
      console.log('FAIL', f, '-', e.message);
    }
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
})();
