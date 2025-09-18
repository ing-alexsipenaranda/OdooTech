const express = require('express')
const { getInvoices,getInvoiceById, createInvoice, deleteInvoiceById,updateInvoiceById} = require('../controllers/invoice.controller')
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roles");

express.Router()
const router = express.Router()
// INVOICE ROUTES CONECCION A ODOO
router.get('/invoices',authMiddleware,getInvoices)
router.get('/invoices/:id',authMiddleware,getInvoiceById)
router.post('/invoices',authMiddleware,roleMiddleware(['admin']),createInvoice)
router.delete('/invoices/:id',authMiddleware,roleMiddleware(['admin']),deleteInvoiceById)
router.put('/invoices/:id',authMiddleware,roleMiddleware(['admin']),updateInvoiceById)
module.exports = router;