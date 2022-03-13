const base = require("./base");
const desktopConfig = {
  ...base,
};

desktopConfig.globals.__BROWSER_CONFIG__ = {
  headless: true,
  defaultViewport: { width: 1600, height: 1000 }, // defaulViewport para editar el tamaño de la pantalla
};

desktopConfig.globals.__MOBILE_DEVICE__ = null; // Para que pueda correr en modo mobile y desktop

module.exports = desktopConfig;
