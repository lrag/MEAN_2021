const express=require('express')
const negocioPedidos=require('../modelo/negocio/negocioPedidos')

let router=express.Router()
exports.router=router


//router.get('/pedidos', listarPedidos)
//router.get('/pedidos/:id', buscarPedidos)
router.post('/pedidos', insertarPedidos)
//router.put('/pedidos/:id', modifcarPedido)
//router.delete('/pedidos/:id', eliminarPedido)


//////////////////////////////////////
//funciones de la logica de conytrol//
//////////////////////////////////////

//POST /pedido
//CT:app/json
//Auth: Bearer JWT
//{pedidosin id}

function insertarPedidos(request,response){
    let pedido =request.body
    negocioPedidos.insertarPedidos(pedido) //function logica de negocios
    .then(pedidoInsertado=>{
        response.statusCode=201
        response.json(pedidoInsertado)
    } )
    .catch(error=>{
        response.statusCode=error.codigo
        response.json(error)
    })
}