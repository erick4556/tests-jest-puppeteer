const { makePage } = require("../pages/pages");
const { SIGNIN_URL } = require("../config/urls");
const {
  INVALID_CREDENTIALS_EMAIL,
  INVALID_CREDENTIALS_PASSWORD,
  DONT_FOLLOW_ANYONE_AND_NO_PHOTOS_UPLOADED_CREDENTIALS,
} = require("../data/credentials");
const SignInPage = require("../pages/signInPage");
const TIMEOUT_INITIALIZE_BROWSER = 15000;

let context, signInPage;
beforeEach(async () => {
  const pageConfig = {
    url: SIGNIN_URL,
    browserConfig: { headless: true },
  };
  context = await makePage(pageConfig);
  signInPage = new SignInPage(context.page);
}, TIMEOUT_INITIALIZE_BROWSER);

afterEach(async () => {
  // await browser.close();
  await context.browser.close();
});

describe("Sign In de Clontagram", () => {
  test("Debe llevar al usuario al feed luedo hacer login con credenciales válidas", async () => {
    await signInPage.fillSignInForm(
      DONT_FOLLOW_ANYONE_AND_NO_PHOTOS_UPLOADED_CREDENTIALS
    );
    const feedPage = await signInPage.clickSignIn();
    await feedPage.checkEmptyFeed();
  });

  test("Debe mostrar un error cuando el email no existe", async () => {
    await signInPage.fillSignInForm(INVALID_CREDENTIALS_EMAIL);
    await signInPage.clickSignIn();
    await signInPage.checkErrorDisplayed();
  });

  test("Debe mostrar un error cuando la contraseña es incorrecta", async () => {
    await signInPage.fillSignInForm(INVALID_CREDENTIALS_PASSWORD);
    await signInPage.clickSignIn();
    await signInPage.checkErrorDisplayed();
  });
});
