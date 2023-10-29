const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.set('strictQuery',false)
/*
when you perform queries using Mongoose,
 you can specify fields that are not defined in the schema,
  and Mongoose will not throw an error if these fields are present
   in the documents being queried. */
const fs = require('fs')
const app = express()
const PORT = process.env.PORT
app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain')
    var d= new Date()
    console.log(req.query.Name)
    //console.log(req.originalUrl)
    //console.log(req.get('host'))

    
    //termine la réponse HTTP sans envoyer des données
    res.end(d.toString()+'Bonjour')
})
app.use((req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})


const start = async()=>{
    try{
        await mongoose.connect('mongodb+srv://zainabjinari:PnLBSm1LawoQw9en@cluster0.zmyj8km.mongodb.net/?retryWrites=true&w=majority');
        app.listen(PORT,()=>{
            console.log("server is running on port"+PORT)
        })
    }catch(e){
        console.log(e.message)
    }
}
start();