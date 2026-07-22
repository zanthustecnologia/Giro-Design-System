import { createInterface } from 'node:readline';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '../src/content/blog');

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

console.log('\n📝  Novo artigo — Giro DS Blog\n');

const title       = await ask('Título: ');
const description = await ask('Descrição curta: ');
const author      = await ask('Autor (Enter para "Time Giro DS"): ') || 'Time Giro DS';
const tagsRaw     = await ask('Tags separadas por vírgula (ex: tokens, react): ');
const coverFile   = await ask('Arquivo de capa (ex: cover.png) — Enter para pular: ');
const coverAlt    = coverFile ? await ask('Texto alternativo da imagem: ') : '';
const draft       = (await ask('Rascunho? (s/N): ')).toLowerCase() === 's';

rl.close();

const tags = tagsRaw
  ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
  : [];

const slug = slugify(title);
const filename = `${slug}.md`;
const filepath = join(BLOG_DIR, filename);

if (existsSync(filepath)) {
  console.error(`\n❌  Já existe um artigo com esse slug: ${filename}`);
  process.exit(1);
}

const frontmatter = [
  '---',
  `title: "${title}"`,
  `description: "${description}"`,
  `pubDate: ${today()}`,
  `author: "${author}"`,
  `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`,
  coverFile ? `cover: ./${coverFile}` : '',
  coverAlt  ? `coverAlt: "${coverAlt}"` : '',
  draft ? 'draft: true' : '',
  '---',
].filter((line) => line !== '').join('\n');

const template = `${frontmatter}

<!-- Escreva seu artigo aqui em Markdown -->

`;

if (!existsSync(BLOG_DIR)) mkdirSync(BLOG_DIR, { recursive: true });

writeFileSync(filepath, template, 'utf-8');

console.log(`\n✅  Artigo criado em:\n   src/content/blog/${filename}\n`);
if (coverFile) {
  console.log(`⚠️  Lembre de copiar a imagem para:\n   src/content/blog/${coverFile}\n`);
}
