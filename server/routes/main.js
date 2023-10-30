const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); // Assuming you've defined your Blog model
// blogs data
//routes
/* GET HOME  */
router.get('', async (req,res)=>{
    const locals = {
        title:'Home Page'
    }
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
            locals,
            current:page,
            nextPage: hasNextPage ? nextPage : null
        })
         // Fetch all blogs from the database
       
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})
/* GET ABOUT */
router.get('/about',async(req,res)=>{
    const locals = {
        title:'About Page'
    }
    const data = await Blog.aggregate([ {$sort: {createdAt: -1}}])
    res.render('about',{data,locals})
})

/* GET Blog:id */
router.get('/blog/:id', async (req,res)=>{
    try {
        let slug= req.params.id
        const data = await Blog.findById({_id:slug})
        const locals = {
            title: data.title
        }
        res.render('blog',{ data,locals})
        
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})



//export the router 
module.exports = router
