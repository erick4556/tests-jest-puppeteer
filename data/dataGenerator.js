const crypto = require("crypto");

const generateRandomString = () => {
  return crypto.randomBytes(12).toString("hex");
};

const generateUser = () => {
  const username = `test${generateRandomString()}`; //Generar data random. hex para que el username sea alfanúmerico

  return {
    email: `${username}@gmail.com`,
    name: "Test",
    username,
    bio: "Example",
    password: "password123",
  };
};

module.exports = {
  generateRandomString,
  generateUser,
};
