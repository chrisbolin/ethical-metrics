const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index",
  output: {
    path: path.resolve("./dist/"),
    filename: "index.js",
    libraryTarget: "commonjs"
  },
  target: "node",
  resolve: {
    alias: {
      "pg-native": path.join(__dirname, "aliases/pg-native.js"),
      pgpass$: path.join(__dirname, "aliases/pgpass.js")
    }
  }
};
