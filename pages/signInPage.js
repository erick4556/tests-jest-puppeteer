const EMAIL_SELECTOR = 'form > input[name="email"]';
const PASSWORD_SELECTOR = 'form > input[name="password"]';
const SUBMIT_SIGNIN_BUTTON_SELECTOR = 'form > button[type="submit"]';
const BasePage = require("./basePage");
const FeedPage = require("./feedPage");

class SignInPage extends BasePage {
  constructor(page) {
    super(page); //llamamos al constructor de la clase padre (BasePage)
  }

  async fillSignInForm(user) {
    await this.page.type(EMAIL_SELECTOR, user.email);
    await this.page.type(PASSWORD_SELECTOR, user.password);
  }

  async clickSignIn() {
    await this.page.click(SUBMIT_SIGNIN_BUTTON_SELECTOR);
    return new FeedPage(this.page);
  }
}

module.exports = SignInPage;
