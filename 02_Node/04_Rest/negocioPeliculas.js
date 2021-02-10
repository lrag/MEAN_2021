//
//La lógica de negocio debe ser perfectamente ignorante 
//de que estamos tratando con una API REST
//
//Jamás envieremos aqui el request o el reponse
//
//const mongoDB = require("mongodb")
const mongoDBUtil = require("./mongoDBUtil")

exports.listarPeliculas = function(){
    let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
}

exports.buscarPelicula = function(idPelicula){
    let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
    //Cuidado que _id tiene como valor ObjectId
    //return coleccionPeliculas.findOne( { _id : idPelicula })
    return coleccionPeliculas.findOne( { _id : new mongoDBUtil.ObjectId(idPelicula) })

}

exports.insertarPelicula = function(pelicula){
    //insert
    console.log("insertarPelicula (LN):",pelicula)
}

exports.modificarPelicula = function(pelicula){
    //update
}

exports.borrarPelicula = function(idPelicula){
    //delete
}
