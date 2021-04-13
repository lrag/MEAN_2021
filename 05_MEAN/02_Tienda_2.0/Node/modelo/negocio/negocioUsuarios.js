//npm install validatorjs
const validadorUtil = require('../../util/validadorUtil')
const Usuario = require("../entidades/usuario").Usuario

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

        Usuario.findOne( criterio )
        .then( usuario => {
            if(!usuario){
                reject({ codigo:404, mensaje:'No existe un usuario con esas credenciales'})
                return
            }
            //Aqui el usuario tiene pw
            //Se lo quitamos porque a nadie le interesa
            delete usuario.pw
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
        Usuario.findOne({ login : login })
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
//Los empleados se darían de alta siguiendo otro proceso
exports.altaUsuario = function(usuario){

    return new Promise(function(resolve, reject){
        //Validar
        //Comprobar que el login no exista
        //Insertar el usuario
        //Enviar correoE de bienvenida
        //...
        
        //validar objeto ya se encarga de invocar 'reject'        
        if(!validadorUtil.validarObjeto(usuario, reglasUsrInsercion)){
            return
        }

        //Le quitamos al usuario cualquier _id que traiga
        delete usuario._id
        //Le asignamos el rol al usuario
        usuario.rol = 'CLIENTE'

        exports.comprobarLogin(usuario.login)
        .then( existe => {
            //Gracias por inventar javascript
            if(existe==true){
                reject( { codigo:400, mensaje:'Ya existe un usuario con el mismo login' })
                return
            }
            let usuarioMG = new Usuario(usuario)
            return usuarioMG.save()
        })
        .then( usuarioInsertado => {
            resolve(usuarioInsertado) 
        })
        .catch( error => {
            console.log(error)
            reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
        })    
    })
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

        //validar objeto ya se encarga de invocar 'reject'
        if(!validadorUtil.validarObjeto(usuario, reglasUsrModificacion, reject)){
            return
        }

        //Le quitamos el login al usuario recibido en la petición
        //para que no se pueda modificar desde el postman
        delete usuario.login

        Usuario
            .findByIdAndUpdate(usuario._id, usuario)
            .then( usuarioModificado => {
                console.log("Usr modificado:",usuarioModificado)
                if(!usuarioModificado){
                    reject({ codigo:404, mensaje:"No existe un usuario con el id "+usuario._id})//Mal
                    return
                }
                resolve(usuario)//Bien
            })
            .catch( error => {
                console.log(error)
                reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
            })
    })
    
}


