require('dotenv').config()
const express = require('express')
const fs = require('fs')
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

//multer middle ware :
const store = require('../middlewares/multer')

/* Check login */
/*This middleware is used to prevent users to go to some pages directly using 
 * route  
 */
const authMiddleware = (req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message:'Unauthorized'})
  }
  try{
    const decoded = jwt.verify(token,jwtSecret)
    req.userId = decoded.userId
    next()
  }catch(e){
    return res.status(401).json({ message:'Unauthorized'})
  }
}




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
    //to save the password you don't need to login all the times
    const token = jwt.sign({ userId: user._id}, jwtSecret)
    res.cookie('token',token, {httpOnly: true})
    res.redirect('/admin_dash')
    
   
    
})


router.get('/admin_dash',authMiddleware,async (req,res)=>{
  const locals = {
    title: 'Admin Dashboard'
  }
  const data = await Blog.find()
  res.render('admin/admin_dash',{data,locals,layout: adminLayout})
})


router.post('/add-blog',authMiddleware,store.single('imageBlog'),async (req,res,next)=>{
  const {title,description,content}=req.body
  const imageBlog= req.file
  let img = fs.readFileSync(imageBlog.path)
  encoded_image = img.toString('base64')
  
  try {
    const blog = await Blog.create({title,description,content,img:{contentType:imageBlog.mimetype,imageBase64:encoded_image}})
    res.redirect('/admin_dash')
    //res.status(201).json({message:'Blog created seccessfully'})
  } catch (error) {
    console.log('error in blog creation ')
    console.log(error.message)
  }
})




router.get('/admin_dash/edit-blog/:id',authMiddleware,async(req,res)=>{
  const locals = {
    title: 'Update Blog'
  }
  let slug= req.params.id
  const data = await Blog.findById({_id:slug})
  res.render('admin/edit-blog',{data,locals,layout: adminLayout})
})




router.put('/admin_dash/edit-blog/:id',authMiddleware,store.single('imageBlog'),async (req,res)=>{
 
  try {
    const imageBlog= req.file
    if(!imageBlog){
      await Blog.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        updatedAt:Date.now()
      })


    }else{
      let img = fs.readFileSync(imageBlog.path)
      encoded_image = img.toString('base64')
      await Blog.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        updatedAt:Date.now(),
        img:{contentType:imageBlog.mimetype,
          imageBase64:encoded_image
        }
      })
    }
    
    res.redirect('/admin_dash')
    
  } catch (error) {
    console.log('error in editing ')
    console.log(error.message)
  }
})



router.delete('/admin_dash/delete-blog/:id',authMiddleware,async (req,res)=>{
 
  try {
   
    await Blog.deleteOne({_id:req.params.id})
    res.redirect('/admin_dash')
    
  } catch (error) {
    console.log('error in deleting ')
  }
})




router.get('/logout',(req,res)=>{
  res.clearCookie('token')
  res.redirect('/admin')
})



router.get('/add-blog',authMiddleware,(req,res)=>{
  const locals = {
    title: 'Add Blog'
  }
  res.render('admin/add-blog',{locals,layout: adminLayout})
})

router.post('/search',authMiddleware, async(req,res)=>{
  const locals ={
    title:'Search'
  }
  const search =req.body.search
  try {
    // Split the search term into words
    const searchTerms = search.split(' ');

    // Create an array to store regex patterns for each search term
    const regexPatterns = searchTerms.map(term => new RegExp(term, 'i'));

    const data = await Blog.find({
      $or: [
          // Match any of the regex patterns in the title field
            { title: { $in: regexPatterns } },

          // Match any of the regex patterns in the description field
            { description: { $in: regexPatterns } }
        ]
    });

    console.log(data)
    res.render('admin/search',{locals,data,layout:adminLayout})

  } catch (error) {
    console.log('error in search')
  }
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
