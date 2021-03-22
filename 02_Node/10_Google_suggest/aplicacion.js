const express = require("express")
const mongoDBUtil = require("./MongoDBUtil")

mongoDBUtil.conectarBBDD()
.then( () => {
    let app = express()
    app.get("/municipios", listarMunicipios)
    app.use(express.static("./recursos"))
    app.listen(80, function(){
        console.log("Esperando peticiones en el puerto 80")
    })
})

function listarMunicipios(request, response){
    let nombre = request.query.nombre
    console.log(nombre)
    buscarMunicipios(nombre)
    .then( municipios => response.json(municipios))
}

function buscarMunicipios(nombre){
    return new Promise(async function(resolve, reject){
        let municipios = await mongoDBUtil.esquema.collection("municipios")
                    .find({ nombre : {'$regex': '^'+nombre, '$options': 'i'} })
                    .toArray()
        resolve(municipios)        
    })
}