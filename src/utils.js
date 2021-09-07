import { useState, useEffect } from "react";
import { logout } from "./redux/userSlice";
const axios = require("axios");

//api?
export const getConfig = async (arr) => {
  //arr has url, method, and data
  let config = {
    url: arr[0],
    method: arr[1],
    baseURL: "https://development.api.teams.wethos.co/",
  };
  if (arr[2]) config.data = arr[2];
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    if (Date.now() < user.exp) {
      config.headers = { Authorization: `Bearer: ${user.token}` };
    } else {
      const newToken = await refreshToken(user.refresh_token);
      config.headers = { Authorization: `Bearer: ${newToken}` };
    }
  }
  return config;
};

const refreshToken = async (refresh) => {
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
      import("./redux/store").then((store) => store.dispatch(logout()));
    });
};

//convert project total price to readable string
export const priceString = (price) => {
  return (price / 100)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//convert date to readable string
export const dateString = (date) => {
  date = date.split(" ");
  const day = date[0].split("-");
  //the minus one is there because for some reason 09 was returning Oct?!
  let newDate = new Date(day[0], day[1] - 1, day[2]).toDateString();
  newDate = newDate.split(" ");
  newDate[2] += ",";
  return `${newDate[1]} ${newDate[2]} ${newDate[3]}`;
};

//responsive breakpoint layouts
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
