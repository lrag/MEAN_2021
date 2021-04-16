const express = require("express")
const negocioFabricantes = require("../modelo/negocio/negocioFabricantes")

let router = express.Router()

router.get("/fabricantes", listarFabricantes)

exports.router = router

/////////////////////////////////////
//Funciones de la lógica de control//
/////////////////////////////////////

function listarFabricantes(request, response){

    negocioFabricantes.listarFabricantes(request.autoridad)
    .then( listadoFabricantes => response.json(listadoFabricantes) )
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    } )

}


