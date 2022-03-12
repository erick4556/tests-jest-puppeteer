const VALID_CREDENTIALS = {
  email: "test@test.com",
  username: "test",
  password: "password123",
};

const INVALID_CREDENTIALS_EMAIL = {
  email: "test314@test.com",
  username: "test",
  password: "password123",
};

const INVALID_CREDENTIALS_PASSWORD = {
  email: "test@test.com",
  username: "test",
  password: "password9859",
};

const DONT_FOLLOW_ANYONE_AND_NO_PHOTOS_UPLOADED_CREDENTIALS = {
  email: "test2@test.com",
  username: "test2",
  password: "password123",
};

const USER_FOR_TESTING_POST_CREDENTIALS = {
  email: "user@test.com",
  username: "user",
  password: "password123",
};

module.exports = {
  VALID_CREDENTIALS,
  INVALID_CREDENTIALS_EMAIL,
  INVALID_CREDENTIALS_PASSWORD,
  DONT_FOLLOW_ANYONE_AND_NO_PHOTOS_UPLOADED_CREDENTIALS,
  USER_FOR_TESTING_POST_CREDENTIALS,
};
