const Pedidos =require('../entidades/pedido').Pedido //objeto compelto
const validadorUtil=require('../../util/validatorUtil')

//validar si no es necesario en el servidor hacer este tipo de validaciones para el pedido
let reglasPed={ 
    codigo          :'required',
    fecha           :'required',
    estado          :'required',
    dirEntrega      :'required',
    fechaEntrega    :'required',
    cantidad        :'required|min:0', //no debe guardar con cantidad 0
    total           :'required|min:1'
    

}



//Cualquiera peude onsertar un pedido aunque solo lo puede solictar los usaurio con el ROL CLIENTE

exports.insertarPedidos=function(pedido){ //si tuviera y fuese necsario la autoridad que vien del request

    //se hace ocn inserOne 
    return new Promise(function(resolve, reject){
      
        //se quita el id que venmga del producto //por si acaso se han hecho los graciosos enb postman
        delete pedido._id
/*
//validaciones de pedidos con campos requeridos

        if(!validadorUtil.validarObjeto(pedido,reglasPed,reject)){
            return
        }
*/

//otra validacion para este tipo de pedidos sin detalle no
        if(pedido.detalles.length==0){
            reject({codigo:400, mensaje:'Existe un Error que no permite pedido sin Detalle'})
        return //validar si lleva esto
        }

        //varibale pediod de mongoose
        let pedidoMG = new Pedidos(pedido)
        pedidoMG
            .save()
            .then(pedidoInsertado=>{
                resolve(pedidoInsertado)
            })
            .catch(error=>{
                console.log(error)
                reject({codigo:500, mensaje:"Error con la BD con el pedido"})
            })
    })

}