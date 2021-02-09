const http = require("http")
const negocioPeliculas = require("./negocioPeliculas.js")

/*API REST 

Película:

{
    _id      : 123, 
    titulo   : "",
    director : "",
    genero   : "",
    year     : 0,
    sinopsis : ""
}

MÉTODO	URL			        BODY	FUNCIONALIDAD
------------------------------------------------------------------
GET	    /peliculas		    -	    listar las pelicula
GET	    /peliculas/{id}  	-	    buscar una pelicula por su id
POST	/peliculas		    {json}	insertar la pelicula
PUT 	/peliculas/{id}  	{json}  modificar la pelicula
DELETE  /peliculas/{id}  	-	    borrar una pelicula
*/

http.createServer(procesarPeticion)
    .listen(3000, function(){
        console.log("Esperando peticiones en el puerto 3000")
    })

//En esta función haremos un triaje de la petición recibida
function procesarPeticion(request, response){

    let metodo = request.method.toUpperCase()
    let url    = request.url

    if( metodo=="GET" && url=="/peliculas"){
        listarPeliculas(request, response)
    } else if( metodo=="GET" && url.match("^/peliculas/[0-9a-fA-F]{25}$") ) {
        buscarPelicula(request, response)
    } else if( metodo="POST" && url=="/peliculas"){
        insertarPelicula(request, response)
    } else if( metodo="PUT" && url.match("^/peliculas/[0-9a-fA-F]{25}$") ){
        modificarPelicula(request, response)
    } else if( metodo="DELETE" && url.match("^/peliculas/[0-9a-fA-F]{25}$") ){
        borrarPelicula(reques, response)
    } else {
        //404 
    }
}

//                                                              //
//Tareas a realizar por la lógica de control en un servicio REST//
//                                                              //

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
//-Invocar la función con la lógica de negocio. 
//
//
//-Si la lógica de negocio ha devuelto algo que le interesde al cliente configurar
// la respuesta para entregarlo
//
//-FIN

//GET /peliculas
function listarPeliculas(request, response){
    console.log("Listar películas")
    //Aqui haría falta un criterio de búsqueda (lo ignoramos)
    negocioPeliculas.listarPeliculas()
}

//GET /peliculas/:id
function buscarPelicula(request, response){
    console.log("Buscar película")

    //aqui hace falta el id de la pelicula
    //let id = request.url.substring(11)
    //let id = request.url.split("/")[2] 
    let id = request.url.split("/").pop() //Esto mejor
    negocioPeliculas.buscarPelicula(id)
}

//POST /peliculas
//CT: app/json
//-------------------------------
//{ pelicula }
function insertarPelicula(request, response){
    console.log("Insertar película (LC)")    
    //aqui hace falta la peli, que viene en el body
    //Por defecto no se lee el body porque puede ser enorme
    //Somos nosotros los que decidimos si se lee o no
    //Con 'request.on("data", callback)' ordenamos su lectura
    //'request.on' es una función ASINCRONA
    request.on("data", function(contenidoBody){
        let pelicula = JSON.parse(contenidoBody)
        negocioPeliculas.insertarPelicula(pelicula)

    })

}

//PUT /peliculas/:id
//CT: app/json
//-------------------------------
//{ pelicula }
function modificarPelicula(request, response){
    console.log("Modificar película (LC)")
    //aqui hace falta la peli y el id
    request.on("data", function(contenidoBody){
        let pelicula = JSON.parse(contenidoBody)
        negocioPeliculas.modificarPelicula(pelicula)

    })    
}

//DELETE /peliculas/:id
function borrarPelicula(request, response){
    console.log("Borrar película")
    //aqui hace falta el id de la pelicula
    let id = request.url.split("/").pop() 
    negocioPeliculas.borrarPelicula(id)    
}



















