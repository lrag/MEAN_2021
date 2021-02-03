//Esté módulo viene de serie con Node.JS
const fs = require("fs")


//////////////////////////////////
// LECTURA SÍNCRONA DE FICHEROS //
//////////////////////////////////

//Las rutas relativas en node son desde el directorio en el que se encuentra
//el fichero JS que se está ejecutando
//
//Cuidado que readFileSync lee del tirón todo el fichero y lo mete en la memoria!
//Lo usaremos solo cuando los ficheros no sean enormes
//let contenido1 = fs.readFileSync("./recursos/fichero1.txt")
//let contenido2 = fs.readFileSync("./recursos/fichero2.txt")
//let contenido3 = fs.readFileSync("./recursos/fichero3.txt")

//contenido es un buffer de bytes
//console.log(contenido1)
//Si queremos convertirlo en un string:
//console.log(contenido1.toString());
//let txt4 = contenido1.toString()+contenido2.toString()+contenido3.toString()
//console.log(txt4)

////////////////////////////////////
// ESCRITURA SÍNCRONA DE FICHEROS //
////////////////////////////////////

//fs.writeFileSync(ruta_al_fichero, contenido)
//fs.writeFileSync("./recursos/fichero4.txt", txt4)

///////////////////////////////////
// LECTURA ASÍNCRONA DE FICHEROS //
///////////////////////////////////

//ReadFile asincrono NO devuelve el contenido del fichecho
//contenido1 = fs.readFile("./recursos/fichero1.txt")
//contenido1 no es undefined!
//console.log(contenido1.toString()); //ZASCA!

//fs.readFile(ruta_al_fichero, function_callback(error, contendido_del_fichero) )

//                                                    //
// CONCATENANDO LLAMADAS ASINCRONAS CON CALLBACK HELL //
//                                                    //

let resultado = ""

console.log("HABER KE PASA AKI")

fs.readFile("./recursos/fichero1.txt", function(err, contenidoBuffer){
    //if(err!=null){
    if(err){
        console.log("Error:",err)
        return
    }        
    console.log("=============================")
    let contenido = contenidoBuffer.toString()
    console.log(contenido)
    resultado += contenido

    fs.readFile("./recursos/fichero2.txt", function(err, contenidoBuffer){
        if(err){
            console.log("Error:",err)
            return
        }
        console.log("=============================")
        let contenido = contenidoBuffer.toString()
        console.log(contenido)
        resultado += contenido

        fs.readFile("./recursos/fichero3.txt", function(err, contenidoBuffer){
            if(err){
                console.log("Error:",err)
                return
            }
            console.log("=============================")
            let contenido = contenidoBuffer.toString()
            console.log(contenido)
            resultado += contenido

            console.log("=============================")
            console.log(resultado)

            fs.writeFile("./recursos/fichero4.txt", resultado, function(err){
                if(err){
                    console.log("Error:",err)
                    return                        
                }

                console.log("=============================")
                console.log("FIN!!!!!!!")

            }) //escribir el resultado

        }) //leer el tercer fichero

    }) //leer el segundo fichero
    
}) //leer el primer fichero

console.log("FIN")


