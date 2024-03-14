import path from "path";
const __dirname = new URL("./", import.meta.url).pathname;

export default {
  resolve: {
    alias: {
      root: path.resolve(__dirname, "./"),
      components: path.resolve(__dirname, "src/components"),
    },
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
};
