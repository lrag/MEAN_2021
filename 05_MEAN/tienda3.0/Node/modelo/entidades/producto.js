
let mongoose =require('mongoose')

let esquemaProductos= new mongoose.Schema({
    //  _id          :ObjectId,
      //nombre        :String,
      categoria     :String,
      fabricante    :String,
      descripcion   :String,
      imagen        :String,
      precio        :Number,
      existencias   :Number
  
  })

  exports.Producto=mongoose.model('productos', esquemaProductos)