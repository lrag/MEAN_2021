const mongoDBUtil = require("./MongoDBUtil")
const ObjectID = require("mongodb").ObjectID


exports.buscarProducto = function(idProducto){
    return new Promise(function(resolve, reject){ 
    
        mongoDBUtil.esquema.collection("productos").findOne( { _id : new ObjectID(idProducto) })
        .then( productoEncontrado => {
            if(!productoEncontrado){
                reject("El producto no existe")
                return
            }
            resolve(productoEncontrado)
        })
        .catch(error => {
            console.log(error)
            reject("ZASCA!")
        })

    })
}

exports.buscarProducto_await = function(idProducto){
    
    //Las funciones que incluyan 'await' deben ser 'async'
    //Las funciones 'async' devuelven automáticamente una promesa
    return new Promise(async function(resolve, reject){ 
        
        let producto = await mongoDBUtil.esquema.collection("productos").findOne( { _id : new ObjectID(idProducto) })
        if(!producto){
            reject("No existe el producto")
            return
        }
        resolve(producto)

    })
    
}

