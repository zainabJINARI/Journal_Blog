const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); // Assuming you've defined your Blog model

//routes
router.get('', async (req,res)=>{
    try {
        const blogs = await Blog.find();
        console.log(blogs)
         // Fetch all blogs from the database
        res.render('index', { blogs }); // Render the homepage template with blogs data
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})
router.get('/about',(req,res)=>{
    res.render('about')
})


//export the router 
module.exports = router