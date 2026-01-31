import { defineConfig } from "tsup";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  minify: true,
  clean: true,
  external: ["react", "react-dom"],
  sourcemap: true,
});
