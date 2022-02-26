const puppeteer = require("puppeteer");
const { generateUser } = require("../dataGenerator");
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

let browser, page, signUpPage;
beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();

  await page.goto(SIGNUP_URL, {
    timeout: 15000,
    waitUntil: "networkidle0",
  });

  signUpPage = new SignUpPage(page);
}, TIMEOUT_INITIALIZE_BROWSER);

afterEach(async () => {
  await browser.close();
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
  });

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
