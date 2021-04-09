const express =require('express')
const negocioProductos=require('../modelo/negocio/negocioProductos')
let router =express.Router()
exports.router=router

router.get('/productos', listarProductos)
router.get('/productos/:id', buscarProductos)
router.post('/productos', insertarProducto)
router.put('/productos/:id', modifcarProducto)
router.delete('/productos/:id', eliminarProducto)



////////
//Funcionnes Logica de Control
function listarProductos(request,response){
//recohger el request del criterio de fiultrado
let criterio=request.query.criterio
negocioProductos.listarProductos(criterio)
.then(listadoProductos=> response.json(listadoProductos))
.catch( error => {
    response.statusCode = error.codigo
    response.json(error)
})  

}

function buscarProductos(request,response){

    let id=request.params.id
    negocioProductos
        .buscarProductos(id)
        .then(producto=> response.json(producto))
        .catch(error=>{
            response.statusCode = error.codigo
            response.json(error)
        })

}


//POST /productos
//CT:app/json
//Auth: Bearer JWT
//{producto sin id}
function insertarProducto(request,response){

    let producto =request.body
    negocioProductos.insertarProducto(producto,request.autoridad)
    .then(productoInsertado=>{
        response.statusCode=201
        response.json(productoInsertado)
    } )
    .catch(error=>{
        response.statusCode=error.codigo
        response.json(error)
    })
}

function modifcarProducto(request,response){
    /*
    let idProducto=request.params.idProducto
    let producto=request.body
    producto._id=idProducto

   
    negocioProductos.modifcarProducto(producto,request.autoridad)
    .then(productoInsertado=>{
        response.statusCode=201
        response.json(productoInsertado)
    } )
    .catch(error=>{
        response.statusCode=error.codigo
        response.json(error)
    })
*/
}

function eliminarProducto(request,response){

}
