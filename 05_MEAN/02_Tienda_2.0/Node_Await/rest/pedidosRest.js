const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.get("/usuarios/:idUsuario/pedidos", listarPedidosUsuario)
router.post("/pedidos", insertarPedido)
router.put("/pedidos/:id", modificarPedido)
//router.delete("/pedidos/:id", borrarPedido)

exports.router = router

/////////////////////////////////////
//Funciones de la lógica de control//
/////////////////////////////////////

//GET /usuarios/:idUsuario/pedidos
function listarPedidosUsuario(request, response){
    let idUsuario = request.params.idUsuario

    negocioPedidos.listarPedidosUsuario(idUsuario, request.autoridad)
    .then( listadoPedidos => response.json(listadoPedidos))
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    } )
}

//POST /pedidos
//Ct:App/json
//-------------
//{ pedido }
function insertarPedido(request, response){
    let pedido = request.body

    negocioPedidos.insertarPedido(pedido, request.autoridad)
    .then( pedidoInsertado => {
        response.json(pedidoInsertado)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    } )

}

//PUT /pedidos/:id
//CT:app/json
//----------------
//{ pedido }
function modificarPedido(request, response){

    let idPedido = request.params.id
    let pedido = request.body
    pedido._id = idPedido
    negocioPedidos.modificarPedido(pedido, request.autoridad)
        .then( pedidoModificado => response.json(pedidoModificado))
        .catch( error => {
            response.statusCode = error.codigo
            response.json(error)
        } )
}

/*
function borrarPedido(request, response){
    let idPedido = request.params.id
    negocioPedidos.borrarPedido(idPedido, request.autoridad)
        .then( () => response.json({ codigo:200, mensaje:"El pedido se ha borrado"})
        .catch( error => {
            response.statusCode = error.codigo
            response.json(error)
        } )
}
*/






