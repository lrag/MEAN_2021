//const http=require('http')
const https= require('https')
const fs=require('fs')

//LIbreria de terceros
const express=require('express') //convertido ES6 que es con import


const mongooseDBUtil=require('./util/MongooseDBUtil')

const interceptorJWT = require('./autenticacion/interceptorJWT').interceptorJWT
const authRouter=require('./autenticacion/authRouter').router

const usuarioRouter=require('./rest/usuariosRest').router
const productosRouter=require('./rest/productosRest').router
const pedidosRouter=require('./rest/pedidosRest').router
//const express=require('express')
//trabajando con callback
//trabajando con promesas
//const bodyParser=require('body-parser') se ha deprecado 
//mongoDBUtil.conectarBBDD(arrancarSevidor) //con calback
mongooseDBUtil.conectarBBDD() //con calback
            .then((arrancarSevidor))
            .catch(function(error){
                console.log(error)
            })

      
function arrancarSevidor(){
 
   let app=express()
   app.use(express.json({
    limit:'5mb' //Aqui dfinimos el tamaño del boy que estamos dispuesto a leer
   }));
   //app.use(authRouter) //lo sustituimos el orden con los interceptores

/*
//manejo de optiones de peticiones
app.options("/usuarios", function(rq,rp,next){
    console.log('-Optiones--')
    rp.end("Hola que tal en Petcion de optiones Rec")
 
   })

*/

   //interceptor log
   app.use(function(request,response,next){
       console.log('----------------------------------------------------')
       console.log(`Petcion Recibida : ${request.method} ${request.url}`)
       next()
   })

app.use(function(request,response,next){
    console.log('----------------------------------------------------')
    console.log('---Interceptor CORS')

       //Vamos a añadir estos headers a todas las respuestas que dedmos, sean options o no:
       response.header("Access-Control-Allow-Origin", "*")
       response.header('Access-Control-Allow-Methods', 
                       'GET,PUT,POST,DELETE,PATCH,OPTIONS')
       response.header("Access-Control-Allow-Headers", 
                       "Origin, X-Requested-With, Content-Type, Accept, Authorization")  


    if (request.method.toUpperCase()=='OPTIONS'){
        console.log('----------------------------------------------------')
        console.log(`Petcion prefLighty detectada : `)

        response.statusCode = 202 //Accepted
        response.end()
        return
    }
    next()
})

/* de prueba para las opciones

   
*/
   //Interceptor de seguridad que comprueba a JSWT
   app.use(interceptorJWT)
   
   app.use(authRouter) 
   app.use(usuarioRouter) 
   app.use(productosRouter) 
   app.use(pedidosRouter) 
  

   //se quita la pblilcidad de base para la determinar con que trabjas
   app.disable('x-powered-by')

   
   console.log("..Arrancando el sevidor con Promesas y express")
    //Creamos el server utilizando el módulo 'https' y le proporcionamos
    //la función express y el certificado
    let cert = {
        key  : fs.readFileSync("./certificado/server.key"),
        cert : fs.readFileSync("./certificado/server.cert") 
    }
let puerto=7000
    https.createServer(cert, app).listen(puerto, function(){
        console.log("...Esperando peticiones https en el puerto: "+puerto)
    })
}
/*
    //Abrimos el puerto 80 para redirigir a https
        http.createServer(function(request, response){
            response.writeHead(301, {
                Location : 'https://localhost:6001/'+request.url
            });
            response.end();    
        }).listen(90, function(){
            console.log("Esperando peticiones http en el puerto 90")
        })    
    //validar que lo ultimo con el puerto 80fue eliminado=====?????


    }
*/