const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); // Assuming you've defined your Blog model

//routes
/* GET 
HOME
 */
router.get('', async (req,res)=>{
    
    try {
        let perPage = 8
        let page = req.query.page || 1
        //const data = await Blog.find()
        const data = await Blog.aggregate([ {$sort: {createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()

        const count = await Blog.count()
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage)

       
        res.render('index',{
            data,
            current:page,
            nextPage: hasNextPage ? nextPage : null
        })
         // Fetch all blogs from the database
       
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
