
let mongoose =require('mongoose')

let esquemaUsuarios= new mongoose.Schema({
    //  _id          :ObjectId,
      login        :String,
      pw           :String,
      rol           :String,
      nombre       :String,
      direccion    :String,
      telefono     :String,
      correoE      :String,
      idioma       :String,
  
  })
  exports.Usuario=mongoose.model('usuarios', esquemaUsuarios)
  