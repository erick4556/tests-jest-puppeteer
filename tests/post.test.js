const { makePageForAuth } = require("../pages/pages");
const { generateRandomString } = require("../data/dataGenerator");
const { POST_URL_EXIST } = require("../config/urls");
const { USER_FOR_TESTING_POST_CREDENTIALS } = require("../data/credentials");
const PostPage = require("../pages/postPage");

let context, postPage;
beforeEach(async () => {
  const pageConfig = {
    url: POST_URL_EXIST,
    credentials: USER_FOR_TESTING_POST_CREDENTIALS,
  };
  context = await makePageForAuth(pageConfig);
  postPage = new PostPage(context.page);
}, __TIMEOUT_INITIALIZE_BROWSER__);

afterEach(async () => {
  // await browser.close();
  await context.browser.close();
});

describe("Vista post de Clontagram", () => {
  test("Dar y quitar un like", async () => {
    //Dar like y verificar que el like se haya hecho
    await Promise.all([
      postPage.waitForStateLikeChange(),
      postPage.clickLike(),
    ]);

    //Quitar el like y verificar que el like se haya quitado
    await Promise.all([
      postPage.waitForStateLikeChange(),
      postPage.clickLike(),
    ]);
  });

  test("Puedo dejar un comentario en un post", async () => {
    const randomString = generateRandomString();

    await Promise.all([
      postPage.waitForCommentDOM(),
      postPage.postComment(randomString),
    ]);
    //Verificar que el comentario se haya hecho
    const lastComment = await postPage.getTextFromLastComment();
    expect(lastComment).toEqual(
      `${USER_FOR_TESTING_POST_CREDENTIALS.username} ${randomString}`
    );
  });
});
