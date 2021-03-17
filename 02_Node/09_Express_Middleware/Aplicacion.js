const express = require("express")

let app = express()

//
//Funciones interceptoras: se van a ejecutar independientemente de la petición recibida
//
//Si se las damos a app las regristramos para todas las peticiones entrantes
//app.use(escribirLog)
//app.use(comprobarJWT)

app.use(interceptor1)
app.use(interceptor2)
app.use(interceptor3)

app.get("/peliculas", listarPeliculas)
app.get("/peliculas/:id", buscarPelicula)
app.post("/peliculas", insertarPelicula)
app.put("/peliculas/:id", modificarPelicula)
app.delete("/peliculas/:id", borrarPelicula)

app.disable('x-powered-by')

//
//Funciones interceptoras: se van a ejecutar independientemente de la petición recibida
//
//Estas funciones recibirán tres parámetros:
//-request  (obj)
//-response (obj)
//-next     (funcion)
//
//el parametro 'next' se utiliza para crear la cadena de interceptores
function escribirLog(request, response, next){
    console.log(`Peticion recibida: ${request.method} ${request.url}`)

    next()
}

function comprobarJWT(request, response, next){
    console.log('Comprobando si viene el JWT')
    let viene = true
    if(!viene){
        response.end("JWT INCORRECTO")
        return
    }
    next()
}

function interceptor1(reques,response,next){
    console.log("Interceptor 1 ANTES")
    next()
    console.log("Interceptor 1 DESPUES")
}
function interceptor2(reques,response,next){
    console.log("Interceptor 2 ANTES")
    next()
    console.log("Interceptor 2 DESPUES")
}
function interceptor3(reques,response,next){
    console.log("Interceptor 3 ANTES")
    next()
    console.log("Interceptor 3 DESPUES")
}

app.listen(7000, function(){
    console.log("Esperando peticiones en el puerto 7000")
})

////////////////////////
//FUNCIONES CON LA LC //
////////////////////////

function listarPeliculas(request, response){
    console.log("Listando las películas")
    response.end("listado de peliculas...")
}

function buscarPelicula(request, response){
    response.end("pelicula encontrada...")
}

function insertarPelicula(request, response){
    response.end("Pelicula insertada...")
}

function modificarPelicula(request, response){
    response.end("Pelicula modificada")
}

function borrarPelicula(request, response){
    response.end("Pelicula borrada")
}



