const { generateUser } = require("../dataGenerator");
const { makePage } = require("../pages/pages");
const { SIGNUP_URL } = require("../config/urls");
const SignUpPage = require("../pages/signUpPage");
const TIMEOUT_INITIALIZE_BROWSER = 15000;

const USER_WITH_EMAIL_REGISTERED = {
  ...generateUser(),
  email: "test@test.com",
};

const USER_WITH_USERNAME_REGISTERED = {
  ...generateUser(),
  username: "test",
};

let context, signUpPage;
beforeEach(async () => {
  /*  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage(); */

  /*  await page.goto(SIGNUP_URL, {
    timeout: 15000,
    waitUntil: "networkidle0",
  }); */
  const pageConfig = {
    url: SIGNUP_URL,
    browserConfig: { headless: true },
  };
  context = await makePage(pageConfig);
  signUpPage = new SignUpPage(context.page);
}, TIMEOUT_INITIALIZE_BROWSER);

afterEach(async () => {
  // await browser.close();
  await context.browser.close();
});

describe("Sign Up de Clontagram", () => {
  /* test("1 + 3 debe ser 4", () => {
    let x = 1 + 3;
    expect(x).toEqual(4); //Esperar que x sea 4
  });

  test("1 + 4 debe ser 5", () => {
    let x = 1 + 4;
    expect(x).toEqual(5);
  }); */
  test("Debe llevar el usuario al feed luego de hacer el sign up", async () => {
    const user = generateUser();
    await signUpPage.fillForm(user);
    const feedPage = await signUpPage.clickSignUp();
    await feedPage.checkEmptyFeed();
  }, 15000); //Aumento el timeout para que se ejecute antes de que falle

  test("Debe mostrar un error cuando el email ya está registrado", async () => {
    await signUpPage.fillForm(USER_WITH_EMAIL_REGISTERED);
    await signUpPage.clickSignUp();
    await signUpPage.checkErrorDisplayed();
  });

  test("Debe mostrar un error cuando el username ya está registrado", async () => {
    await signUpPage.fillForm(USER_WITH_USERNAME_REGISTERED);
    await signUpPage.clickSignUp();
    await signUpPage.checkErrorDisplayed();
  });
});
