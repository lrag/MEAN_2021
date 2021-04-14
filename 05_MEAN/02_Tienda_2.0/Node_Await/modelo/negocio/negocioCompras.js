const Pedido = require("../entidades/pedido").Pedido
const Producto = require("../entidades/producto").Producto
const Factura = require("../entidades/factura").Factura
const validadorutil = require("../../util/validadorUtil")
const negocioPedidos = require("./negocioPedidos")

let reglasPedido = {
    dirEntrega   : 'required',
    formaPago    : 'required',
    fechaEntrega : 'required',
}

exports.comprar = function(pedido, autoridad){

    return new Promise(async function(resolve, reject){

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

        //Por cada detalle del pedido debemos:
        //-Comprobar que el producto exista (find, asíncrono)
        //-Reducir sus existencias (update, asíncono)
        //
        //No sabemos cuantos detalles hay!
        //
        //En un bucle creamos una promesa por cada detalle y las recopilamos en un array
        let total = 0

        let arrayDePromesas = []
        for(let detalle of pedido.detalles){

            let promesaProducto = new Promise(async function(resolve, reject){
                
                try{
                    //Buscamos el producto
                    console.log("Buscando:"+detalle.producto.nombre)
                    let productoEncontradoMG = await Producto.findById(detalle.producto._id)
                    if(!productoEncontradoMG){
                        reject({ codigo:400, mensaje:`No se pudo aceptar el pedido. El producto ${detalle.producto.nombre} no existe`})
                        return //pa no seguir
                    }
                    //Comprobamos si hay existencias
                    console.log("Comprobando las existencias del producto:"+detalle.producto.nombre)
                    if(productoEncontradoMG.existencias-detalle.cantidad < 0){
                        reject({ 
                                codigo:400, 
                                mensaje:`No se pudo aceptar el pedido.  Producto: ${detalle.producto.nombre}, Cantidad solicitada:${detalle.cantidad}, Existencias:${productoEncontradoMG.existencias}`,
                                info: { idProducto  : detalle.producto._id,
                                        cantidad    : detalle.cantidad,
                                        existencias : productoEncontradoMG.existencias }
                            })
                        return 
                    }
                    //Comprobamos que no se esten haciendo el listo con los precios
                    if(detalle.precio != productoEncontradoMG.precio){
                        reject({ codigo:400, mensaje:"Error con el precio del producto "+productoEncontradoMG.nombre})
                        return;
                    }

                    //Aumentamos el total
                    total += detalle.cantidad * productoEncontradoMG.precio
                    console.log("Total:"+total)
                    console.log("Reduciendo las existencias del producto:"+detalle.producto.nombre)
                    productoEncontradoMG.existencias -= detalle.cantidad //Con esto solo modificamos el objeto que está en la memoria
                    
                    //Modificamos el producto
                    await productoEncontradoMG.save() //Esto es asíncrono
                    resolve()
                } catch (error) {
                    console.log(error)
                    reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
                }
            })
            //Añadimos la promesa al array
            arrayDePromesas.push(promesaProducto)
            
        }
        
        try {
            //Esperamos a que se procesen todos los detalles
            await Promise.all(arrayDePromesas)
            console.log("Todos los detalles eran correctos") 
            console.log("Total:"+total)
            
            //Creamos la factura
            let facturaMG = new Factura()
            facturaMG.codigo = "FRA-"+Math.round(Date.now()/1000)   
            facturaMG.fecha = Date.now()  
            facturaMG.usuario = pedido.usuario
            facturaMG.total = total
            facturaMG.detalles = pedido.detalles   
            facturaMG.pedido = pedido   
            
            //insertamos la factura
            let facturaInsertada = await facturaMG.save()
            
            //preparar envío
            //enviar un correo electronico al cliente
            //...
            //FIN
            resolve({ mensaje : "Pedido aceptado", factura:facturaInsertada })
        } catch (error) {
            if(error.codigo){
                reject(error)
            } else {
                console.log(error)
                reject( { codigo:500, mensaje:'¡Error con la base de datos!'} )
            }
        }
        console.log("Salimos de la funcion 'negocioCompras.comprar'")
    })
}


