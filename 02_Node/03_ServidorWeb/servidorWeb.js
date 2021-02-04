const http = require("http")
const fs   = require("fs")

//Definimos el servidor HTTP y lo arrancamos
let servidor = http.createServer(procesarPeticion)
servidor.listen(2000, function(){
    console.log("Esperando peticiones en el puerto 2000")
})

//Esta es la función que comenzará a procesar todas las peticiones
//Será ejecutada por el hilo del event loop
function procesarPeticion(request, response){

    let url = request.url
    console.log("==================================")
    console.log("Peticion recibida:"+url)

    //Solo admitiremos peticiones GET
    if(request.method.toUpperCase() != "GET"){
        //
        response.statusCode = 405
        response.end("Method Not Allowed")
        return
    }
    
    //Esto es temporal
    if(url == "/favicon.ico"){
        response.statusCode = 404
        response.end("Not found")
        return        
    }
    
    //A la url le quitaremos los query params...
    leerFichero(url, response)

    

}


//Leera el fichero y lo colocará en el body de la respuesta con response.end(contenido del fichero)
function leerFichero(ruta, response){

    response.end("OK")


}


