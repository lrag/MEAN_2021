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
        console.log("listarPeliculas (LN)")

        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        let cursor = coleccionPeliculas.find()
        cursor
            .toArray()
            .then(function(peliculas){
                resolve(peliculas)//Bien
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo: 500, mensaje:"¡Error con la base de datos!"})//Mal
            })
    })

}

exports.buscarPelicula = function(idPelicula){

    return new Promise(function(resolve, reject){        
        console.log("buscarPelicula (LN):",idPelicula)

        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        coleccionPeliculas
            .findOne({ _id : new ObjectId(idPelicula) })
            .then(function(pelicula){
                if(!pelicula){
                    reject({ codigo:404, mensaje:'No existe una película con el id '+idPelicula}) //Mal
                    return
                }
                resolve(pelicula) //Bien
            })
            .catch(function(err){
                reject({ codigo: 500, mensaje:"¡Error con la base de datos!"})//Mal
            })
    })
}

exports.insertarPelicula = function(pelicula){
    
    return new Promise(function(resolve, reject){
        console.log("insertarPelicula (LN):",pelicula)

        //VALIDAR...

        //Le quitamos el id a la pelicula por si alguien se está haciendo el listo
        //Si no lo hicieramos desde fuera del servidor se podría decidir el valor de los ids
        delete pelicula._id

        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        coleccionPeliculas
            .insertOne(pelicula)
            .then(function(resultado){
                resolve(resultado.ops[0])//Bien
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo:500, mensaje:"¡Error en la base de datos"})//Mal
            })
    })
}

exports.modificarPelicula = function(pelicula){

    return new Promise(function(resolve, reject){
        console.log("modificarPelicula (LN):",pelicula)    

        //Validar la película

        mongoDBUtil
            .esquemaPeliculas
            .collection("peliculas")
            .findOneAndUpdate( 
                    { _id : new ObjectId(pelicula._id) },
                    {
                        $set : {
                            titulo   : pelicula.titulo,
                            director : pelicula.director,
                            genero   : pelicula.genero,
                            year     : pelicula.year,
                            sinopsis : pelicula.sinopsis,
                        }
                    },
                    {
                        returnOriginal : false,
                    })
            .then(function(commandResult){
                console.log(commandResult)
                if(!commandResult.value){
                    reject({ codigo:404, mensaje:"No existe una pelicula con el id "+pelicula._id})//Mal
                    return
                }
                resolve(commandResult.value)//Bien
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo:500, mensaje:"¡Error en la base de datos"})//Mal
            })
    })

}

exports.borrarPelicula = function(idPelicula){

    return new Promise(function(resolve, reject){
        console.log("borrarPelicula (LN):",idPelicula)          
        
        mongoDBUtil
            .esquemaPeliculas
            .collection("peliculas")
            .deleteOne( { _id : new ObjectId(idPelicula) } )
            .then( function(commandResult){                
                if(commandResult.deletedCount==0){
                    reject({ codigo:404, mensaje:"No existe una película con el id "+idPelicula})
                    return 
                }
                resolve() //Bien!
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo:500, mensaje:"¡Error en la base de datos"})//Mal
            })

    })

}
