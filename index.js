const puppeteer = require("puppeteer");
const { generateUser } = require("./dataGenerator");
const SignUpPage = require("./pages/signUpPage");
const { SIGNUP_URL } = require("./config/urls");

completeSignUp = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(SIGNUP_URL, {
    timeout: 15000, //Espera de 15 segundos hasta que haga el timeout
    waitUntil: "networkidle0", //Esperar que no hayan peticiones en el navegador por 500ms
  });

  const signUpPage = new SignUpPage(page);

  const user = generateUser();

  await signUpPage.fillForm(user);
  await signUpPage.clickSignUp();
};

completeSignUp();
