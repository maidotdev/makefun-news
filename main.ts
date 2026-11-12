import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./summary.txt', import.meta.url);
const text = readFileSync(source, 'utf8');
const codePoints = Array.from(text).length;
if (codePoints > 2000) {
  throw new Error(`summary is ${codePoints} Unicode code points; the limit is 2000`);
}
if (codePoints < 1 || text.trim() === '') {
  throw new Error('summary is empty');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'entry.txt'));
