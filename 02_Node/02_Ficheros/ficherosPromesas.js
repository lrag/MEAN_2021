const fs = require("fs/promises")

console.log("================================================")
let resultado = ""
console.log("Leyendo el primer fichero...")
fs.readFile("./recursos/fichero1.txt")
    .then(function(buffer){
        console.log(buffer.toString())
        resultado  = buffer.toString()
        console.log("Leyendo el segundo fichero...")
        return fs.readFile("./recursos/fichero2.txt")
    })
    .then(function(buffer){
        console.log(buffer.toString())
        resultado += buffer.toString()
        console.log("Leyendo el tercer fichero...")
        return fs.readFile("./recursos/fichero3.txt")
    })
    .then(function(buffer){
        console.log(buffer.toString())
        resultado += buffer.toString()
        console.log("Escribiendo el resultado...")
        return fs.writeFile("./recursos/resultado.txt", resultado)
    })
    .then(function(){
        console.log("Fichero creado")
    })
    .catch(function(err){
        console.log(err)
    })
    .finally(function(){
        console.log("FIN de verdad")
    })

console.log("FIN en falso")