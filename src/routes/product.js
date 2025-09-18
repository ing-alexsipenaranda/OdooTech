const express = require('express')
const { getProducts,getProductById,createProduct, deleteProductById, updateProduct} = require('../controllers/product.controller')
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roles");
express.Router()
const router = express.Router()


router.get('/products',authMiddleware,getProducts)
router.get("/products/:id", authMiddleware, getProductById);
router.post('/products',authMiddleware,roleMiddleware(['admin']),createProduct)
router.delete("/products/:id",authMiddleware,roleMiddleware(['admin']), deleteProductById);
router.put("/products/:id",authMiddleware,roleMiddleware(['admin']), updateProduct);

module.exports = router;