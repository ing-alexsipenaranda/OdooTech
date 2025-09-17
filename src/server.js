const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express()

//Importing Routes
const IndexRoutes = require('./routes/index')
const ProductsRoutes = require('./routes/product');
const ContactsRoutes = require('./routes/contact');
const InvoiceRoutes = require('./routes/invoice');  
//SETTINGS
app.set('AppName','Odoo REST API')
app.set('port',3000)

//MIDDLEWARES
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use(IndexRoutes)
app.use(ProductsRoutes)
app.use(ContactsRoutes)
app.use(InvoiceRoutes)

// app.use(function(req,res,next){
//     console.log('Route:', req.url," Method: ", req.method)
//     next()
// })


//ROUTES
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// app.use(function(req,res,next){

//    if(req.query.login === 'contacto@ingalexsi.com'){
//       console.log('User Authenticated')
//       next()
//   }else{
//         res.status(401).send('Unauthorized')
//     }    
//  })

app.listen(app.get("port"),()=>{
    console.log(`Server ${app.get("AppName")} running on port ${app.get("port")}`)
})
