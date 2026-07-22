import { defineConfig } from 'tinacms';

export default defineConfig({
  // Localmente não precisa de credenciais.
  // Para produção, crie uma conta em https://app.tina.io e preencha:
  // clientId: process.env.TINA_CLIENT_ID,
  // token: process.env.TINA_TOKEN,
  branch: process.env.GITHUB_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? 'main',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog',
        path: 'src/content/blog',
        format: 'md',
        defaultItem: () => ({
          author: 'Time Giro DS',
          pubDate: new Date().toISOString(),
          draft: false,
          tags: [],
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title ?? 'novo-artigo')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, ''),
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descrição curta',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Data de publicação',
            required: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Autor',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'image',
            name: 'cover',
            label: 'Imagem de capa',
          },
          {
            type: 'string',
            name: 'coverAlt',
            label: 'Texto alternativo da capa',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Rascunho',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Conteúdo',
            isBody: true,
          },
        ],
      },
    ],
  },
});
