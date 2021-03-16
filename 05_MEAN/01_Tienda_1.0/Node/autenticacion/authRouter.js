const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

router.post('/login', autenticarUsuario)

exports.router = router

//POST /login
//CT: app/json
//-----------------
//{ login:AAA, pw:BBB }
function autenticarUsuario(request, response){

    let obj = request.body

    negocioUsuarios.buscarPorLoginYPw(obj.login, obj.pw)
    .then( usuario => {
        response.json(usuario)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })

}