
const { ObjectID } = require('bson')
let mongoose =require('mongoose')
let Usuario=require('./usuario') //si queremoe el objeto en el subconjunto como esquema dentro de pedido
let Producto=require('./producto') //asi utilizamos el esque en le detalle se utilizo como esquema

let esquemaPedidos= new mongoose.Schema({
    //  _id          :ObjectId,
      codigo         :String,
      
      fecha        :String,
      estado        :String, //maneja vairas estado de una lista (factrurado, creado)
      total        :Number,

      //si queremos solo ID
      //usuario     :ObjectID,

     //si querens ek usaurio completo de las propiedades
      usuario:{
        _id           :ObjectID,
        login         :String,
         // pw           :String,
         // rol           :String,
          nombre       :String,
          direccion    :String,
          telefono     :String,
          correoE      :String,
          idioma       :String,
        },
        detalles:[{
          cantidad    :Number,
          precio      :Number,
          producto    :Producto.schema

        }
         

        ]

  })


  exports.Pedido=mongoose.model('pedidos', esquemaPedidos)