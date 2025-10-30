// packages/components-react/scripts/generate-barrel.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "..", "src");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");
const OUTPUT_FILE = path.join(SRC_DIR, "index.ts");

// Ordem de prioridade para o arquivo do componente dentro da pasta
const CANDIDATES = (name) => [
  `index.tsx`,
  `index.ts`,
  `${name}.tsx`,
  `${name}.ts`,
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
  const dirPath = path.join(COMPONENTS_DIR, dirName);
  for (const candidate of CANDIDATES(dirName)) {
    const full = path.join(dirPath, candidate);
    if (exists(full)) {
      const ext = path.extname(full);
      const baseName = path.basename(candidate, ext);
      // Se for index, importa só a pasta; senão, inclui o nome do arquivo
      const rel = baseName === 'index' 
        ? `./components/${dirName}` 
        : `./components/${dirName}/${baseName}`;
      return rel;
    }
  }
  return null;
}

function findEntryForSrcDir(dirName) {
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
  if (!isDir(COMPONENTS_DIR)) {
    console.error(`[generate-barrel] components/ não encontrado em: ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(COMPONENTS_DIR).filter((name) => {
    if (name.startsWith("_")) return false;
    const abs = path.join(COMPONENTS_DIR, name);
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
  if (exists(path.join(COMPONENTS_DIR, "Calendar"))) {
    explicit.push(
      `export { default as Calendar } from "./components/Calendar/Calendar";`,
      `export type { CalendarProps } from "./components/Calendar/Calendar";`
    );
  }

  // DatePicker — default export + tipos. Alias para Locale
  if (exists(path.join(COMPONENTS_DIR, "DatePicker"))) {
    explicit.push(
      `export { default as DatePicker } from "./components/DatePicker/DatePicker";`,
      `export type { DatePickerProps } from "./components/DatePicker/DatePicker";`
    );
  }

  // Exportar outros arquivos/diretórios da raiz de src (hooks, shared, etc.)
  const srcEntries = fs.readdirSync(SRC_DIR).filter((name) => {
    if (name.startsWith("_") || name === "components") return false;
    const abs = path.join(SRC_DIR, name);
    return isDir(abs);
  });

  for (const dir of srcEntries) {
    const rel = findEntryForSrcDir(dir);
    if (rel) {
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
