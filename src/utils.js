const axios = require("axios");

export const getConfig = (arr) => {
  //obj has url, method, and data
  let config = {
    url: arr[0],
    method: arr[1],
    data: arr[2],
    baseURL: `${process.env.BASE_URL}`,
  };
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    if (Date.now() < user.exp) {
      config.headers = { Authorization: `Bearer: ${user.token}` };
    } else {
      // refreshToken()
      config.headers = { Authorization: `Bearer: ${user.token}` };
    }
  }
  console.log(config);
  return config;
};

const refreshToken = async () => {};