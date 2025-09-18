const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sequelize = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express()


// ...
//BD Connection
sequelize.sync({ force: false }).then(async () => {
  console.log("DB conectada");

  // Usuario demo si no existe
  const user = await User.findOne({ where: { email: "admin@test.com" } });
  if (!user) {
    const hash = await bcrypt.hash("1234", 10);
    await User.create({ email: "admin@test.com", password: hash });
    console.log("Usuario demo creado: admin@test.com / 1234");
  }
});


//Importing Routes
const IndexRoutes = require('./routes/index')
const ProductsRoutes = require('./routes/product');
const ContactsRoutes = require('./routes/contact');
const InvoiceRoutes = require('./routes/invoice');  
const auth = require('./routes/auth');
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
app.use(auth)

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
