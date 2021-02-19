const http = require("http")
const negocioPeliculas = require("./negocioPeliculas.js")
const restUtil = require("./restUtil")
const mongoDBUtil = require("./mongoDBUtil") //No hace falta el .js
const servidorWeb = require("./servidorWeb")

//la función 'conectar' recibe como parámetro un callback que se invocará cuando la conexión
//se haya establecido

mongoDBUtil.conectar(arrancarServidor)

function arrancarServidor(){
    console.log("Creando el servidor...")
    http.createServer(procesarPeticion)
        .listen(3000, function(){
            console.log("Esperando peticiones en el puerto 3000")
        })
}
    
//En esta función haremos un triaje de la petición recibida
//La responsabilidad de esta funcion es averiguar quien procesará la petición


//API REST para las peliculas
/*
MÉTODO	URL			        BODY	FUNCIONALIDAD
-------------------------------------------------------------------
GET	    /peliculas		    -	    listar las películas
GET	    /peliculas/{id}  	-	    buscar a una película por su id
POST	/peliculas		    {json}	insertar la película
PUT 	/peliculas/{id}  	{json}  modificar la película
DELETE  /peliculas/{id}  	-	    borrar una película
*/

function procesarPeticion(request, response){

    let metodo = request.method.toUpperCase()
    let url    = request.url
    console.log("==================================")
    console.log("Peticion recibida: "+metodo+" "+url)    

    if( metodo=="GET" && url=="/peliculas"){
        listarPeliculas(request, response)
    } else if( metodo=="GET" && url.match("^/peliculas/[0-9a-fA-F]{24}$") ) {
        buscarPelicula(request, response)
    } else if( metodo=="POST" && url=="/peliculas"){
        insertarPelicula(request, response)
    } else if( metodo=="PUT" && url.match("^/peliculas/[0-9a-fA-F]{24}$") ){
        modificarPelicula(request, response)
    } else if( metodo=="DELETE" && url.match("^/peliculas/[0-9a-fA-F]{24}$") ){
        borrarPelicula(request, response)
    } else {
        servidorWeb.devolverContenidoEstatico(request, response)
    }
}

//////////////////////////////////////////////////////////////////
//Tareas a realizar por la lógica de control en un servicio REST//
//////////////////////////////////////////////////////////////////

//-Averiguar qué nos están pidiendo (esto ya lo hemos hecho arriba con los preciosos IF anidados)
//
//-Extraer de la petición los valores necesarios para procesarla
// Estos valores podrán venir como:
// -parametros en la query (?)
// -parámetros en el body 
// -parámetros en la url 
// -parámetros en el HEAD
// -un JSON en el body (o cualquier otro formato)
// -cualquier combinación de lo anterior
//
//-Invocar la función con la lógica de negocio. //
//
//-Si la lógica de negocio ha devuelto algo que le interesde al cliente configurar
// la respuesta para entregarlo
//
//-Y YA

//GET /peliculas
function listarPeliculas(request, response){
    console.log("Listar películas")
    //Aqui haría falta un criterio de búsqueda (lo ignoramos)
    negocioPeliculas
        .listarPeliculas()
        .then(function(peliculas){
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(peliculas))
        })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response, 500, "Error al listar las películas")
        })
}

//GET /peliculas/:id
//
//200 OK
//Content-Type : application/json
//-------------------------------
//{ pelicula }
//
//404 Not found
//Content-Type : application/json
//-------------------------------
//{ codigo:404, mensaje:"La pelicula solicitada no existe"}
//
//500 Internan server error
//Content-Type : application/json
//-------------------------------
//{ codigo:500, mensaje:"Error al buscar la pelicula."}
function buscarPelicula(request, response){
    console.log("Buscar película")
    //aqui hace falta el id de la pelicula
    //let id = request.url.substring(11)
    //let id = request.url.split("/")[2] 
    let id = request.url.split("/").pop() //Esto mejor
    negocioPeliculas
        .buscarPelicula(id)
        .then(function(pelicula){
            if(!pelicula){
                restUtil.devolverError(response, 404, "La película solicitada no existe")
                return
            }            
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify(pelicula))                     
        })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response, 500, "Error al buscar la película")
        })
}

//POST /peliculas
//CT: app/json
//-------------------------------
//{ pelicula }
//
//201 Created
//CT: app/json
//-------------------------------
//{ "_id" : "XXX" }
//O también:
//{ pelicula }
//
//400 Bad request
//CT: app/json
//-------------------------------
//{ codigo:400, mensaje:"Datos invalidos"}
//
//500...
function insertarPelicula(request, response){
    console.log("Insertar película (LC)")    
    //aqui hace falta la peli, que viene en el body
    //Por defecto no se lee el body porque puede ser enorme
    //Somos nosotros los que decidimos si se lee o no
    //Con 'request.on("data", callback)' ordenamos su lectura
    //'request.on' es una función ASINCRONA
    request.on("data", function(contenidoBody){
        let pelicula = JSON.parse(contenidoBody)
        negocioPeliculas
            .insertarPelicula(pelicula)
            .then( function(result){
                response.statusCode = 201
                response.setHeader("Content-Type","application/json")
                //Si queremos responder con solo el _id:
                //response.end(JSON.stringify( { _id : result.insertedId }) )
                //Si queremos responder con toda la película
                response.end(JSON.stringify( result.ops[0] ) )
            })
            .catch(function(err){
                console.log(err)
                restUtil.devolverError(response, 500, "Error al buscar la película")
            })
    })

}

//PUT /peliculas/:id
//CT: app/json
//-------------------------------
//{ pelicula }
//
//200 OK
//
//400 Bad request
//
//404 Not found
//
//500

function modificarPelicula(request, response){
    console.log("Modificar película (LC)")

    //aqui hace falta la peli y el id
    let id = request.url.split("/").pop()

    request.on("data", function(contenidoBody){
        
        let pelicula = null
        
        try {
            pelicula = JSON.parse(contenidoBody)
        } catch(error){
            console.log("No es un JSON!")
            restUtil.devolverError(response, 400, "Formato incorrecto: no es un json")
        }

        //Nos aseguramos de que la película que venía en el body tenga el id 
        //que venía en la ruta
        pelicula._id = id
        
        negocioPeliculas
        .modificarPelicula(pelicula)
        .then(function(result){
                //if(result.value == null){
                if(!result.value){
                    restUtil.devolverError(response,404,"No existe la película")
                    return
                }
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(result.value))
            })
        .catch(function(err){
            console.log(err)
            restUtil.devolverError(response, 500, "Error al modificar la película") 
        })
    })    
}

//DELETE /peliculas/:id
function borrarPelicula(request, response){
    console.log("Borrar película (LC)")
    //aqui hace falta el id de la pelicula
    let id = request.url.split("/").pop() 
    negocioPeliculas
        .borrarPelicula(id) 
        .then(function(result){
            //if 404
            response.end("OK")
        })
        .catch(function(err){
            restUtil.devolverError(response, 500, "Error al borrar la película") 
        })
}

