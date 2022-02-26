const crypto = require("crypto");

const generateUser = () => {
  const username = `test${crypto.randomBytes(12).toString("hex")}`; //Generar data random. hex para que el username sea alfanúmerico

  return {
    email: `${username}@gmail.com`,
    name: "Test",
    username,
    bio: "Example",
    password: "password123",
  };
};

module.exports = {
  generateUser,
};
