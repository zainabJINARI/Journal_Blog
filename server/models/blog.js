const mongoose = require('mongoose')

//creating a schema 
const blogSchema = new mongoose.Schema({
    title:String,
    description:String,
    content:String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})
module.exports=mongoose.model('Blog',blogSchema)