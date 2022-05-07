import dts from "rollup-plugin-dts";

const config = [
  {
    input: "./dist/commonjs/percept.d.ts",
    output: [{ file: "dist/percept.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
