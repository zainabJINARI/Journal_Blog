const express = require('express')
const mongoose = require('mongoose')


mongoose.set('strictQuery',false)
/*
when you perform queries using Mongoose,
 you can specify fields that are not defined in the schema,
  and Mongoose will not throw an error if these fields are present
   in the documents being queried. */
const fs = require('fs')
const app = express()

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const PORT = process.env.PORT || 3000
const CONNECTION = process.env.CONNECTION
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
        await mongoose.connect(CONNECTION);
        app.listen(PORT,()=>{
            console.log("server is running on port"+PORT)
        })
    }catch(e){
        console.log(e.message)
    }
}
start();