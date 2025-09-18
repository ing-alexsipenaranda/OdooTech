const { callOdoo } = require("../service/odoo.service");

async function getInvoices(req, res) {
  try {
    const result = await callOdoo(
      "account.move",
      "search_read",
      [[]],
      { fields: ["id", "partner_id", "amount_total", "state"], limit: 10 }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { getInvoices };

