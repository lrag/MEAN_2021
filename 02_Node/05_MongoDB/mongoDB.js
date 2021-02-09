//npm install mongodb
const mongoDB = require("mongoDB")

/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-connect
//-insert
//-findOne
//
//Funciones síncronas
//-dbs.db(nombre_esquema) (obtiene un esquema)

//////////////////////////////////
//Obtener una conexión a MongoDB//
//////////////////////////////////

const url = "mongodb://localhost:27017"

//La función connect es asíncrona
//Nos dan un objeto que representa al servidor de bases de datos
console.log("Conectando a mongo db...")
mongoDB.connect(url, { useUnifiedTopology : true }, function(err, dbs){

    if(err){
        console.log(err)
        return
    }

    console.log("Conexión establecida")

    //Al objeto dbs le pedimos el esquema que necesitamos
    let esquemaPeliculas = dbs.db("esquemaPeliculas")

    //Al esquema le pedimos la colección que vamos a utilizar
    let coleccionPeliculas = esquemaPeliculas.collection("peliculas")

    //A la colección le pedimos que ejecute consultas

    /////////////
    //insertOne//
    /////////////
    coleccionPeliculas
        .insertOne( { titulo : "2001", director : "Stanley Kubrik", year : 1968 },
        function(err, result){
            if(err){
                console.log(err)
                return
            }

            console.log("Pelicula insertada")
            //console.log(result)
        } )

        
    //coleccionPeliculas.findOne()


})





