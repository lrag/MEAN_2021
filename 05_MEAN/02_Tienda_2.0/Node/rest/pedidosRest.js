const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.post("/pedidos", insertarPedido)
router.put("/pedidos/:id", modificarPedido)

exports.router = router


/////////////////////////////////////
//Funciones de la lógica de control//
/////////////////////////////////////

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