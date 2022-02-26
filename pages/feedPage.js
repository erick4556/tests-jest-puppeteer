const EXPLORE_CLONTAGRAM_BOX_SELECTOR = "div[class=NoSiguesANadie]";

class FeedPage {
  constructor(page) {
    this.page = page;
  }

  async checkEmptyFeed() {
    await this.page.waitForSelector(EXPLORE_CLONTAGRAM_BOX_SELECTOR, {
      visible: true,
    }); //Espera buscar el selector en la página y si no lo encuentra muestra un error. visible: true espera que el selector este visible en la página.
  }
}

module.exports = FeedPage;
