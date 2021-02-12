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

/*
Pasos:
-conectar y obtener el objeto que representa al servidor de bases de datos (dbs)
-a dbs le pedimos el esquema
-al equema le pedimos la colección
-a la colección le pedimos que busque, inserte, modifique...
*/


const url = "mongodb://localhost:27017"

//MongoDB Atlas
//const uri = "mongodb+srv://root:<password>@cluster0.kzos4.mongodb.net/<dbname>?retryWrites=true&w=majority";
//const url = "mongodb+srv://root:root@cluster0.kzos4.mongodb.net?retryWrites=true&w=majority";

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
    coleccionPeliculas.insertOne({ titulo : "2001", director : "Stanley Kubrik", year : 1968 }, function(err, result){
        if(err){
            console.log(err)
            return
        }
        
        console.log("Pelicula insertada")
        //console.log(result)

        coleccionPeliculas.findOne({ titulo : "2001" }, function(err, pelicula){
            if(err){
                console.log(err)
                return
            }

            console.log("Pelicula:",pelicula)

            dbs.close(function(err){
                if(err){
                    console.log(err)
                    return
                }
                console.log("Desconectado...")
            })                    
        })
    })
})





