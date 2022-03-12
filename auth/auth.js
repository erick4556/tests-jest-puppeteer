const axios = require("axios").default;
const { API_SIGNIN_URL } = require("../config/urls");

const getTokenAndAuthData = async ({ email, password }) => {
  try {
    const response = await axios.post(API_SIGNIN_URL, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Usuario con email ${email} no pudo ser autenticado. ${e.name} : ${e.message}`
    );
  }
};

module.exports = getTokenAndAuthData;
