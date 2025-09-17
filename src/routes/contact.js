const express = require('express')
const { getContacts } = require("../controllers/contact.controller");

express.Router()
const router = express.Router()

router.get("/contacts", getContacts);

router.post('/contacts',(req,res)=>{
    const newContact = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
    // Here you would typically save the new contact to a database
    res.status(201).json(newContact)
})  
router.delete('/contacts/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    // Here you would typically delete the contact from a database
    res.json({message: `Contact with id ${id} deleted`})
})



module.exports = router;