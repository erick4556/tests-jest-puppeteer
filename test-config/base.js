const path = require("path");

module.exports = {
  roots: [path.join(__dirname, "..")],
  testEnvironment: "node",
  testTimeout: 12000,
  globals: {
    __TIMEOUT_INITIALIZE_BROWSER__: 20000,
  },
};
