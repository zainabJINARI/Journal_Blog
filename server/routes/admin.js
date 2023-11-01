require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Blog = mongoose.model('Blog') // Assuming you've defined your Blog model
const User = mongoose.model('User')
const adminLayout='../views/layouts/admin'
//this is will help us decript the password so we can store it in the db
const bcrypt = require('bcrypt')
//you should store plain text passwords in ur db 
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
/*
 * GET /
 * Admin-Login Page 
*/


router.get('/admin', async (req,res)=>{
  
    try {
        const locals = {
            title: 'Admin Login'
        }
        
        res.render('admin/login',{locals,layout: adminLayout})
        
      } catch (error) {
        console.error(error);

      }
})
// check login 
router.post('/admin',async (req,res)=>{
    const {username, password}= req.body
    const user = await User.findOne({ username })
    if(! user){
      res.send('Invalid credentials')
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if (!isPasswordValid){
      res.send('Invalid Credentials')
    }
    const token = jwt.sign({ userId: user._id}, jwtSecret)
    res.cookie('token',token, {httpOnly: true})
    res.redirect('/admin_dash')
    
   
    
})
router.get('/admin_dash',(req,res)=>{
  const locals = {
    title: 'Admin Dashboard'
}
  res.render('admin/admin_dash',{locals,layout: adminLayout})
})

module.exports = router

/**
 * Here the code for register : 
 * 
 * let  hashedPassword
    try{
      hashedPassword  = await bcrypt.hash(password,10)
    }catch(e){
        console.log('error with hasshing ')
    }
    try {
      const user = await User.create({username, password:hashedPassword})
      res.status(201).json({message:'User Created',user})
    } catch (error) {
      if(error.code === 11000){
        res.status(409).json({message:'User already in use'})
      }
      res.status(500).json({message:'Internal server error'})
    }
 * 
 */
