const Validator=require('validatorjs')

exports.validarObjeto = function(objeto, reglas, funcion){
    Validator.useLang('es')//forzamo para que los mesnsajes sena en Espanol
        let validador = new Validator(objeto,reglas)
            if (validador.fails()){
                console.log(validador.errors.errors)
                reject({codigo:400, mensaje:"Los datos del Objeto son Incorrectos --->", 
                errores: validador.errors.errors})
                return false
            }
            return true
    }        