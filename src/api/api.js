import { logout } from "../redux/userSlice";
const axios = require("axios");

export default class Api {
  static async getConfig(arr) {
    //arr has url, method, and data
    let config = {
      url: arr[0],
      method: arr[1],
      baseURL: "https://development.api.teams.wethos.co/",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    };
    if (arr[2]) config.data = arr[2];
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      if (Date.now() < user.exp) {
        config.headers["Authorization"] = `Bearer ${user.access_token}`;
      } else {
        const newToken = await Api.refreshToken(user.refresh_token);
        config.headers["Authorization"] = `Bearer ${newToken}`;
      }
    }
    return config;
  }

  static async refreshToken(refresh) {
    return await axios
      .request({
        url: "oauth/token",
        method: "post",
        data: {
          client_id: 2,
          client_secret: "GjUJ5tqVliDdTadQDn4eQYQPUtLKjRLICu0qmrTR",
          grant_type: "refresh_token",
          refresh_token: refresh,
          scope: "*",
        },
        baseURL: "https://development.api.teams.wethos.co/",
      })
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...res.data,
            exp: Date.now() + res.data.expires_in,
          })
        );
        return res.data.access_token;
      })
      .catch((err) => {
        import("../redux/store").then((store) => {
          store.default.dispatch(logout());
        });
      });
  }
}
