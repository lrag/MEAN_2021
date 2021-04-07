const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.post("/pedidos", insertarPedido)

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

    negocioPedidos.insertarPedido(pedido)
    .then( pedidoInsertado => {
        response.json(pedidoInsertado)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    } )

}

