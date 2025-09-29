const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env not found in', process.cwd());
  process.exit(1);
}

const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
const pairs = {};
for (const line of lines) {
  if (!line || line.trim().startsWith('#')) continue;
  const m = line.match(/^([^=]+)=([\s\S]*)$/);
  if (!m) continue;
  const k = m[1].trim();
  const v = m[2].trim();
  pairs[k] = v;
}

const out = `// Generated secrets file. Keep this out of source control.
export default ${JSON.stringify(pairs, null, 2)};
`;
fs.writeFileSync(path.resolve(process.cwd(), 'secrets.js'), out, 'utf8');
console.log('secrets.js written (do not commit this file)');
