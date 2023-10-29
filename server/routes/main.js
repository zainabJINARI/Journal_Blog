const express = require('express')
const router = express.Router();


//routes
router.get('',(req,res)=>{
    const locals = {
        title:"something blog 1",
        description:"this is a blog demo nothing real "
    }
    res.render('index',locals)
})
router.get('/about',(req,res)=>{
    res.render('about')
})


//export the router 
module.exports = router