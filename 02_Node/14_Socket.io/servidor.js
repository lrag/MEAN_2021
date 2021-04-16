//npm install socket.io
const socketIO = require("socket.io")
const http = require("http")

//Usaremos expres para entregar el contenido estático y para...
const express = require("express")

//Configuramos el servidor web para entregar 'cliente.html'
let app = express()
app.use(express.static("./recursos"))
app.listen(80, function(){
    console.log("Esperando peticiones HTTP en el puerto 80")
})

//Socket.io no es una implementación de websockets (aunque lo utiliza y se parece mucho)
//
//Necesitamos abrir un puerto para recibir las solicitudes de conexión
//Para ello utilizamos el módulo 'http'
//
//Creamos un objeto server normal y corriente

const servidor = http.createServer(function(request,response){
})
servidor.listen(8000, function(){
    console.log("Esperando conexiones Socket.io en el puerto 8000")
})

//Una vez que disponemos de un objeto server escuchando en un puerto
//podemos crear la infraestructura de Socket.io
const io = socketIO(servidor)


//En socket.io todo funciona por EVENTOS

//Eventos en el servidor:
//-un cliente se ha conectado
//-un cliente se ha desconectado
//-un cliente nos ha enviado un mensaje

//io.on(<nombre_evento>, function manejadora de ese evento)

//Socket.io lleva 'la cuenta' de todas las conexiones abiertas con los
//distintos clientes
//Cuando se conecta uno nuevo nos pasan el socket por parámetro por si
//queremos hacer algo con el (queremos)

//Socket.io lleva 'la cuenta' de todas las conexiones abiertas con los
//distintos clientes
//Cuando se conecta uno nuevo nos pasan el socket por parámetro por si
//queremos hacer algo con el (queremos)
io.on('connection', function(socket){

    console.log("Nueva conexión")

})