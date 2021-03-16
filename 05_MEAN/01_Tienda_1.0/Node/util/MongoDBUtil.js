const mongodb = require('mongodb')

exports.esquema = null

exports.conectarBBDD = function(){

    return new Promise(function(resolve, reject){
        console.log("Conectando con la BBDD...")
        mongodb
            .connect("mongodb://localhost:27017", { useNewUrlParser : true, useUnifiedTopology: true })
            .then( dbs => {
                console.log("Conexión establecida.")
                exports.esquema = dbs.db("tienda")
                resolve()
            })
            .catch( error => {
                console.log(error)
                reject({ codigo:500, mensaje:'Error al conectar con la bb.dd'})
            })
    })

}