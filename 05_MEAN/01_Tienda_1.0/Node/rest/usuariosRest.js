const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

router.post("/usuarios", altaUsuario)
router.delete("/usuarios/:id", bajaUsuario)
router.put("/usuarios/:id", modificarUsuario)

exports.router = router

function altaUsuario(request, response){

    let usuario = request.body
    negocioUsuarios.altaUsuario(usuario)
    .then( usrInsertado => {
        response.statusCode = 201
        response.json(usrInsertado)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })
}

function bajaUsuario(request, response){
}

function modificarUsuario(request, response){
}