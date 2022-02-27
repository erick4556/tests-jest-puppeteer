const BOX_ERROR_SELECTOR = "div[class='ErrorContainer']";

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async checkErrorDisplayed() {
    await this.page.waitForSelector(BOX_ERROR_SELECTOR, {
      visible: true,
    });
  }
}

module.exports = BasePage;
