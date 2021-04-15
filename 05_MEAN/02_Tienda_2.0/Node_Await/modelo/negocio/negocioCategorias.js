
const Categoria = require("../entidades/categoria").Categoria

//Autorización: cualquier usuario autenticado puede listar las categorías
exports.listarCategorias = function(autoridad){
    return new Promise(async function (resolve, reject){
        try {
            resolve(await Categoria.find())
        } catch (error){
            console.log(error)
            reject({ codigo:500, mensaje:"Error en la base de datos!"})
        }
    })
}