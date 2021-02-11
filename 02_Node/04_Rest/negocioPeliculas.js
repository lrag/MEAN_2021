//
//La lógica de negocio debe ser perfectamente ignorante 
//de que estamos tratando con una API REST
//
//Jamás envieremos aqui el request o el reponse
//

const ObjectId = require("mongodb").ObjectId
const mongoDBUtil = require("./mongoDBUtil")

exports.listarPeliculas = function(){
    let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
}

exports.buscarPelicula = function(idPelicula){
    let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
    //Cuidado que _id tiene como valor ObjectId
    //return coleccionPeliculas.findOne( { _id : idPelicula })
    return coleccionPeliculas.findOne( { _id : new ObjectId(idPelicula) })
}

exports.insertarPelicula = function(pelicula){
    //insert
    console.log("insertarPelicula (LN):",pelicula)

    //Validar que la película es correcta

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
        .updateOne( { _id : new ObjectId(pelicula._id) },
                    {
                        $set : {
                            titulo   : pelicula.titulo,
                            director : pelicula.director,
                            genero   : pelicula.genero,
                            year     : pelicula.year,
                            sinopsis : pelicula.sinopsis
                        } 
                        // 
                    })
}

exports.borrarPelicula = function(idPelicula){
    return mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .deleteOne( { _id : new ObjectId(idPelicula) } )
}
