const Producto=require('../entidades/producto').Producto
const validadorUtil=require('../../util/validatorUtil')

let reglasProd={ 
    nombre        :'required',
    categoria     :'required',
    fabricante    :'required',
    descripcion   :'required',
    imagen        :'required',
    precio        :'required|min:0',
    existencias   :'required|min:0'

}

exports.listarProductos=function(criterio){

    return new Promise (function(resolve,reject){
        //revisar el criterio de busqueda
        Producto.find(/*criterio */)
        .then(listadoProductos=>resolve(listadoProductos))
        .catch(error=>{
            console.log(error)
            reject({codigo:500, mensaje:"Error en la BD "})
        })
    })
}

exports.insertarProducto=function(producto, autoridad){

    return new Promise(function(resolve, reject){
        //validar el producto
        //isentar el producto
        //asignar una estanteria en el almace
        //

        if(autoridad.rol != "ADMIN"){
            reject({ codigo:403, mensaje: 'Solo los administradores pueden insertar productos'})
            return 
        }

        //se quita el id que venmga del producto //por si acaso se han hecho los graciosos enb postman
        delete producto._id

        if(!validadorUtil.validarObjeto(producto,reglasProd,reject)){
            return
        }
        //producto en MG Mongoose
        let productoMG =new Producto(producto)
        productoMG
            .save()
            .then(productoInsertado=>{
                resolve(productoInsertado)
            })
            .catch(error=>{
                console.log(error)
                reject({codigo:500, mensaje:"Error con la BD"})
            })
    })

}

exports.buscarProducto=function(idProducto){

    return new Promise (function(resolve,reject){

        //revisar el criterio de busqueda
        Producto.findById(idProducto)
        .then(productoEncontrado=>{
            if(!productoEncontrado){
                reject({ codigo:404, mensaje:"No existe un producto con ese id"})
                return
            }
            resolve(productoEncontrado)

        })
        .catch(error=>{
            console.log(error)
            reject({codigo:500, mensaje:"Error en la BD "})
        })
    })
}

///
let reglasProdModificacion={ 
    nombre      :'required|min:3|max:40',
    pw          :'required|min:5|max:15',
    direccion   :'required|min:3|max:200',
    telefono    :'required|min:3|max:40',
    correoE     :'required|email',


}

