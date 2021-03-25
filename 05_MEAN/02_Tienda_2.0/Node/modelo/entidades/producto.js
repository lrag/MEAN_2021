let mongoose = require("mongoose")

let esquemaProducto = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id
    //no lo añadiremos al esquema            
    //_id       : ObjectID,
	nombre      : String,
	categoria   : String,
	fabricante  : String, 
	descripcion : String,
	imagen      : String,
	precio      : Number,
	existencias : Number
})

exports.Producto = mongoose.model('productos', esquemaProducto)