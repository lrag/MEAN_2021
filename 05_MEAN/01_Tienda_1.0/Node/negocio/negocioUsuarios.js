//npm install validatorjs
const Validator = require('validatorjs')
const mongoDBUtil = require("../util/MongoDBUtil")

let reglasUsrInsercion = {
    nombre  : 'required|min:3|max:40',
    login   : 'required|min:5|max:15',
    pw      : 'required|min:5|max:15',
    correoE : 'required|email',
}

exports.altaUsuario = function(usuario){
    return new Promise(function(resolve, reject){
        //Validar
        //Comprobar que el login no exista
        //Insertar el usuario
        //Enviar correoE de bienvenida
        //...
        Validator.useLang('es')
        let validador = new Validator(usuario, reglasUsrInsercion)
        if(validador.fails()){
            console.log(validador.errors.errors)
            reject( { codigo:400, mensaje:'Los datos del cliente son incorrectos'} ) //Mal
            return
        }

        mongoDBUtil.esquema.collection('usuarios').insertOne(usuario)
        .then( resultado => resolve(resultado.ops[0]) )
        .catch( error => {
            console.log(error)
            reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
        })    
    })
}








