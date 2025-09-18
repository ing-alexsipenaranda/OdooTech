// src/service/odoo.service.js
const axios = require("axios");
require('dotenv').config(); // opcional si ya lo hiciste en server.js

const ODOO_URL = process.env.ODOO_URL || "https://odoo.ingalexsi.com/jsonrpc";
const DB = process.env.ODOO_DB;
const UID = process.env.ODOO_UID;
const API_KEY = process.env.ODOO_API_KEY;

async function callOdoo(model, method, args = [], kwargs = {}) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [DB, UID, API_KEY, model, method, args, kwargs],
      },
      id: new Date().getTime(),
    };

    const { data } = await axios.post(ODOO_URL, body, {
      headers: { "Content-Type": "application/json" },
    });

    if (data.error) {
      throw new Error(JSON.stringify(data.error));
    }

    return data.result;
  } catch (err) {
    console.error("Error en llamada a Odoo:", err.message);
    throw err;
  }
}

module.exports = { callOdoo };