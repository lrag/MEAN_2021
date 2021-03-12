const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

router.post("/usuarios", altaUsuario)
router.delete("/usuarios/:id", bajaUsuario)
router.put("/usuarios/:id", modificarUsuario)

exports.router = router


function altaUsuario(request, response){

    let usuario = request.body

    response.end("INSERTADO")



}

function bajaUsuario(request, response){

}

function modificarUsuario(request, response){

}