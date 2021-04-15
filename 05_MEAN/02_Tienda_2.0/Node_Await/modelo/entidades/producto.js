const mongoose = require("mongoose")
const { ObjectID } = require("bson")

const Categoria = require("./categoria").Categoria

let esquemaProducto = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id
    //no lo añadiremos al esquema            
    //_id       : ObjectID,
	nombre      : String,

	//Podemos guardar solo el id de la categoria (allá va el rendimiento de las consultas...)
	//categoria : ObjectID

	//Podemos guardar el documento categoría entero
	//categoria : Categoria.schema

	//Podemos guardar un subconjunto de la categoría en cada producto
	categoria   : {
			_id    : Number,
			nombre : String
		},
	fabricante  : String, 
	descripcion : String,
	imagen      : String,
	precio      : Number,
	existencias : Number
})

exports.Producto = mongoose.model('productos', esquemaProducto)