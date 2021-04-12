const Pedido = require("../entidades/pedido").Pedido
const Producto = require("../entidades/producto").Producto
const validadorutil = require("../../util/validadorUtil")
const negocioPedidos = require("./negocioPedidos")

let reglasPedido = {
    dirEntrega   : 'required',
    formaPago    : 'required',
    fechaEntrega : 'required',
}

exports.comprar = function(pedido, autoridad){

    return new Promise(function(resolve, reject){

        //Validamos que tenga los datos necesarios
        if(!validadorutil.validarObjeto(pedido, reglasPedido, reject)){
            //Si el objeto no es válido nuestra función 'validarObjeto' ya ha hecho el reject
            return
        }

        //Comprobamos que el pedido corresponde al cliente
        if(autoridad.rol=="CLIENTE" && (pedido.usuario._id != autoridad._id)){
            reject({ codigo:403, mensaje:'Los clientes solo pueden insertar sus propios pedidos'})
            return 
        }

        //Si el pedido no está guardado se rechaza la peticion
        /*
        if(!pedido._id){
            reject({ codigo:404, mensaje:'El pedido debe estar insertado'})
            return 
        }
        */

        //Por cada detalle del pedido debemos:
        //-Comprobar que el producto exista (find asíncrono)
        //-Reducir sus existencias (update asíncono)
        //
        //No sabemos cuantos detalles hay!
        //
        //En un bucle creamos una promesa por cada detalle y las recopilamos en un array

        let arrayDePromesas = []

        for(let detalle of pedido.detalles){
            //console.log("Examinando :"+detalle.producto._id)
            let promesa = Producto.findById(detalle.producto._id)
            
            promesa.then( producto => {
                if(!producto){
                    console.log("No existe el producto "+detalle.producto.nombre)
                } else {
                    console.log("Existencias del producto "+detalle.producto.nombre+": "+producto.existencias)
                }
            })
            arrayDePromesas.push(promesa)
            
        }

        //
        Promise.all(arrayDePromesas)
        .then( () => console.log("YA") )
        .catch( () => console.log("MAL!") )

        /////////////////////////
        //ESTO HAY QUE QUITARLO//
        /////////////////////////
        console.log("Salimos de la funcion")
        resolve({ mensaje : "OK" })


    })


}




      
/*

tareaAsincrona1
tareaAsincrona2
tareaAsincrona3
tareaAsincrona4

tareaAsincrona1
    .then(
        ...
        return tareaAsincrona2
    )
    .then(
        ...
        return tareaAsincrona3
    )
    .then(
        ...
        return tareaAsincrona4
    )


tareaAsincrona1
tareaAsincrona2
tareaAsincrona3

tareaAsincrona1
tareaAsincrona2
tareaAsincrona3
tareaAsincrona4


tareaAsincrona1
    .then(
        ...
        return tareaAsincrona2
    )
    .then(
        ...
        if(condicion)
            return tareaAsincrona3
        else
            return
    )
    .then(
        ...
        return tareaAsincrona4
    )




*/








