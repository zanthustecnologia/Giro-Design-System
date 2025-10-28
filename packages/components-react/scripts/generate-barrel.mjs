// packages/components-react/scripts/generate-barrel.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "..", "src");
const OUTPUT_FILE = path.join(SRC_DIR, "index.ts");

// Ordem de prioridade para o arquivo do componente dentro da pasta
const CANDIDATES = (name) => [
  `${name}.tsx`,
  `${name}.ts`,
  `index.tsx`,
  `index.ts`,
  `${name}.jsx`,
  `${name}.js`,
  `index.jsx`,
  `index.js`,
];

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function exists(p) {
  try { fs.accessSync(p, fs.constants.R_OK); return true; } catch { return false; }
}

function findEntryFor(dirName) {
  const dirPath = path.join(SRC_DIR, dirName);
  for (const candidate of CANDIDATES(dirName)) {
    const full = path.join(dirPath, candidate);
    if (exists(full)) {
      const ext = path.extname(full);
      const rel = `./${dirName}/${path.basename(candidate, ext)}`;
      return rel;
    }
  }
  return null;
}

function main() {
  if (!isDir(SRC_DIR)) {
    console.error(`[generate-barrel] src/ não encontrado em: ${SRC_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(SRC_DIR).filter((name) => {
    if (name.startsWith("_")) return false;
    const abs = path.join(SRC_DIR, name);
    return isDir(abs);
  });

  // Componentes que NÃO devem usar `export *` por colisões/particularidades
  const BLOCKLIST = new Set(["Calendar", "DatePicker"]);

  const genericExports = [];
  const notFound = [];

  for (const dir of entries) {
    const rel = findEntryFor(dir);
    if (!rel) { notFound.push(dir); continue; }
    if (BLOCKLIST.has(dir)) continue; // trataremos explicitamente abaixo
    genericExports.push(`export * from "${rel}";`);
  }

  // ==== Exportações explícitas para evitar conflito de `Locale`
  const explicit = [];

  // Calendar — default export + tipos. Alias para Locale
  if (exists(path.join(SRC_DIR, "Calendar"))) {
    explicit.push(
      `export { default as Calendar } from "./Calendar/Calendar";`,
      `export type { CalendarProps } from "./Calendar/Calendar";`,
      `export type { Locale as CalendarLocale } from "./Calendar/Calendar";`
    );
  }

  // DatePicker — default export + tipos. Alias para Locale
  if (exists(path.join(SRC_DIR, "DatePicker"))) {
    explicit.push(
      `export { default as DatePicker } from "./DatePicker/DatePicker";`,
      `export type { DatePickerProps } from "./DatePicker/DatePicker";`,
      `export type { Locale as DatePickerLocale } from "./DatePicker/DatePicker";`
    );
  }

  // Extras garantidos (se não vieram via generic)
  const extras = [{ rel: "./Toast/Toast" }, { rel: "./Tooltip/Tooltip" }];
  for (const { rel } of extras) {
    if (!genericExports.some((l) => l.includes(rel))) {
      genericExports.push(`export * from "${rel}";`);
    }
  }

  const header = `// AUTO-GERADO por scripts/generate-barrel.mjs
// Não edite manualmente: rode "npm run gen:barrel" após adicionar/renomear componentes.

`;

  const content = header + [...genericExports.sort(), ...explicit].join("\n") + "\n";
  fs.writeFileSync(OUTPUT_FILE, content, "utf8");

  console.log(`[generate-barrel] Gerado ${OUTPUT_FILE} com ${genericExports.length + explicit.length} exports.`);
  if (notFound.length) {
    console.warn(`[generate-barrel] Aviso: não foi possível detectar o entry de: ${notFound.join(", ")}.`);
  }
}

main();
