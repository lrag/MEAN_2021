const http = require("http")
const fs   = require("fs")

//Variables globales
let statusCodes = {
    400 : "Petición icorrecta",
    404 : "El recurso solicitado no existe",
    405 : "Método HTTP no admitido"
}

let contentTypes = {
    html : "text/html",
    css  : "text/css",
    js   : "application/javascript"
}

//Definimos el servidor HTTP y lo arrancamos
let servidor = http.createServer(procesarPeticion)
servidor.listen(2000, function(){
    console.log("Esperando peticiones en el puerto 2000")
})

//Esta es la función que comenzará a procesar todas las peticiones
//Será ejecutada por el hilo del event loop
function procesarPeticion(request, response){

    let metodo = request.method.toUpperCase()
    let url = request.url
    console.log("==================================")
    console.log("Peticion recibida: "+metodo+" "+url)

    //Solo admitiremos peticiones GET
    if(metodo != "GET"){
        //
        devolverError(405,response)
        return
    }
    
    //A la url le quitaremos los query params...
    leerFichero(url, response)
}

//Leera el fichero y lo colocará en el body de la respuesta con response.end(contenido del fichero)
function leerFichero(ruta, response){

    let url = "./recursos"+ruta
    console.log("Buscando el recurso:"+ruta)
    let extension = url.split(".").pop() //Ya no hay stop

    fs.readFile(url, function(err, contenidoBuffer){
        if(err){
            //Para simplificar supondremos que hay un error es porque el fichero no existe
            //404
            devolverError(404,response)
            return
        }

        let contenido = contenidoBuffer.toString()
        response.setHeader("content-type", contentTypes[extension])
        response.end(contenido)
    })

}

function devolverError(statusCode, response){

    let mensaje = statusCodes[statusCode]

    let html = `
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1 align="center">
                    <font color="lightGreen">
                        WebServer 3000
                    </font>
                </h1>
                <h2 align="center">
                    <font color="lightBlue">
                        Se ha producido un error
                    </font>
                </h2>
                <h1 align="center">
                    <font color="red">
                        ${statusCode}
                    </font>
                    ${mensaje}
                </h1>
            </body>
        </html>`

    response.setHeader("content-type","text/html")
    response.end(html)
}


