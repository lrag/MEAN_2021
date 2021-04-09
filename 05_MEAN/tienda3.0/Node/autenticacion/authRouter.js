const jwt               =require('jsonwebtoken')
const JWTUtil           =require('../util/JWTUtil')
const express           =require('express') //se pede convertir  con import desde ES6 
const negocioUsuarios   =require("../modelo/negocio/negocioUsuarios")

/*
    L, PW

        GET
        POST
        PUT
        PATCH
        DELETE

        GET /usaurios?login=AAA&pw=BBB
        404

        200OK 
        {json}

*/

let router =express.Router()

router.post('/login',autenticarUsuario)

exports.router = router

function autenticarUsuario(request,response){
    //tendra la funcion buscar Login y Pw "buscarXLoginYPW"

    let obj =request.body

    negocioUsuarios
    .buscarXLoginYPw(obj.login, obj.pw)
    .then(usuario=>{
        //aqui agregaos el token se elimino  response.json(usuario)

        let token=jwt.sign(
            {
                _id     :usuario._id,
                login   :usuario.login,
                rol     :usuario.rol,
                movida:'estoMovida'
            },
            JWTUtil.getClave(), 
            //JWTUtil.privateKey,
            {
                algorithm:'HS512'
            }

        )
        //Colocando el jwt en la cabecera de la respuesta
        //response.setHeader('Authorization','Bearer '+token)
        //response.setHeader('Access-Control-Expose-Headers', 'Authorization') 

        //Añadiremos el token al body de la respuesta
        //Le retiramos el pw al usuario
            delete usuario.pw
            
            let respuesta={
                usuario     :usuario,
                JWT          :token
            }
        response.json(respuesta)

    })
    .catch(error=>{
        response.statusCode=error.codigo
        response.json(error)
    })
}