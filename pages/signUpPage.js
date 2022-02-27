const EMAIL_SELECTOR = 'form > input[name="email"]';
const NAME_SELECTOR = 'form > input[name="nombre"]';
const USERNAME_SELECTOR = 'form > input[name="username"]';
const BIO_SELECTOR = 'form > input[name="bio"]';
const PASSWORD_SELECTOR = 'form > input[name="password"]';
const SUBMIT_BUTTON_SELECTOR = 'form > button[type="submit"]';
const BasePage = require("./basePage");
const FeedPage = require("./feedPage");

//Page Object Model (POM)
class SignUpPage extends BasePage {
  constructor(page) {
    super(page); //llamamos al constructor de la clase padre (BasePage)
  }

  async fillForm(user) {
    const emailInput = await this.page.$(EMAIL_SELECTOR);
    const nameInput = await this.page.$(NAME_SELECTOR);
    const usernameInput = await this.page.$(USERNAME_SELECTOR);
    const bioInput = await this.page.$(BIO_SELECTOR);
    const passwordInput = await this.page.$(PASSWORD_SELECTOR);

    await emailInput.type(user.email);
    // await this.page.type(EMAIL_SELECTOR, user.email);
    await nameInput.type(user.name);
    await usernameInput.type(user.username);
    await bioInput.type(user.bio);
    await passwordInput.type(user.password);
  }

  async clickSignUp() {
    const signUpButton = await this.page.$(SUBMIT_BUTTON_SELECTOR);
    await signUpButton.click();
    return new FeedPage(this.page);
  }
}

module.exports = SignUpPage;
