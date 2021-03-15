//npm install validatorjs
const Validator = require('validatorjs')
const mongoDBUtil = require("../util/MongoDBUtil")

let reglasUsrInsercion = {
    nombre  : 'required|min:3|max:40',
    login   : 'required|min:5|max:15',
    pw      : 'required|min:5|max:15',
    correoE : 'required|email',
}


exports.buscarPorLoginYPw = function(login, pw){

}

exports.comprobarLogin = function(login){
    return new Promise(function(resolve, reject){
        mongoDBUtil.esquema.collection("usuarios").findOne({ login : login })
        .then( resultado => {
            if(resultado){
                resolve(true)
            } else {
                resolve(false)
            }
        })
        .catch( error => {
            console.log(error)
            reject( { codigo:500, mensaje:'¡Error con la base de datos!' })
        })
    })
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
            reject( { codigo:400, 
                      mensaje:'Los datos del cliente son incorrectos', 
                      errores: validador.errors.errors } ) //Mal
            return
        }

        let coleccionUsuarios = mongoDBUtil.esquema.collection('usuarios')
        exports.comprobarLogin(usuario.login)
        .then( existe => {
            if(existe){
                reject( { codigo:400, mensaje:'Ya existe un usuario con el mismo login' })
                return
            }
            return coleccionUsuarios.insertOne(usuario)
        })
        .then( resultado => {
            resolve(resultado.ops[0]) 
        })
        .catch( error => {
            console.log(error)
            reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
        })    
    })

}








