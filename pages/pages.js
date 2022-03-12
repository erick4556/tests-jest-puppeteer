const puppeteer = require("puppeteer");
const { SIGNIN_URL } = require("../config/urls");
const getTokenAndAuthData = require("../auth/auth.js");

const makePage = async ({
  url,
  browserConfig = { headless: true },
  pageConfig = {
    timeout: 15000,
    waitUntil: "networkidle0",
  },
}) => {
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();

  await page.goto(url, pageConfig);

  return {
    browser,
    page,
  };
};

const makePageForAuth = async ({
  url,
  credentials,
  browserConfig = { headless: true },
  pageConfig = {
    timeout: 15000,
    waitUntil: "networkidle0",
  },
}) => {
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();

  await page.goto(SIGNIN_URL, pageConfig);

  const authData = await getTokenAndAuthData(credentials);

  //Ejecución dentro del browser, no se puede usar lo que esta afuera, tiene que pasarse el parámetro al final de la función evaluate
  await page.evaluate((token) => {
    localStorage.setItem("CLONTAGRAM_TOKEN", token);
  }, authData.token);

  await page.goto(url, pageConfig);

  return {
    browser, //Ya va con el token inyectado
    page,
  };
};

module.exports = {
  makePage,
  makePageForAuth,
};
