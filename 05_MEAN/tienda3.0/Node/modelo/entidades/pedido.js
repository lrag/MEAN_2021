
//const { ObjectID } = require('bson').ObjectID
const ObjectID=require('bson').ObjectID
const mongoose =require('mongoose')
//let Usuario=require('./usuario') //si queremoe el objeto en el subconjunto como esquema dentro de pedido
const Producto=require('./producto').Producto //asi utilizamos el esque en le detalle se utilizo como esquema

let esquemaPedidos= new mongoose.Schema({ 
  //si queremos quese sel driver el que le de valor al _id
    //  _id          :ObjectId,

      codigo         :String,
      fecha          :String,
      estado         :String, //maneja vairas estado de una lista (factrurado, creado)
      total          :Number,

      dirEntrega      :String,
      formaPago       :String,
      fechaEntrega    :String,
      

      //si queremos solo ID
      //usuario    Usuario.schema

     //si querens ek usaurio completo de las propiedades
      usuario:{
          _id           :ObjectID,
          login         :String,
         // pw          :String,
         // rol         :String,
          nombre       :String,
          direccion    :String,
          telefono     :String,
          correoE      :String,
          idioma       :String
        },
        detalles:[{
          cantidad    :Number,
          precio      :Number,
          producto    :Producto.schema

        }]

  })


  exports.Pedido=mongoose.model('pedidos', esquemaPedidos)