const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()


//Anónimo
router.get('/comprobarLogin',comprobarLogin) //Esto no es rest

//Api REST de usuarios

//Anónimo
router.post("/usuarios", altaUsuario)
//Autenticado 
router.delete("/usuarios/:id", bajaUsuario)
//Autenticado
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
    //LC BAJA USR
    response.end("USUARIO BORRADO")
}

function modificarUsuario(request, response){   
    response.end("USUARIO MODIFICADO")
    //LC MODIF USR
}

function listarProductos(request, response){
    //LC LP
}

function insertarProducto(request, response){
    //LC IP
}


