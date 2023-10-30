const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog'); // Assuming you've defined your Blog model

const adminLayout='../views/layouts/admin'
/*
 * GET /
 * Admin-Login Page 
*/
router.get('/admin', async (req,res)=>{
    try {
        const locals = {
            title: 'Admin Page'
        }
        
        res.render('admin/login',{locals,layout: adminLayout})
        
      } catch (error) {
        console.error(error);
      }
})

module.exports = router
