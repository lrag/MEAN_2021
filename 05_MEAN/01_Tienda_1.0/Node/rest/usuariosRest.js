const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

//Esto no es rest
router.get('/comprobarLogin',comprobarLogin)

//Api REST de usuarios
router.post("/usuarios", altaUsuario)
router.delete("/usuarios/:id", bajaUsuario)
router.put("/usuarios/:id", modificarUsuario)

exports.router = router

//////////////////////////////////////
//Funciones con la lógica de control//
//////////////////////////////////////

//GET /comprobarLogin?login=valor
function comprobarLogin(request, response){
    let login = request.query.login
    negocioUsuarios.comprobarLogin(login)
    .then( existe => {
        response.json({ existe : existe }) 
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })
}

//POST /usuarios
//CT:app/json
//--------------
//{json}
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