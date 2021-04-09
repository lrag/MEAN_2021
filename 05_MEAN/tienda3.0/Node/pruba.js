

















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