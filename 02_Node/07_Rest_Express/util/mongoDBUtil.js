const mongoDB = require("mongodb")

//Este valor debería estar en un fichero de configuración
let url = "mongodb://localhost:27017"

//Esta propiedad se utilizará en la lógica de negocio
exports.esquemaPeliculas = null

//Exportamos esta función para invocarla desde Aplicacion.js, al iniciar
exports.conectar = function(callback){
    console.log("Conectando a la base de datos...")
    mongoDB.connect(url, { useUnifiedTopology : true } )
    .then(function(dbs){
        console.log("Conexión establecida")
        //Aqui nos hace falta 'exports.esquemaPeliculas'
        exports.esquemaPeliculas = dbs.db("esquemaPeliculas")
        //Invocamos el callback
        callback()
    })
    .catch(function(err){
        console.log("No se pudo conectar con la base de datos")
        console.log(err)
    })
}

