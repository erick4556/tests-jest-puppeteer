const BasePage = require("./basePage");
const FeedPage = require("./feedPage");

const BOX_SELECT_PHOTO_SELECTOR = 'label[class="Upload__image-label"]';
const TEXT_AREA_CAPTION_SELECTOR = 'textarea[name="caption"]';
const BUTTON_POST_SELECTOR = 'button[type="submit"]';
const IMAGE_TO_UPLOAD_SELECTOR = 'div[class="Upload__image-section"] > img';

class UploadPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async checkCorrectUploadPage() {
    await this.page.waitForSelector(BOX_SELECT_PHOTO_SELECTOR, {
      visible: true,
    });
    await this.page.waitForSelector(TEXT_AREA_CAPTION_SELECTOR, {
      visible: true,
    });
    await this.page.waitForSelector(BUTTON_POST_SELECTOR, {
      visible: true,
    });
  }

  async fillCaption(caption) {
    await this.page.waitForSelector(TEXT_AREA_CAPTION_SELECTOR);
    await this.page.type(TEXT_AREA_CAPTION_SELECTOR, caption);
  }

  async selectPhotoToUpload(imagePath) {
    await this.page.waitForSelector(BOX_SELECT_PHOTO_SELECTOR);
    //Devolver un array de los valores promesas que se resolvieron
    const [fileChooser, clickTest] = await Promise.all([
      this.page.waitForFileChooser(), //Prender el selector de archivos. Las respuesta llega al fileChooser
      this.page.click(BOX_SELECT_PHOTO_SELECTOR), //Hacer click en el selector de archivos. La respuesta llega el clickTest
    ]);

    await fileChooser.accept([imagePath]); //Puede aceptar muchos paths
  }

  async clickPostImage() {
    await this.page.waitForSelector(BUTTON_POST_SELECTOR);
    await this.page.click(BUTTON_POST_SELECTOR);
    return new FeedPage(this.page);
  }

  async checkIsReadyImageToUpload() {
    await this.page.waitForSelector(IMAGE_TO_UPLOAD_SELECTOR);
  }
}

module.exports = UploadPage;
