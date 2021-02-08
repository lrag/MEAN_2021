
const http = require("http")


/*API REST 


Película:

{
    _id      : 123, 
    titulo   : "",
    director : "",
    genero   : "",
    year     : 0
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
    } else if( metodo=="GET" && url.match("^/peliculas/[0-9]+$") ) {
        buscarPelicula(request, response)
    } else if( metodo="POST" && url=="/peliculas"){
        insertarPelicula(request, response)
    } else if( metodo="PUT" && url.match("^/peliculas/[0-9]+$") ){
        modificarPelicula(request, response)
    } else if( metodo="DELETE" && url.match("^/peliculas/[0-9]+$") ){
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
//-Invocar la función con la lógica de negocio
//
//-Si la lógica de negocio ha devuelto algo que le interesde al cliente configurar
// la respuesta para entregarlo
//
//-FIN

//GET /peliculas
function listarPeliculas(request, response){
    //Aqui haría falta un criterio de búsqueda (lo ignoramos)
    console.log("Listar películas")
}

//GET /peliculas/:id
function buscarPelicula(request, response){
    //aqui hace falta el id de la pelicula
    console.log("Buscar película")



}

//POST /peliculas
//CT: app/json
//-------------------------------
//{ pelicula }
function insertarPelicula(request, response){
    //aqui hace falta la peli
    console.log("Insertar película")
}

//PUT /peliculas/:id
//CT: app/json
//-------------------------------
//{ pelicula }
function modificarPelicula(request, response){
    //aqui hace falta la peli y el id
    console.log("Modificar película")
}

//DELETE /peliculas/:id
function borrarPelicula(request, response){
    //aqui hace falta el id de la pelicula
    console.log("Borrar película")
}



















