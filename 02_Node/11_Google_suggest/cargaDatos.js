let mongoDB = require("mongodb")
let fs = require("fs")

let dbs
let esquema
let coleccion

mongoDB
    .connect("mongodb://localhost:27017", { useUnifiedTopology: true })
    .then(function(dbsAux){
        console.log("Conectado")
        dbs = dbsAux
        esquema = dbs.db("municipios")
        //Pedimos una lista de las colecciones existentes
        return esquema.listCollections().toArray()
    })
    .then( colecciones => {
        coleccion = esquema.collection("municipios")
        existe = colecciones.find( col => col.name == "municipios" )
        if(existe){
            return coleccion.drop()
        } 
    })
    .then( () => {
        let municipios = JSON.parse(fs.readFileSync("./municipios.json").toString())
        console.log("Municipios:"+municipios.length)
        return coleccion.insertMany(municipios)
    })
    .then( resultado => {
        console.log("OK")
        return dbs.close()
    })
    .then( () => {
        console.log("FIN")
    })
    .catch(error => console.log(error))