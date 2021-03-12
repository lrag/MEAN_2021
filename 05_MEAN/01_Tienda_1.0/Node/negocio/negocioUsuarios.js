//npm install validatorjs
const validator = require('validatorjs')
const mongoDBUtil = require("../util/MongoDBUtil")

let reglasUsrInsercion = {
    nombre  : 'required|min:3|max:40',
    login   : 'required|min:5|max:15',
    pw      : 'required|min:5|max:15',
    correoE : 'required|email',
}

exports.altaUsuario = function(usuario){

    let validador = new Validator(usuario, reglasUsrInsercion)
    if(validador.fails()){
        console.log(validador.errors.errors)
        return
    }
    console.log(ok)

    //



}








