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
async function getProductById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const result = await callOdoo(
      "product.template",
      "search_read",
      [[["id", "=", id]]],
      { fields: ["id", "name", "list_price"], limit: 1 }
    );

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function deleteProductById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const result = await callOdoo(
      "product.template",
      "unlink",
      [[id]]
    );

    if (result) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found or could not be deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function createProduct(req, res) {
    const { name, list_price } = req.body;
    try {
      const result = await callOdoo(
        "product.template",
        "create",
        [{ name, list_price }]
      );
      res.status(201).json({ id: result, message: "Product created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
async function updateProduct(req,res){
    const id = parseInt(req.params.id);
    const { name, list_price } = req.body;
    try {
      const result = await callOdoo(
        "product.template",
        "write",
        [[id], { name, list_price }]
      );
      if(result){
        res.json({ message: "Product updated successfully" });
      }else{
        res.status(404).json({ message: "Product not found or could not be updated" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
module.exports = { getProducts, getProductById, deleteProductById ,createProduct, updateProduct };
