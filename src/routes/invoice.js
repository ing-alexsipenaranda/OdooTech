const express = require('express')
const { getInvoices } = require('../controllers/invoice.controller')

express.Router()
const router = express.Router()
// INVOICE ROUTES CONECCION A ODOO
router.get('/invoices',getInvoices)
router.post('/invoices',(req,res)=>{
    const newInvoice = {
        id: Date.now(),
        customer: req.body.customer,
        amount: req.body.amount,
        status: req.body.status
    }
    // Here you would typically save the new invoice to a database
    res.status(201).json(newInvoice)
})


module.exports = router;