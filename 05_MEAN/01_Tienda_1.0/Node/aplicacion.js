const http = require('http')
const express = require('express')
const mongoDBUtil = require('./util/MongoDBUtil')
const usuariosRouter = require('./rest/usuariosRest').router

mongoDBUtil.conectarBBDD(arrancarServidor)
.then((arrancarServidor))
.catch( function(error){
    console.log(error)
})

function arrancarServidor(){
    let app = express()
   
    app.use(express.json());

    app.use(usuariosRouter)

    console.log("Arrancando el servidor...")
    http.createServer(app).listen(6001, function(){
        console.log("Esperando peticiones en el puerto 6001")
    })
}