require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
//help us to store our login cession so we don't have to log in everytime
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const Blog = require('./models/blog')
const User = require('./models/user')
const connectDB = require('./config/db');

mongoose.set('strictQuery',false)
/*
when you perform queries using Mongoose,
 you can specify fields that are not defined in the schema,
  and Mongoose will not throw an error if these fields are present
   in the documents being queried. */

const app = express()

// Connect to DB
connectDB();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())




const PORT = process.env.PORT || 3000
const CONNECTION = process.env.CONNECTION

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({ mongoUrl:CONNECTION }),
 }))
app.use(express.static('../public'));


//set a public folder 

app.use(expressLayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')

//link to the routes files 


//storage 
//destionation is the folder in which they will store the files 
app.use('/',require('./routes/main'))
app.use('/',require('./routes/admin'))

app.use((req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})




app.listen(PORT,()=>{
    console.log("server is running on port"+PORT)
})
   

