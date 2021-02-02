//
//En node podremos hacer cosas imposibles en el navegador
//-acceder al sistema de archivos
//-comunicarnos con otras aplicaciones (por ejemplo la BB.DD)
//-enviarle comandos al SO
//
//En node.js no disponemos de la mayoría de los objetos implícitos del navegador
//-document
//-window
//-alert
//-localStorage/sessionStorage
//-...
//
//Algunos si están:
//-console
//-JSON
//-...

//En Node.js la consola es la consola del sistema
console.log("Hola mundo")


//Módulos en node
const http = require("http")


let servidorHTTP = http.createServer( function(request, response){

    console.log("=======================================")
    console.log("Petición http recibida")
    //console.log(request)
    console.log(request.method)
    console.log(request.headers)
    console.log(request.url)

    let contenidoBody = "Gracias por su petición"
    response.end(contenidoBody)

} )

//Arrancamos el objeto server
//listen es una función asíncrona
servidorHTTP.listen(1000)

console.log("Esperando peticiones en el puerto 1000")






