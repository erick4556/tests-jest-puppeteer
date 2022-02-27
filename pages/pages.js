const puppeteer = require("puppeteer");
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

module.exports = {
  makePage,
};
