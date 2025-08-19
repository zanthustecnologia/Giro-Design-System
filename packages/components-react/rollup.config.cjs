// packages/components-react/rollup.config.cjs
const path = require("path");
const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve").nodeResolve;
const postcss = require("rollup-plugin-postcss");
const json = require("@rollup/plugin-json");

const pkg = require("./package.json");

module.exports = [
  // Build ESM + CJS
  {
    input: "src/index.ts", // ajuste para .tsx ou .js se for o seu caso
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}).filter((d) =>
        // mantenha libs de runtime se quiser bundlar (aqui marcamos todas como externas exceto css/scss)
        !/\.(css|scss)$/.test(d)
      ),
    ],
    plugins: [
      resolve({
        extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"],
      }),
      commonjs(),
      json(),
      postcss({
        extract: true, // gera um .css ao lado do bundle
        modules: {
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
        use: { sass: true },
        minimize: true,
      }),
      typescript({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        declaration: true,
        declarationDir: "dist",
        rootDir: "src",
      }),
    ],
    output: [
      {
        file: pkg.module, // dist/index.esm.js
        format: "esm",
        sourcemap: true,
      },
      {
        file: pkg.main, // dist/index.cjs
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    onwarn(warning, warn) {
      // silenciar warnings comuns de this is undefined em CJS
      if (warning.code === "THIS_IS_UNDEFINED") return;
      warn(warning);
    },
  },
];
