const Validator = require('validatorjs')

exports.validarObjeto = function(objeto, reglas, funcion){
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

