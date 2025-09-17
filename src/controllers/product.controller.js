const { callOdoo } = require("../service/odoo.service");

async function getProducts(req, res) {
  try {
    const result = await callOdoo(
      "product.template",
      "search_read",
      [[]],
      { fields: ["id", "name", "list_price"], limit: 10 }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProducts };
