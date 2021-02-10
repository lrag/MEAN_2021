//npm install mongodb
const mongoDB = require("mongoDB")

/*
let promesa = mongoDB.connect("mongodb://localhost:27017", { useUnifiedTopology: true })
promesa.then( function(dbs){
    console.log(dbs)
})
promesa.catch( function(err){
    console.log(err)
})
*/

console.log("Conectando con la base de datos...")

let dbs = null
let coleccionPeliculas = null
mongoDB
    .connect("mongodb://localhost:27017", { useUnifiedTopology: true })
    .then(function(dbsAux){
        console.log("Conectado")
        dbs = dbsAux
        let esquemaPeliculas = dbs.db("esquemaPeliculas")
        coleccionPeliculas = esquemaPeliculas.collection("peliculas")

        //Siguiente llamada asíncrona. No pasamos callback y devuelve una promesa
        //Concatenación de promesas:
        return coleccionPeliculas.insertOne({ titulo:"Depredador", director:"John McTiernan" })
    })
    .then(function(result){
        console.log("Pelicula insertada")
        return coleccionPeliculas.findOne( { titulo : "Depredador"})
    })
    .then(function(pelicula){
        console.log("Pelicula:", pelicula)
        return dbs.close()
    })
    .then( function(){
        console.log("Desconectado")
    })
    .catch(function(err){
        console.log(err)
    })
    //El bloque finally se ejecuta despues del último then o despues de catch (lo que toque)
    //No haremos ninguna llamada asíncrona dentro del finaly porque el finaly implica que hemos terminado
    .finally(function(){
        console.log("FIN DE VERDAD")
    })

console.log("FIN")