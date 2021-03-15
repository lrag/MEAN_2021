const express = require("express")
const bodyParser = require("body-parser") //Ya viene incluido cuando hacemos npm install express
const mongoDBUtil = require("./util/mongoDBUtil")
const peliculasRouter = require("./rest/restPeliculas").router

mongoDBUtil.conectar(arrancarServidor)

function arrancarServidor(){    
    let app = express()
    
    //Vamos a usar el json body parser para todas las peticiones definidas en los router
    let jsonBodyParser = bodyParser.json()
    app.use(jsonBodyParser)
    app.use(express.static("./recursos"))

    //X-POWERED-BY
    app.disable('x-powered-by')

    app.use(peliculasRouter)  
    app.listen(5000, function(){
        console.log("Esperando peticiones en el puerto 5000")
    })
}




















