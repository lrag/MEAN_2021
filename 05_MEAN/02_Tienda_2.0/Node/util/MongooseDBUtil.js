const fs = require('fs')
const mongoose = require('mongoose')

exports.conectarBBDD = function(){
    return new Promise(function(resolve, reject){
        console.log("Conectando con la BBDD...")

        //Ruta relativa a 'aplicacion.js', que es el que hace el require :(
        let configuracion = JSON.parse(fs.readFileSync("./configuracion.json").toString())

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', true);
        mongoose.set('useUnifiedTopology', true);

        mongoose.connect(configuracion.url, { useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify:true })
        .then( () => {
            console.log("Conexión establecida")
            resolve()
        })
        .catch( error => {
            console.log(error)
            reject()
        })
    })
}