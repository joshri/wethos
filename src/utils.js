import { useState, useEffect } from "react";
const axios = require("axios");

//api?
export const getConfig = (arr) => {
  //obj has url, method, and data
  let config = {
    url: arr[0],
    method: arr[1],
    data: arr[2],
    baseURL: "https://development.api.teams.wethos.co/api/v2/",
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
  return config;
};

const refreshToken = async () => {};

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
  console.log(day);
  let newDate = new Date(day[0], day[1] - 1, day[2]).toDateString();
  console.log(newDate);
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

//my projects
export const projectTestData = [
  {
    id: "67690108895236096",
    slug: null,
    created_at: "2021-09-03 18:56:19",
    name: "Website Reboot",
    emoji: "sun_with_face",
    "sort-name": "Website Reboot",
    description: null,
    notes: null,
    status: "lead",
    backstop_at: null,
    expire_at: null,
    feedback_rounds: null,
    client_goals: null,
    general_terms: null,
    show_feedback_rounds: 0,
    show_client_goals: 0,
    show_general_terms: 0,
    show_invoice_schedule: 0,
    show_expire_at: 0,
    show_backstop_at: 0,
    show_deliverable_descriptions: 1,
    show_deliverable_prices: 1,
    show_deliverable_units: 1,
    show_phase_descriptions: 1,
    show_phase_prices: 1,
    teamlead_id: "22950",
    "sort-created_at": "2021-09-03 18:56:19",
    indexed_at: "2021-09-03 19:00:23",
    client_id: "67690106890358784",
    client_name: "Thomas Cruise",
    "sort-client_name": "Thomas Cruise",
    clientowner_id: "22950",
    clientowner: { name: "Joshua Israel", email: "joshisrael93@gmail.com" },
    checkpoints: ["lead"],
    specialists: [],
    price_total: 2165000,
    "sort-price_total": 2165000,
    teamlead: {
      id: "22950",
      first_name: "Joshua",
      last_name: "Israel",
      email: "joshisrael93@gmail.com",
      phone_number: null,
      created_at: "2021-09-03 18:37:39",
    },
  },
  {
    id: "67687549845508096",
    slug: null,
    created_at: "2021-09-03 18:46:09",
    name: "Website Refresh",
    emoji: "computer",
    "sort-name": "Website Refresh",
    description: null,
    notes: null,
    status: "lead",
    backstop_at: null,
    expire_at: null,
    feedback_rounds: null,
    client_goals: null,
    general_terms: null,
    show_feedback_rounds: 0,
    show_client_goals: 0,
    show_general_terms: 0,
    show_invoice_schedule: 0,
    show_expire_at: 0,
    show_backstop_at: 0,
    show_deliverable_descriptions: 1,
    show_deliverable_prices: 1,
    show_deliverable_units: 1,
    show_phase_descriptions: 1,
    show_phase_prices: 1,
    teamlead_id: "22950",
    "sort-created_at": "2021-09-03 18:46:09",
    indexed_at: "2021-09-03 18:46:22",
    client_id: "67687547102433280",
    client_name: "My First Client",
    "sort-client_name": "My First Client",
    clientowner_id: "22950",
    clientowner: { name: "Joshua Israel", email: "joshisrael93@gmail.com" },
    checkpoints: ["lead"],
    specialists: [],
    price_total: 1035000,
    "sort-price_total": 1035000,
    teamlead: {
      id: "22950",
      first_name: "Joshua",
      last_name: "Israel",
      email: "joshisrael93@gmail.com",
      phone_number: null,
      created_at: "2021-09-03 18:37:39",
    },
  },
  {
    id: "67690693031759872",
    slug: null,
    created_at: "2021-09-03 18:58:38",
    name: "Website Refresh",
    emoji: "computer",
    "sort-name": "Website Refresh",
    description: null,
    notes: null,
    status: "lead",
    backstop_at: null,
    expire_at: null,
    feedback_rounds: null,
    client_goals: null,
    general_terms: null,
    show_feedback_rounds: 0,
    show_client_goals: 0,
    show_general_terms: 0,
    show_invoice_schedule: 0,
    show_expire_at: 0,
    show_backstop_at: 0,
    show_deliverable_descriptions: 1,
    show_deliverable_prices: 1,
    show_deliverable_units: 1,
    show_phase_descriptions: 1,
    show_phase_prices: 1,
    teamlead_id: "22950",
    "sort-created_at": "2021-09-03 18:58:38",
    indexed_at: "2021-09-03 18:58:51",
    client_id: "67690691211431936",
    client_name: "It's Oprah Friggin Winfrey",
    "sort-client_name": "It's Oprah Friggin Winfrey",
    clientowner_id: "22950",
    clientowner: { name: "Joshua Israel", email: "joshisrael93@gmail.com" },
    checkpoints: ["lead"],
    specialists: [],
    price_total: 1035000,
    "sort-price_total": 1035000,
    teamlead: {
      id: "22950",
      first_name: "Joshua",
      last_name: "Israel",
      email: "joshisrael93@gmail.com",
      phone_number: null,
      created_at: "2021-09-03 18:37:39",
    },
  },
];
