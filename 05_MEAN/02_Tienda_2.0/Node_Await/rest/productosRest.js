const express = require("express")
const negocioProductos = require("../modelo/negocio/negocioProductos")

let router = express.Router()

router.get("/productos", listarProductos)
router.get("/productos/:id", buscarProducto)
router.post("/productos", insertarProducto)
router.put("/productos/:id", modificarProducto)
router.delete("/productos/:id", borrarProducto)

exports.router = router

//////////////////////
//Funciones de la LC//
//////////////////////

function listarProductos(request, response){

    //recoger del request el criterio de filtrado
    let criterio = request.query.criterio

    negocioProductos.listarProductos(criterio)
    .then( listadoProductos => response.json(listadoProductos) )
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })  

}

function buscarProducto(request, response){

    let id = request.params.id
    negocioProductos.buscarProducto(id)
    .then( producto => response.json(producto))
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })

}

//POST /productos
//CT: app/json
//Auth: Bearer JWT
//----------------
//{ producto sin id }
function insertarProducto(request, response){

    let producto = request.body
    negocioProductos.insertarProducto(producto, request.autoridad)
    .then( productoInsertado => {
        response.statusCode = 201
        response.json(productoInsertado)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })

}

function modificarProducto(request, response){

    /*
    let idProducto = request.params.id
    let producto = request.body
    producto._id = idProducto
    negocioProductos.modificarProducto(producto, request.autoridad)
    .then( productoModificado => {
        response.json(productoModificado)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })
    */

}

function borrarProducto(request, response){

}





