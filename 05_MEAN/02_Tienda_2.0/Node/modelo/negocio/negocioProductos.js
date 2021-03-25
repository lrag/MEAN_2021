const Producto = require("../entidades/producto").Producto
const validadorUtil = require("../../util/validadorUtil")

let reglasProd = {
	nombre      : 'required',
	categoria   : 'required',
	fabricante  : 'required', 
	descripcion : 'required',
	imagen      : 'required',
	precio      : 'required|min:0',
	existencias : 'required|min:0'
}

//Los usuarios autenticados pueden listar productos
exports.listarProductos = function(criterio){

    return new Promise(function(resolve, reject){

        //revisar el criterio y adaptarlo a las necesidades de MongoDB...
        //...

        Producto.find( /*criterio*/ )
        .then( listadoProductos => resolve(listadoProductos))
        .catch( error => {
            console.log(error)
            reject({ codigo:500, mensaje:'¡Error en la base de datos!'}) 
        })      
    })
}

//Los usuarios autenticados pueden buscar productos
exports.buscarProducto = function(idProducto){

    return new Promise(function(resolve, reject){

        Producto.findById(idProducto)
        .then( productoEncontrado => {
            if(!productoEncontrado){
                reject({ codigo:404, mensaje:"No existe un producto con ese id"})
                return
            }
            resolve(productoEncontrado)
        })
        .catch( error => {
            console.log(error)
            reject({ codigo:500, mensaje:'¡Error en la base de datos!'}) 
        })      
    })
}

exports.insertarProducto = function(producto, autoridad){
    
    return new Promise(function(resolve, reject){

        if(autoridad.rol != "ADMIN"){
            reject({ codigo:403, mensaje: 'Solo los administradores pueden insertar productos'})
            return 
        }

        //Retiramos cualquier id que venga en el producto
        delete producto._id

        if(!validadorUtil.validarObjeto(producto, reglasProd, reject)){
            return
        }

        let productoMG = new Producto(producto)
        productoMG
            .save()
            .then( productoInsertado => {
                resolve(productoInsertado)
            })
            .catch( error => {
                console.log(error)
                reject({ codigo:500, mensaje:'¡Error en la base de datos!'})                
            })
    })

}