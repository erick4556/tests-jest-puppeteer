const path = require("path");
const { makePage } = require("../pages/pages");
const { cameraIconClick } = require("../pages/navigationBar");
const { generateRandomString } = require("../data/dataGenerator");
const { SIGNIN_URL } = require("../config/urls");
const { VALID_CREDENTIALS } = require("../data/credentials");
const SignInPage = require("../pages/signInPage");
const TIMEOUT_INITIALIZE_BROWSER = 15000;
const PATH_IMAGE_UPLOAD = path.join(__dirname, "../data/images/restaurant.jpg");

let context, signInPage;
beforeEach(async () => {
  const pageConfig = {
    url: SIGNIN_URL,
    browserConfig: { headless: false }, //slowMo: 30, para correr mas lento el test
  };
  context = await makePage(pageConfig);
  signInPage = new SignInPage(context.page);
}, TIMEOUT_INITIALIZE_BROWSER);

afterEach(async () => {
  // await browser.close();
  await context.browser.close();
});

describe("Upload de Clontagram", () => {
  test("Hacer click en el icono de cámara, debe llevar el usuario a la página de upload", async () => {
    await signInPage.fillSignInForm(VALID_CREDENTIALS);
    await signInPage.clickSignIn();
    const uploadPage = await cameraIconClick(context.page);
    await uploadPage.checkCorrectUploadPage();
  });

  test("Subir una imagen debe llevar al usuario al feed donde su post es mostrado", async () => {
    const randomCaption = generateRandomString();
    await signInPage.fillSignInForm(VALID_CREDENTIALS);
    await signInPage.clickSignIn();
    const uploadPage = await cameraIconClick(context.page);
    //Poner el caption
    await uploadPage.fillCaption(randomCaption);
    //Elegir una foto
    await uploadPage.selectPhotoToUpload(PATH_IMAGE_UPLOAD);
    await uploadPage.checkIsReadyImageToUpload();
    //Hacer click en el botón de post
    const feedPage = await uploadPage.clickPostImage();
    //Verificar que el usuario realmente puso ese post y que el caption es el correcto
    const userData = await feedPage.getUserFirstPost();
    expect(userData).toEqual({
      text: VALID_CREDENTIALS.username,
      href: `/perfil/${VALID_CREDENTIALS.username}`,
    });

    const caption = await feedPage.getCaptionFirstPost();
    expect(caption).toEqual(`${VALID_CREDENTIALS.username} ${randomCaption}`);
  });
});
