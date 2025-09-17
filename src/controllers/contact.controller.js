// src/controllers/contact.controller.js
const { callOdoo } = require("../service/odoo.service");

async function getContacts(req, res) {
  try {
    const result = await callOdoo(
      "res.partner",
      "search_read",
      [[]],
      { fields: ["id", "name", "email"], limit: 10 }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getContacts };