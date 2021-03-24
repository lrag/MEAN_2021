const https = require('https')
const http = require('http')
const fs = require('fs')
const express = require('express')
const mongoDBUtil = require('./util/MongoDBUtil')
const authRouter = require('./autenticacion/authRouter').router
const usuariosRouter = require('./rest/usuariosRest').router
const interceptorJWT = require('./autenticacion/interceptorJWT').interceptorJWT

mongoDBUtil.conectarBBDD()
.then((arrancarServidor))
.catch( function(error){
    console.log(error)
})

function arrancarServidor(){

    //Configuramos express
    let app = express()   
    app.use(express.json());

    //Interceptor LOG
    app.use(function(request,response,next){
        console.log("==========================================")
        console.log(`Peticion recibida: ${request.method} ${request.url}`)
        next()
    })

    app.use(function(request, response, next){
        console.log("------------------------------------------")
        console.log("Interceptor CORS")

        //Vamos a añadir estos headers a todas las respuestas que dedmos, sean options o no:
        response.header("Access-Control-Allow-Origin", "*")
        response.header('Access-Control-Allow-Methods', 
                        'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        response.header("Access-Control-Allow-Headers", 
                        "Origin, X-Requested-With, Content-Type, Accept, Authorization")  

        if(request.method.toUpperCase() == 'OPTIONS'){
            console.log("preflight detectado")
            response.statusCode = 202 //Accepted
            response.end()
            return
        }

        next()
    })

    //Interceptor que comprueba que venga un JWT
    app.use(interceptorJWT)

    app.use(authRouter)
    app.use(usuariosRouter)

    //Quitamos la publicidad
    app.disable('x-powered-by')

    console.log("Arrancando el servidor...")
    //Creamos el server utilizando el módulo 'https' y le proporcionamos
    //la función express y el certificado
    let cert = {
        key  : fs.readFileSync("./certificado/server.key"),
        cert : fs.readFileSync("./certificado/server.cert") 
    }
    https.createServer(cert, app).listen(6001, function(){
        console.log("Esperando peticiones https en el puerto 6001")
    })
  
}