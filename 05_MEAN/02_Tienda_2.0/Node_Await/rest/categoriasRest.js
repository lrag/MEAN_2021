const express = require("express")
const negocioCategorias = require("../modelo/negocio/negocioCategorias")

let router = express.Router()

router.get("/categorias", listarCategorias)

exports.router = router

/////////////////////////////////////
//Funciones de la lógica de control//
/////////////////////////////////////

function listarCategorias(request, response){

    negocioCategorias.listarCategorias(request.autoridad)
    .then( listadoCategorias => response.json(listadoCategorias) )
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    } )

}


