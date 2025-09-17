const express = require('express')

express.Router()
const router = express.Router()

router.all('/about',(req,res,next)=>{
    console.log('About Page')
    res.send('About Page')
});

router.get('/dashboard',(req,res)=>{
    res.send('Dashboard Page')
})

router.get('/profile',(req,res)=>{
    res.send('Profile Page')
})
router.get('/',(req,res)=>{
    res.send('Home Page')
})
module.exports = router;