const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts").default;

const external = ["react", "react-dom", "@fluentui/react-icons"];

module.exports = [
  {
    input: "src/index.ts",
    external,
    plugins: [
      resolve({ extensions: [".mjs", ".js", ".ts", ".tsx", ".json"] }),
      commonjs(),
      json(),
      typescript({ declaration: false })
    ],
    output: [
      { file: "dist/index.esm.js", format: "esm", sourcemap: true },
      { file: "dist/index.cjs.js", format: "cjs", sourcemap: true, exports: "named" }
    ]
  },
  {
    input: "src/index.ts",
    external,
    plugins: [dts()],
    output: [{ file: "dist/index.d.ts", format: "es" }]
  }
];