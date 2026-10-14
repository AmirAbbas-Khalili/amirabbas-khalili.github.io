import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const limit = 800_000;
let count = 0;
let largest = 0;
const oversized = [];
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (/\.(avif|bmp|gif|jpe?g|png|tiff?|webp)$/i.test(entry.name)) {
      const { size } = await stat(file);
      count++; largest = Math.max(largest, size);
      if (size > limit) oversized.push(`${file}: ${size} bytes`);
    }
  }
}
await scan('public');
if (oversized.length) {
  console.error('Published photos must be at most 800 KB. Compress these files before deployment:\n' + oversized.join('\n'));
  process.exitCode = 1;
} else console.log(`${count} published images checked; largest ${largest} bytes (limit ${limit}).`);
