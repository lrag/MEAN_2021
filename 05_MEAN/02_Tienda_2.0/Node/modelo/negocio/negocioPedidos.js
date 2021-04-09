let Pedido = require("../entidades/pedido").Pedido


//Cualquiera puede insertar un pedido, aunque solo lo solicitarán los usuarios con rol CLIENTE
//Aun así tenemos que comprobar que el usuario que está asociado al pedido coincide con el usuario 
//que envía la petición
exports.insertarPedido = function(pedido, autoridad){
   
    return new Promise(function(resolve, reject){
        
        if(autoridad.rol=="CLIENTE" && (pedido.usuario._id != autoridad._id)){
            reject({ codigo:403, mensaje:'Los clientes solo pueden insertar sus propios pedidos'})
            return 
        }

        if(!pedido.detalles || !Array.isArray(pedido.detalles) || (pedido.detalles.length == 0) ){
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

//Cualquiera puede modificar los pedidos pero si es un CLIENTE solo podrá modificar
//los suyos
exports.modificarPedido = function(pedido, autoridad){
    
    return new Promise(function(resolve, reject){

        if(autoridad.rol=="CLIENTE" && (pedido.usuario._id != autoridad._id)){
            reject({ codigo:403, mensaje:'Los clientes solo pueden modificar sus propios pedidos'})
            return 
        }

        if(!pedido.detalles || !Array.isArray(pedido.detalles) || (pedido.detalles.length == 0) ){
            reject({ codigo:400, mensaje:'Este pedido tiene menos detalles que el salpicadero de un Panda'})
            return 
        }

        Pedido.findByIdAndUpdate(pedido._id, pedido)
            .then( pedidoModificado => {
                if(!pedidoModificado){
                    reject({ codigo:404, mensaje:'No existe un pedido con ese id'})
                    return
                }
                resolve(pedidoModificado)
            })
            .catch( error => {
                reject({ codigo:500, mensaje:'Error en la base de datos!'})
            })

    })

}


//crear el componente ListadoPedidos
//crear una ruta al componente '/tienda/pedidos'
//el componente tendrá una tabla con los pedidos del usuario
//-añadir la funcion listarPedidos donde sea
//-GET /usuarios/XXX/pedidos <-----

//listar pedidos por usuario