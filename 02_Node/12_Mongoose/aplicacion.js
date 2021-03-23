//npm install mongoose
let mongoose = require("mongoose")

//Le proporcionaremos a Mongoose una url a la base de datos que incluya el esquema
let url = "mongodb://localhost:27017/tienda"

console.log("Conectando con la base de datos...")
mongoose
    .connect( url, { useNewUrlParser:true, useUnifiedTopology:true })
    .then( () => {
        console.log("Conectado!") 

        console.log("Desconectando...")
        return mongoose.disconnect()
    })
    .then( () => {
        console.log("Desconectado!") 
        console.log("FIN")
    })
    .catch( error => console.log(error) )



mongoose.disconnect()



