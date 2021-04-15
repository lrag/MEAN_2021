const fs = require('fs')
const mongoose = require('mongoose')
const Producto = require("./modelo/entidades/producto").Producto
const Categoria = require("./modelo/entidades/categoria").Categoria


let categorias = [
    {
        "_id"         : 1,
        "nombre"      : "Aparatos",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen1",
    },        
    {
        "_id"         : 2,
        "nombre"      : "Elementos",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen2",
    },        
    {
        "_id"         : 3,
        "nombre"      : "Vehículos",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen5",
    }, 
    {
        "_id"         : 4,
        "nombre"      : "Herramientas",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen6",
    },
    {
        "_id"         : 5,
        "nombre"      : "Vestimenta elegante",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
    },                                 
    {
        "_id"         : 6,
        "nombre"      : "Libros",
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
    }                                 
]

let productos = [
    {
        "nombre"      : "Chintáfono",
        "categoria"   : { _id: 1, nombre : "Aparatos" },
        "fabricante"  : "Ibérica de Aparatos S.A.", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen1",
        "precio"      : 15,
        "existencias" : 100
    },        
    {
        "nombre"      : "Fleje",
        "categoria"   : { _id : 2, nombre : "Elementos" },
        "fabricante"  : "Flejes Reunidos", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen2",
        "precio"      : 30,
        "existencias" : 100
    },        
    {
        "nombre"      : "Elemento Disruptor",
        "categoria"   : { _id:2, nombre : "Elementos" },
        "fabricante"  : "Antúnez e Hijos S.L.", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen3",
        "precio"      : 50,
        "existencias" : 100
    },        
    {
        "nombre"      : "Pendulador Pirotécnico",
        "categoria"   : { _id: 1,nombre : "Aparatos" },
        "fabricante"  : "Pirotécnicas Valencianas S.A.", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen4",
        "precio"      : 75,
        "existencias" : 100
    },      
    {
        "nombre"      : "Turbo scooter",
        "categoria"   : { _id: 3, nombre : "Vehículos" },
        "fabricante"  : "Amotos Ruidosas de la Armuña", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen5",
        "precio"      : 500,
        "existencias" : 100
    }, 
    {
        "nombre"      : "Zeppelin",
        "categoria"   : { _id:3, nombre : "Vehículos" },
        "fabricante"  : "Zeppelines de Prusia", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen5",
        "precio"      : 1500,
        "existencias" : 100
    },  
    {
        "nombre"      : "Escuadra de medir esquinas",
        "categoria"   : { _id:4, nombre : "Herramientas" },
        "fabricante"  : "Herramientas Peninsulares S.A.", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen6",
        "precio"      : 40,
        "existencias" : 100
    },
    {
        "nombre"      : "Imán de buscar vóltios",
        "categoria"   : { _id:4, nombre : "Herramientas" },
        "fabricante"  : "Herramientas Peninsulares S.A.", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
        "precio"      : 50,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Sombrero de ópera",
        "categoria"   : { _id:5, nombre : "Vestimenta elegante" },
        "fabricante"  : "Compañía de Sombreros de Ópera de Baltimore", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
        "precio"      : 50,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Flotis Flay",
        "categoria"   : { _id:2, nombre : "Elementos" },
        "fabricante"  : "Vinaroz Novelties Amalgamated", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
        "precio"      : 40,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Cascanueces termonuclear",
        "categoria"   : { _id:4, nombre : "Herramientas" },
        "fabricante"  : "Factorías Percutivas Salmantinas", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
        "precio"      : 75,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Framework 3000 in Action",
        "categoria"   : { _id:6,  nombre : "Libros" },
        "fabricante"  : "Manning", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "imagen7",
        "precio"      : 30,
        "existencias" : 100
    }                                 
]

let configuracion = JSON.parse(fs.readFileSync("./configuracion.json").toString())

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useUnifiedTopology', true);

/*
mongoose.connect(configuracion.url, { useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify:true })
.then( () => {
    return Producto.deleteMany({})
})
.then( () => {
    return Categoria.deleteMany({})
})
.then( rs => {
    console.log(rs)
    return Producto.insertMany(productos)
})
.then( rs => {
    console.log(rs)
    return Categoria.insertMany(categorias)
})
.then( x => {
    console.log(x)
    return mongoose.disconnect()
})
.then(() => {
    console.log("FIN")
})
.catch( error => console.log(error))
*/


/////////////
//CON AWAIT//
/////////////

//No podemos controlar lo que devuelve una función asincrona
//DEvuelve una promesa que no controlamos
async function cargarDatos() {
    console.log("Iniciando la carga")
    try {
        await mongoose.connect(configuracion.url, { useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify:true })
        let promesas = []
        promesas.push(Producto.deleteMany({}))
        promesas.push(Categoria.deleteMany({}))
        await Promise.all(promesas)

        let productosInsertados = await Producto.insertMany(productos)
        console.log("Productos insertados:"+productosInsertados.length)
        let categoriasInsertadas = await Categoria.insertMany(categorias)
        console.log("Categorias insertadas:"+categoriasInsertadas.length)

        await mongoose.disconnect()
    } catch (error){
        console.log(error)
    }
    console.log("Carga completa")

    return "TOCOTÓ"
}

/*
cargarDatos()
.then( y => {
    console.log("Y:",y)
    console.log("YA")
})
*/

//Lo mismo pero devolviendo una promesa
function cargarDatos_Promesa() {

    return new Promise(async function(resolve,reject){

        console.log("Iniciando la carga")
        try {
            await mongoose.connect(configuracion.url, { useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify:true })
            let promesas = []
            promesas.push(Producto.deleteMany({}))
            promesas.push(Categoria.deleteMany({}))
            await Promise.all(promesas)

            let productosInsertados = await Producto.insertMany(productos)
            console.log("Productos insertados:"+productosInsertados.length)
            let categoriasInsertadas = await Categoria.insertMany(categorias)
            console.log("Categorias insertadas:"+categoriasInsertadas.length)

            await mongoose.disconnect()
        } catch (error){
            console.log(error)
            reject("ERROR!")
        }
        console.log("Carga completa")

        resolve("ARSA!")
    })
}

cargarDatos_Promesa()
.then( mensaje => console.log(mensaje) )
.catch( error => console.log(error) )




console.log("FIN (falso)")
