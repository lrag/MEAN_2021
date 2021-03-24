const fs = require('fs')

let clave = null

exports.getClave = function(){
    if(!clave){
        clave = fs.readFileSync('./certificado/clave.key')
    }
    return clave
}