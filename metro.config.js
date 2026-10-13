const { getDefaultConfig } = require("expo/metro-config");
const fs = require("fs");
const path = require("path");
const config = getDefaultConfig(__dirname);
// This also supports a dependency junction when the workspace disk is small.
const modules = fs.realpathSync(path.join(__dirname, "node_modules"));
if (modules !== path.join(__dirname, "node_modules")) {
  config.watchFolders = [...(config.watchFolders || []), modules];
  config.resolver.nodeModulesPaths = [
    path.join(__dirname, "node_modules"),
    modules,
  ];
}
module.exports = config;
