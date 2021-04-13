const mongodb = require("mongodb")
const mongoDBUtil = require("./MongoDBUtil")
const negocioProductos = require("./negocioProductos")

mongoDBUtil.conectarBBDD()
.then( () => {
    
    ///////////////////////////////////////////////////////////
    /*
    negocioProductos.buscarProducto("606dfc0a2773dd5b404e3438")
    .then( producto => {
        console.log(producto)
    })
    .catch( error => {
        console.log(error)
    })
    */

    let producto = negocioProductos.buscarProducto_await("506dfc0a2773dd5b404e3438")
    .then( producto => {
        console.log(producto)
    })
    .catch( error => {
        console.log(error)
    })

})
.catch( error => { 
    console.log(error)
})

