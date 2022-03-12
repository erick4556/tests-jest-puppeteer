const BasePage = require("./basePage");

const LIKE_BUTTON_SELECTOR = 'div[class="Post__like"] > button';
const HEART_ICON_SELECTOR = `${LIKE_BUTTON_SELECTOR} > svg`;
const COMMENT_INPUT_SELECTOR =
  'form[class="Post__comentario-form-container"] > input[type="text"]';
const COMMENT_BUTTON_POST_SELECTOR =
  'form[class="Post__comentario-form-container"] > button[type="submit"]';
const LAST_COMMENT_SELECTOR =
  'div[class="Post__comentarios-y-like"] > ul > li:last-child';
const LIST_COMMENTS_SELECTOR = 'ul[class="Post__comentarios"]';
const MAKE_RED_CLASS = "text-red-dark";

class PostPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickLike() {
    await this.page.waitForSelector(LIKE_BUTTON_SELECTOR); //Verificar que el selector está disponible
    await this.page.click(LIKE_BUTTON_SELECTOR);
  }

  async waitForStateLikeChange() {
    const heartElement = await this.page.waitForSelector(HEART_ICON_SELECTOR);

    const redHeart = await heartElement.evaluate((element, MAKE_RED_CLASS) => {
      return element.classList.contains(MAKE_RED_CLASS);
    }, MAKE_RED_CLASS);

    //Retorna una promesa
    //Promesa se va a resolver una vez que la condición sea true
    //Si en 30 segundos la condición no es true, la promesa es rechazada
    return this.page.waitForFunction(
      (HEART_ICON_SELECTOR, MAKE_RED_CLASS, redHeart) => {
        const newState = document
          .querySelector(HEART_ICON_SELECTOR)
          .classList.contains(MAKE_RED_CLASS); //Verificar que si la lista de clases de este elemento contiene la clase text-red-dark
        return newState !== redHeart;
      },
      {},
      HEART_ICON_SELECTOR,
      MAKE_RED_CLASS,
      redHeart
    );
  }

  async postComment(comment) {
    await this.page.type(COMMENT_INPUT_SELECTOR, comment);
    await this.page.click(COMMENT_BUTTON_POST_SELECTOR);
  }

  async waitForCommentDOM() {
    const listComments = await this.page.waitForSelector(
      LIST_COMMENTS_SELECTOR
    );

    const numComments = await listComments.evaluate((element) => {
      return element.children.length;
    });

    return await this.page.waitForFunction(
      (LIST_COMMENTS_SELECTOR, numComments) => {
        const newNumComments = document.querySelector(LIST_COMMENTS_SELECTOR)
          .children.length;
        return newNumComments > numComments;
      },
      {},
      LIST_COMMENTS_SELECTOR,
      numComments
    );
  }

  async getTextFromLastComment() {
    const lastComment = await this.page.waitForSelector(LAST_COMMENT_SELECTOR);
    //evaluate para inyectar javascript en el navegador
    return await lastComment.evaluate((comment) => {
      return comment.innerText;
    });
  }
}

module.exports = PostPage;
