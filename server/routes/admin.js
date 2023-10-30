const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Blog = mongoose.model('Blog') // Assuming you've defined your Blog model
const User = require('../models/user')
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
router.post('/admin',(req,res)=>{
     const {username, password}= req.body
     console.log(username)
     console.log(password)
     res.redirect('/admin')
})

module.exports = router
