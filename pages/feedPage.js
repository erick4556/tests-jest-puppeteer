const EXPLORE_CLONTAGRAM_BOX_SELECTOR = "div[class=NoSiguesANadie]";
const BOX_POST_SELECTOR = "div[class='Post-Componente']";

class FeedPage {
  constructor(page) {
    this.page = page;
  }

  async checkEmptyFeed() {
    await this.page.waitForSelector(EXPLORE_CLONTAGRAM_BOX_SELECTOR, {
      visible: true,
    }); //Espera buscar el selector en la página y si no lo encuentra muestra un error. visible: true espera que el selector este visible en la página.
  }

  async getUserFirstPost() {
    const firtsPost = await this.page.waitForSelector(BOX_POST_SELECTOR);

    return await firtsPost.evaluate((element) => {
      const avatar = element.querySelector("div[class='Avatar'] > a");
      return {
        text: avatar.innerText,
        href: avatar.pathname,
      };
    });
  }

  async getCaptionFirstPost() {
    const firtsPost = await this.page.waitForSelector(BOX_POST_SELECTOR);

    return await firtsPost.evaluate((element) => {
      const caption = element.querySelector(
        "div[class='Post-Componente__acciones'] > ul > li"
      );

      return caption.innerText;
    });
  }
}

module.exports = FeedPage;
