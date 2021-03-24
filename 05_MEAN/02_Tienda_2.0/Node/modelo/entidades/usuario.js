let mongoose = require("mongoose")

let esquemaUsuario = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id
    //no lo añadiremos al esquema            
    //_id       : ObjectID,
    login     : String,
    pw        : String,
    rol       : String,
    nombre    : String,
    direccion : String,
    telefono  : String,
    correoE   : String,
    idioma    : String
})

exports.Usuario = mongoose.model('usuarios', esquemaUsuario)

    