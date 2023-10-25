const express = require('express')
const fs = require('fs')
const app = express()
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
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})