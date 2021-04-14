//Módulos estandard
const https = require('https')
const fs = require('fs')

//Librerías de terceros
const express = require('express')

//Ficheros nuestros
const mongooseDButil = require('./util/MongooseDBUtil')

const interceptorJWT = require('./autenticacion/interceptorJWT').interceptorJWT
const authRouter     = require('./autenticacion/authRouter').router

const usuariosRouter  = require('./rest/usuariosRest').router
const productosRouter = require('./rest/productosRest').router
const pedidosRouter   = require('./rest/pedidosRest').router
const comprasRouter   = require('./rest/comprasRest').router

mongooseDButil.conectarBBDD()
.then(arrancarServidor)
.catch( function(error){
    console.log(error)
})

function arrancarServidor(){

    //Configuramos express
    let app = express()   
    app.use(express.json({
        limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer
    }));

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
    app.use(productosRouter)
    app.use(pedidosRouter)
    app.use(comprasRouter)

    //Quitamos la publicidad
    app.disable('x-powered-by')

    console.log("Arrancando el servidor...")
    //Creamos el server utilizando el módulo 'https' y le proporcionamos
    //la función express y el certificado
    let cert = {
        key  : fs.readFileSync("./certificado/server.key"),
        cert : fs.readFileSync("./certificado/server.cert") 
    }
    https.createServer(cert, app).listen(7000, function(){
        console.log("Esperando peticiones https en el puerto 7000 (await)")
    })
  
}