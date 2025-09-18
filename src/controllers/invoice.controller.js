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

// async function getInvoiceById(req,res){
//     const id = parseInt(req.params.id);
//     try{
//       const result = await callOdoo(
//         "account.move",
//         "search_read",
//         [["id","=",id]],
//         {
//           fields:["id","partner_id","amount_total","state"], limit:1
//         }
//       );
     
//     if (result.length > 0) {
//       res.json(result[0]);
//     } else {
//       res.status(404).json({ message: "Invoice not found" });
//     }

//     }catch(err){
//       res.status(500).json({error: err.message});
//     }
// }

async function getInvoiceById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const result = await callOdoo(
      "account.move",
      "search_read",
      [[["id", "=", id]]],
      {
        fields: ["id", "partner_id", "amount_total", "state"],
        limit: 1
      } 
    );
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
async function createInvoice(req, res) {
  try {
    const { partner_id, amount_total, state } = req.body;

    if (!partner_id || !amount_total || !state) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newInvoice = await callOdoo(
      "account.move",
      "create",
      [
        {
          partner_id,
          amount_total,
          state,
          move_type: "out_invoice", // Tipo de factura
        },
      ]
    );

    res.status(201).json({ id: newInvoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function updateInvoiceById(req,res){
  const id = parseInt(req.params.id)
  const{partner_id,amount_total, state}=req.body;

  try {
    const result = await callOdoo(
      "account.move",
      "write",
      [[id],{partner_id,amount_total,state}]
    );
    if(result){
      res.json({message: "Invoice Updated Succesfully"});
    }else{
      res.status(404).json({message: "Invoice not found or could not be updated"});
    }
  }catch{
    res.status(500).json({error: err.message})
  }

}
async function deleteInvoiceById(req,res){
    const id = parseInt(req.params.id);
  try{
    const result = await callOdoo(
      "account.move",
      "unlink",
      [[id]]
    );

        if (result) {
      res.json({ message: "Invoice deleted successfully" });
    } else {
      res.status(404).json({ message: "Invoice not found or could not be deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  
  }
}

module.exports = { getInvoices,createInvoice,getInvoiceById ,deleteInvoiceById, updateInvoiceById};

