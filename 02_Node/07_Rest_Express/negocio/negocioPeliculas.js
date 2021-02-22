//
//La lógica de negocio debe ser perfectamente ignorante 
//de que estamos tratando con una API REST
//
//Jamás envieremos aqui el request o el reponse
//

const ObjectId = require("mongodb").ObjectId
const mongoDBUtil = require("../util/mongoDBUtil")

exports.listarPeliculas = function(){

    //-Cuando creamos una promesa debemos proporcionarle una función dentro de la cual estárá
    // el código que se va a ejectutar.
    //-Esa función recibe por parámetro otras dos: resolve y reject 
    //-Resolve será la función que se le proporciona a la promesa con el 'then'
    //-Reject será la función que se le proporciona a la promesa con el 'catch'
    //-Esa función no tiene return
    return new Promise(function(resolve, reject){
        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        let cursor = coleccionPeliculas.find()
        cursor
            .toArray()
            .then(function(peliculas){
                resolve(peliculas)
            })
            .catch(function(err){
                console.log(err)
            })
    })

}

exports.buscarPelicula = function(idPelicula){

    return new Promise(function(resolve, reject){

        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        coleccionPeliculas
            .findOne( { _id : new ObjectId(idPelicula) } )
            .then(function(pelicula){
                if(!pelicula){
                    reject({ codigo:404, mensaje:"No existe una película con el id "+idPelicula })
                    return
                }
                resolve(pelicula)
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo:500 , mensaje:"Error al ejecutar la consulta"})
            })

    })
        





}

exports.insertarPelicula = function(pelicula){
    console.log("insertarPelicula (LN):",pelicula)

    return mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas") 
        .insertOne( pelicula )  
}

exports.modificarPelicula = function(pelicula){
    //Validar la película

    return mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .findOneAndUpdate( { _id : new ObjectId(pelicula._id) },
                    {
                        $set : {
                            titulo   : pelicula.titulo,
                            director : pelicula.director,
                            genero   : pelicula.genero,
                            year     : pelicula.year,
                            sinopsis : pelicula.sinopsis,
                        }
                    }
                    ,
                    {
                        returnOriginal : false,
                    })
}

exports.borrarPelicula = function(idPelicula){
    return mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .deleteOne( { _id : new ObjectId(idPelicula) } )
}
