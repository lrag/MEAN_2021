let Pedido = require("../entidades/pedido").Pedido


//Cualquiera puede insertar un pedido, aunque solo lo solicitarán los usuarios con rol CLIENTE
exports.insertarPedido = function(pedido){
   return new Promise(function(resolve, reject){
        if(pedido.detalles.length == 0){
            reject({ codigo:400, mensaje:'Este pedido tiene menos detalles que el salpicadero de un Panda'})
            return
        }

        //Retiramos cualquier id que venga en el pedido
        delete pedido._id

        let pedidoMG = new Pedido(pedido)
        pedidoMG.save()
        .then( pedidoInsertado => resolve(pedidoInsertado) )
        .catch( error => {
            reject({ codigo:500, mensaje:'Error en la base de datos!'})
        })
    })
}