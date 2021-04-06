const Validator=require('validatorjs')
//const mongoDBUtil=require("../../util/MongooseDBUtil") 
//const ObjectID =require('mongodb').ObjectID
const validadorUtil=require('../../util/validatorUtil')
const Usuario =require('../entidades/usuario').Usuario



let reglasUsrInsercion={ 
    nombre      :'required|min:3|max:40',
    login       :'required|min:5|max:15',
    pw          :'required|min:5|max:15',
    correoE     :'required|email',


}

let reglasUsrModificacion={ 
    nombre      :'required|min:3|max:40',
    pw          :'required|min:5|max:15',
    direccion   :'required|min:3|max:200',
    telefono    :'required|min:3|max:40',
    correoE     :'required|email',


}


exports.buscarXLoginYPw=function(login, pw){
    return new Promise(function(resolve,reject){
        let criterio={
            login:login,
            pw:pw
        }

    //solo aqui este cambio
        Usuario.findOne(criterio)
                    .then(usuario=>{
                        if(!usuario){
                            reject({codigo:404, mensaje:"No Existe Usuario con esas Credenciales"})
                            return
                        }
                        resolve(usuario)
                    })
                    .catch(error=>{
                        console.log(error)
                        reject({codigo:500, mensaje:"Eroror en la BD!!!"})
                    })
    })

}

exports.comprobarLogin=function(login){
    return new Promise (function (resolve, reject){
      
        Usuario.findOne({ login : login})
                .then(resultado=>{
                    if (resultado){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                })
                .catch(error=>{
                    console.log(error)
                    reject({codigo:500, mensaje:"Error con la BD"})
                })
    })
}
/*
//funcion de validacion Comun se incropora dentro de las funciones a la carpeta Util
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
*/

//Alta usuario solo sirve para usuarios con el rol 'CLIENTE'
//Los emnpleados se darían de alta siguiendo otro proceso
exports.altaUsuario=function(usuario){

return new Promise(function(resolve,reject){
    //validar
    //comporabr qye el lgin no exista
    //insertar al usuario
    //enviar correoE de Bievenida
    //....
/*
se incorporo a una Funcionnnn
    //librerias para validaciones
    Validator.useLang('es')//forzamo para que los mesnsajes sena en Espanol
    let validador =new Validator(usuario,reglasUsrInsercion)
        if (validador.fails()){
            console.log(validador.errors.errors)
            reject({codigo:400, mensaje:"Los datos del Usuario son Incorrectos --->", 
            errores: validador.errors.errors})
            return false
        }
        return true

 */
//validar objeto ya se encarga de invocar 'reject'        

if(!validadorUtil.validarObjeto(usuario, reglasUsrInsercion,reject)){ //se agrega para modifcar 
    return
}
//si lo trae se lomquita
delete usuario._id
    //Le asignamos el rol al usuario
    usuario.rol = 'CLIENTE'

        //let coleccionUsuarios=mongoDBUtil.esquema.collection('usuarios') no lo necesito porque ya esta en el modelo
        exports.comprobarLogin(usuario.login)
            .then( existe => {
                if(existe==true){
                    reject( { codigo:400, mensaje:'Ya existe un usuario con el mismo login' })
                    return
                }
                let usuarioMG =new Usuario(usuario)

                //utlizamos save porque se usa el metodo mongoose
                return usuarioMG.save() //de mongoose

              //  return coleccionUsuarios.insertOne(usuario)
            })
            .then(usuarioInsertado => {
                resolve(usuarioInsertado) 
            })
             .catch( error => {
            console.log(error)
            reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
        })    
    })

}

//Autorizaciones
//loas admin opueden modifcar todos los usuarios
//los clientes silo pueden modifcrse asi mismos

exports.modificarUsuario=function(usuario, autoridad){ //aqui recibe quien ordena sea o no dueño de su id, solo que posea un rol ADMIN
    
    //autoridad si es diferente de ADMIN, debe o no cincidir con su id
    return new Promise(function(resolve, reject){

        console.log(autoridad)
        //incoroporando  el rol para hacer modificaciones
        if(autoridad.rol != 'ADMIN'){
            if(autoridad._id != usuario._id){
                reject({ codigo:403, mensaje:"Los clientes solo pueden modificarse a si mismos. Deja ya de joder con el postman"})//Mal
                return 
            }
        }
        if(!validadorUtil.validarObjeto(usuario, reglasUsrModificacion, reject)){
            return
        }

        Usuario.findOneAndUpdate(usuario._id,usuario)
        .then(usuarioModificado=>{
            console.log("Usr modificado:", usuarioModificado)
            if(!usuarioModificado){
                reject({ codigo:404, mensaje:"No existe un usuario con el id "+usuario._id})
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

/*
        //mongoDBUtil.esquema.collection("usuarios") sin mongoose
        Usuario.findOneAndUpdate( 
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
                    reject({ codigo:404, mensaje:"No existe un usuario con el id "+usuario._id})
                    return
                }
                resolve(commandResult.value)//Bien
            })
            .catch( error => {
                console.log(error)
                reject( { codigo:500, mensaje:'¡Error con la base de datos!'} ) //Mal
            })
    })
*/   

/*otras formas probadas */
/*
        exports.comprobarLogin(usuario.login)
            .then(existe=>{
                if (existe){
                    reject({codigo:400, mensaje:"YA existe un Usauroio con el mismo Login"})
                }
                return coleccionusuarios.insertOne(usuario)
            })
            .then(resultado => resolve(resultado.ops[0]))
            .catch(function(error){
                console.log(error)
                reject({codigo:500, mensaje:"Erroorr con la BD"})

             })

    })   //fin de la prmesa 
    /*
        haciendo de otra forma sin las validaciones     
        mongoDBUtil
                            .esquema
                            .collection('usuarios')
                            .insertOne(usuario) //haciendo fucniones flechas en una linea
                            .then(resultado => resolve(resultado.ops[0]))

                            .catch(function(error){
                            console.log(error)
                            reject({codigo:500, mensaje:"Erroorr con la BD"})

                            })
*/










