const UploadPage = require("./uploadPage");

const CAMERA_ICON_NAV_BAR = "#root > nav > ul > li.Nav__link-push > a";

const cameraIconClick = async (page) => {
  await page.waitForSelector(CAMERA_ICON_NAV_BAR, { visible: true }); //Verificar que el icono de la camara está presente
  await page.click(CAMERA_ICON_NAV_BAR); //Hacer click en el icono de la camara
  return new UploadPage(page);
};

module.exports = {
  cameraIconClick,
};
