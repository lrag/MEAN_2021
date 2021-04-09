const fs =require('fs')
const mongoose=require('mongoose') //se cambia a mongoose


//exports.esquema=null

exports.conectarBBDD=function(){

    return new Promise(function(resolve, reject){
        console.log("Conectando con la BBDD y Mongoose...")

        let configuracion = JSON.parse(fs.readFileSync("./configuracion.json").toString())

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', true);
       // mongoose.set('useCreateIndex', true);
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

/*
    return new Promise(function(resolve,reject){
        console.log("Util Conecta con las BD")

    mongodb 
        .connect('mongodb://localhost:27017',{useNewUrlParser:true, useUnifiedTopology: true })
        .then(dbs=>{
            console.log("conexion Establecida desde Uitl")
            exports.esquema=dbs.db('tienda')
            resolve()
        })
        .catch(error=>{
            console.log(error)
            reject({codigo:500,mensaje:"Error al Coenctar con la BBDD Max"})
        })
    })
    */
