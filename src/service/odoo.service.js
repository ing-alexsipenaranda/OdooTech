// src/service/odoo.service.js
const axios = require("axios");

const ODOO_URL = "https://odoo.ingalexsi.com/jsonrpc";
const DB = "postgress";
const UID = 2;
const API_KEY = "-"; // aquí puedes poner tu api key o password

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