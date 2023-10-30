const express = require('express')
const mongoose = require('mongoose')
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')



const Blog = require('./models/blog')

mongoose.set('strictQuery',false)
/*
when you perform queries using Mongoose,
 you can specify fields that are not defined in the schema,
  and Mongoose will not throw an error if these fields are present
   in the documents being queried. */

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const PORT = process.env.PORT || 3000
const CONNECTION = process.env.CONNECTION
app.use(express.static('../public'));



//set a public folder 
app.use(express.static('public'))
app.use(expressLayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')

//link to the routes files 
app.use('/',require('./routes/main'))
app.use('/',require('./routes/admin'))

//storage 
//destionation is the folder in which they will store the files 


app.use((req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})


const start = async()=>{
    try{
        await mongoose.connect(CONNECTION);
        app.listen(PORT,()=>{
            console.log("server is running on port"+PORT)
        })
    }catch(e){
        console.log(e.message)
    }
}
start();