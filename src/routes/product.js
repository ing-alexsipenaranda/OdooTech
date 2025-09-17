const express = require('express')
const { getProducts } = require('../controllers/product.controller')

express.Router()
const router = express.Router()

productos = []
productos.push({id:1, name:'Producto 1'})
productos.push({id:2, name:'Producto 2'})
productos.push({id:3, name:'Producto 3'})


router.get('/products',getProducts)


router.get('/products/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)
    if(producto){
        res.json(producto)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})
router.post('/products',(req,res)=>{
    const newProduct = {
        id: productos.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    productos.push(newProduct)
    res.status(201).json(newProduct)
})
router.put('/products/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)
    if(producto){
        producto.name = req.body.name
        res.json(producto)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})
router.delete('/products/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id)
    if(index !== -1){
        const deletedProduct = productos.splice(index,1)
        res.json(deletedProduct)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

module.exports = router;