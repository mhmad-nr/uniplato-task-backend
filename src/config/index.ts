import path from "path";
require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env"),
})


export const API_PORT = process.env.API_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
