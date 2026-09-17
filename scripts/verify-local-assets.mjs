import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'local-assets.manifest.json'), 'utf8'));
const missing = manifest.required.filter((file) => !fs.existsSync(path.join(root, file)) || fs.statSync(path.join(root, file)).size === 0);
const runtimeFiles = ['index.html', 'assets/main-B9-HtP-f.js', 'assets/main-yeWZtezw.css', '__external__/fonts.googleapis.com/css2__q_22f4a630c2.css'];
const forbidden = ['https://why.zero.university', 'http://why.zero.university', 'https://www.googletagmanager.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
const violations = [];
for (const file of runtimeFiles) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const needle of forbidden) if (text.includes(needle)) violations.push(`${file}: ${needle}`);
}
if (missing.length || violations.length) {
  if (missing.length) console.error(`Missing local assets:\n${missing.join('\n')}`);
  if (violations.length) console.error(`Forbidden runtime references:\n${violations.join('\n')}`);
  process.exit(1);
}
console.log(`Local asset verification passed. ${manifest.required.length} required files are present.`);
