const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index",
  output: {
    path: path.resolve("./dist/"),
    filename: "index.js",
    libraryTarget: "commonjs"
  },
  target: "web"
};
