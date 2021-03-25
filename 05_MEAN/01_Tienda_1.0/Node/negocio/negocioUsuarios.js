//npm install validatorjs
const Validator = require('validatorjs')
const mongoDBUtil = require("../util/MongoDBUtil")
const ObjectID = require("mongodb").ObjectID

let reglasUsrInsercion = {
    nombre  : 'required|min:3|max:40',
    login   : 'required|min:5|max:15',
    pw      : 'required|min:5|max:15',
    correoE : 'required|email',
}

let reglasUsrModificacion = {
    nombre    : 'required|min:3|max:40',
    pw        : 'required|min:5|max:15',
    direccion : 'required|min:5|max:200',
    telefono  : 'required|min:5|max:20',
    correoE   : 'required|email',
}


exports.buscarPorLoginYPw = function(login, pw){
    return new Promise(function(resolve, reject){
        let criterio = {
            login : login,
            pw    : pw
        }

        mongoDBUtil.esquema.collection("usuarios").findOne( criterio )
        .then( usuario => {
            if(!usuario){
                reject({ codigo:404, mensaje:'No existe un usuario con esas credenciales'})
                return
            }
            resolve(usuario)
        })
        .catch( error => {
            console.log(error)
            reject({ codigo:500, mensaje:'¡Error en la base de datos!'})
        })
    })
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

//Alta usuario solo sirve para usuarios con el rol 'CLIENTE'
//Los emnpleados se darían de alta siguiendo otro proceso
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

        //Le asignamos el rol al usuario
        usuario.rol = 'CLIENTE'

        let coleccionUsuarios = mongoDBUtil.esquema.collection('usuarios')
        exports.comprobarLogin(usuario.login)
        .then( existe => {
            if(existe==false){
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

//Esto podría estar en 'ValidatorjsUtil.js'
function validarObjeto(objeto, reglas, funcion){
    Validator.useLang('es')
    let validador = new Validator(objeto, reglas)
    if(validador.fails()){
        console.log(validador.errors.errors)
        funcion( { codigo:400, 
            mensaje:'Los datos del objeto son incorrectos', 
            errores: validador.errors.errors } ) //Mal            
        return false
    }
    return true
}

//Autorización:
//-los ADMIN pueden modificar a cualquier usuario
//-los CLIENTE solo puededn modificarse a si mismos
exports.modificarUsuario = function(usuario, autoridad){

    return new Promise(function(resolve, reject){
        
        console.log(autoridad)

        if(autoridad.rol != 'ADMIN'){
            if(autoridad._id != usuario._id){
                reject({ codigo:403, mensaje:"Los clientes solo pueden modificarse a si mismos. Deja ya de joder con el postman"})//Mal
                return 
            }
        }

        if(!validarObjeto(usuario, reglasUsrModificacion, reject)){
            return
        }

        mongoDBUtil.esquema.collection("usuarios")
            .findOneAndUpdate( 
                { _id : new ObjectID(usuario._id) },
                {
                    $set : {
                        nombre    : usuario.nombre,
                        pw        : usuario.pw,
                        direccion : usuario.direccion,
                        correoE   : usuario.correoE,
                        telefono  : usuario.telefono,
                        idioma    : usuario.idioma,
                    }
                },
                {
                    returnOriginal : false,
                })
            .then(function(commandResult){
                console.log(commandResult)
                if(!commandResult.value){
                    reject({ codigo:404, mensaje:"No existe un usuario con el id "+usuario._id})//Mal
                    return
                }
                resolve(commandResult.value)//Bien
            })
            .catch( error => {
                console.log(error)
                reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
            })
    })
    
}





