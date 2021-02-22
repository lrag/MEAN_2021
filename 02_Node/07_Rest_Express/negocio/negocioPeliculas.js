//
//La lógica de negocio debe ser perfectamente ignorante 
//de que estamos tratando con una API REST
//
//Jamás envieremos aqui el request o el reponse
//

const ObjectId = require("mongodb").ObjectId
const mongoDBUtil = require("../util/mongoDBUtil")

exports.listarPeliculas = function(){
    let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
    let cursor = coleccionPeliculas.find()
    return cursor.toArray()
}

exports.buscarPelicula = function(idPelicula){
    let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
    return coleccionPeliculas.findOne( { _id : new ObjectId(idPelicula) })
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
        //.updateOne( { _id : new ObjectId(pelicula._id) },
        //findOneAndUpdate incluye en el objeto 'commandResult' el documento que había antes en la colección
        //Si queremos que devuelva el objeto tal cual ha quedado hay que añadir un parámetro extra a la consulta
        .findOneAndUpdate( { _id : new ObjectId(pelicula._id) },
                    {
                        //Le asignamos estas propiedades al documento
                        //Si el documento ya las tiene, se cambará el valor (si es distinto)
                        //Si el documento no las tiene se las añade returnOriginal : false
                        $set : {
                            titulo   : pelicula.titulo,
                            director : pelicula.director,
                            genero   : pelicula.genero,
                            year     : pelicula.year,
                            sinopsis : pelicula.sinopsis,
                        }
                        //Con $unset le eliminamos propiedades:
                        //$unset : { movida : 1 }
                    }
                    ,
                    {
                        returnOriginal : false,
                        //Con la opcion upsert a true si el criterio de búsqueda no ha dado
                        //resultado se insertará un nuevo documento con los valores disponibles
                        //Es decir, convertimos la consulta en un 'modificar o insertar'
                        //upsert : true
                    })
}

exports.borrarPelicula = function(idPelicula){
    return mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .deleteOne( { _id : new ObjectId(idPelicula) } )
}
