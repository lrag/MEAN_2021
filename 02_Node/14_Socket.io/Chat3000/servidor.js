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

const servidor = http.createServer(function(request,response){})
//const servidor = http.createServer(app)

//Una vez que disponemos de un objeto server escuchando en un puerto
//podemos crear la infraestructura de Socket.io
const io = socketIO(
    servidor,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    
servidor.listen(8000, function(){
    console.log("Esperando conexiones Socket.io en el puerto 8000")
})


//En este array guardaremos la lista de alias de los usuarios conectados
let aliasUsuarios = []

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

    socket.on("alias", aliasRecibido)
    socket.on("mensaje", nuevoMensaje)
    socket.on("disconnect", usuarioDesconectado)
})

function aliasRecibido(alias){
    //Estas funciones se asignan al socket
    //console.log(this)
    console.log("Alias recibido:"+alias)
    
    //Comprobamos que el alias no esté repetido
    let aliasRepetido = aliasUsuarios.find( elem => elem==alias )
    if(aliasRepetido){
        //Dentro de estas funciones 'this' es el socket
        this.emit('aliasRepetido','pues eso')
        return
    }

    aliasUsuarios.push(alias)
    console.log(aliasUsuarios)
    //Asociamos el alias al socket. Dentro de estas funciones 'this' es el socket
    this.alias = alias
    //Enviamos los alias a todos los que estén conectados
    io.emit("aliasUsuarios", JSON.stringify(aliasUsuarios))
} 

function nuevoMensaje(mensaje){
    console.log("Mensaje recibido:"+mensaje)

    //Para emitir un mensaje a un socket concreto utilizamos
    //socket.emit("","")

    //Para emitir un mensaje a todos los sockets que haya
    io.emit("mensaje", mensaje)
}

function usuarioDesconectado(){
    console.log("Usuario desconectado:"+this.alias)
    
    for(let a=0;a<aliasUsuarios.length;a++){
        //En esta función 'this' es el socket
        if(aliasUsuarios[a]==this.alias){
            aliasUsuarios.splice(a,1)
            break;
        }
    }  
    //Avisamos a todo el mundo de que la lista de usuarios ha cambiado    
    io.emit("aliasUsuarios", JSON.stringify(aliasUsuarios))
}



