const Producto = require("../entidades/producto").Producto

//Autorización: cualquier usuario autenticado puede listar los fabricantes
exports.listarFabricantes = function(autoridad){
    return new Promise(async function (resolve, reject){
        try {
            resolve(await Producto.distinct("fabricante"))
        } catch (error){
            console.log(error)
            reject({ codigo:500, mensaje:"Error en la base de datos!"})
        }
    })
}