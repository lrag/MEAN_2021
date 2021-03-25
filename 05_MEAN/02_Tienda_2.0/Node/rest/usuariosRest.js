const express = require("express")
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

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
        console.log(error)
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

/*
usuarios [
{
    _id : 100,
    nombre : "Fulanita"
    rol : 'ADMIN'
},
{
    _id : 101,
    nombre : "Fulanito",
    rol : 'CLIENTE'
}
]

PUT /usuarios/:101
CT:app/json
Auth: Bearer fhfgyrw7.{ _id : 101, rol: ADMIN }.fhdhfjdshf
----------------------------
{ 
  _id       :  100
  nombre    : 'fulanito'
  direccion : 'otra direccion'
  ...    
}
*/
function modificarUsuario(request, response){
    
    let idUsuario = request.params.id
    let usuario = request.body
    usuario._id = idUsuario
    
   negocioUsuarios.modificarUsuario(usuario, request.autoridad)
    .then( (usuarioModifica) => {
        response.json(usuarioModifica)
    })
    .catch( error => {
        console.log(error)
        response.statusCode = error.codigo
        response.json(error)
    })
}
