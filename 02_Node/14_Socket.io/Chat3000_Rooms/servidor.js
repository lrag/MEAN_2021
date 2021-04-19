//npm install socket.io
const socketIO = require("socket.io")
const http = require("http")

//Usaremos expres para entregar el contenido estático y para...
const express = require("express")

//Configuramos el servidor web para entregar 'cliente.html'
let app = express()
app.use(express.static("./recursos"))
//Creamos un API Rest para que los clientes listen las salas
//Las salas en socket io no tienen más que un nombre
let salas = [ "General", "Sala 1", "Sala 2", "Sala 3", "Sala 4" ]
app.get("/salas", function(request, response){
    response.json(salas)
})
//Arrancamos el servidor en el puerto 80
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

    //Rooms en socket.io
    //Identificadas con una cadena de texto
    //Los sockets pueden unirse a cualquier número de 'rooms' con socket.join('nombre_room')
    //Pueden abandonarlas con socket.leave('nombre_room')
    //
    //Para enviar un mensaje a todos los sockets que esten en un 'room':
    //io.to('nombre_room').emit('nombre_mensaje','mensaje)
    //Se pueden concatenar varias salas y así enviar un mensaje a los sockets de todas ellas
    //io.to('nombre_room_1').to('nombre_room_2').emit('nombre_mensaje','mensaje')

    //Para averiguar en cuantas 'rooms' está un socket podemos invocar socket.rooms
    //Devuelve un SET con todas las rooms

    //Nada mas crearse un socket este se añade a una 'room' en la que únicamente está él
    //El nombre de ese 'room' será el id del socket

    //Unimos a los nuevos usuarios a la sala 'General'
    //No hay que crear las salas. Unimos los sockets a ellas directamente
    socket.join("General")

    socket.on("alias", aliasRecibido)
    socket.on("mensaje", nuevoMensaje)
    socket.on("cambiarSala", cambiarSala)
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

    //Para emitir un mensaje a todos los sockets que haya o hayga
    //io.emit("mensaje", mensaje)

    //Para emitir un mensaje a una sala
    //io.to("sala").emit("evento","valor")

    for(let room of this.rooms){
        if(room != this.id){
            io.to(room).emit("mensaje", mensaje)
        }
    }

}

function cambiarSala(sala){

    //Dentro de esta función 'this' es el socket
    console.log("El usuario "+this.alias+" se cambia a la sala "+sala)

    //Comprobamos que la sala existe
    if( !salas.find( s => s==sala ) ){
        console.log("La sala no existe")
        return
    }

    //Sacamos al socket de las salas en las que esté
    //Los sockets saben en que salas están
    console.log("Antes",this.rooms)
    for(let room of this.rooms){
        //Todos los sockets están por defecto en una sala cuyo nombre coincide con su identificador
        if(room!=this.id){
            this.leave(room)
            let mensaje = JSON.stringify({ alias:"Chat3000", texto: this.alias+" ha abandonado la sala." })
            io.to(room).emit("mensaje", mensaje)
        }
    }
    //Avisamos a los usuarios de esa sala de que ha llegado otro
    let mensaje =JSON.stringify({ alias:"Chat3000", texto: this.alias+" se ha unido a la sala." })
    io.to(sala).emit("mensaje", mensaje)

    //Metemos al socket en la nueva sala
    this.join(sala)
    
    console.log("Despues",this.rooms)
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

    let mensaje =JSON.stringify({ alias:"Chat3000", texto: this.alias+" ha abandonado el chat." })
    io.emit("mensaje", mensaje)    
}

