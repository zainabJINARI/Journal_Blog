const mongoose = require('mongoose')

//creating a schema 
const blogSchema = new mongoose.Schema({
    title:String,
    description:String,
    content:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    img:
    {
        contentType:{
            type:String,
            required:true
        },
        imageBase64:{
            type:String,
            required:true
        }
    }
})
module.exports=mongoose.model('Blog',blogSchema)