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
async function getContactById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await callOdoo(
      "res.partner",
      "search_read",
      [[["id", "=", id]]],
      { fields: ["id", "name", "email"], limit: 1 }
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function createContact(req, res) {
  try {
    const { name, email } = req.body;
    const result = await callOdoo(
      "res.partner",
      "create",
      [{ name, email}]
    );

    res.status(201).json({ id: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function deleteContactById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await callOdoo(
      "res.partner",
      "unlink",
      [[id]]
    );

    if (!result) {
      return res.status(404).json({ error: "Contact not found or could not be deleted" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function updateContactById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const result = await callOdoo(
      "res.partner",
      "write",
      [[id], { name, email }]
    );

    if (!result) {
      return res.status(404).json({ error: "Contact not found or could not be updated" });
    }

    res.json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { getContacts,getContactById, createContact, deleteContactById, updateContactById };