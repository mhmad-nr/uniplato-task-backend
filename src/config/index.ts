import path from "path";
require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env"),
})


export const API_PORT = process.env.API_PORT;
