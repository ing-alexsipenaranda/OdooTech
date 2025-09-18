const express = require('express')
const { getContacts,getContactById,createContact,deleteContactById,updateContactById} = require("../controllers/contact.controller");

const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roles");

const router = express.Router();

router.get("/contacts",authMiddleware,getContacts);
router.get("/contacts/:id",authMiddleware, getContactById);
router.post("/contacts",authMiddleware,roleMiddleware(['admin']), createContact);
router.delete("/contacts/:id",authMiddleware,roleMiddleware(['admin']), deleteContactById);
router.put("/contacts/:id",authMiddleware,roleMiddleware(['admin']), updateContactById);


module.exports = router;