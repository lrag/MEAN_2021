//npm install jsonwebtoken
const jwt     = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")
const express = require("express")
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

let router = express.Router()


router.post('/login', autenticarUsuario)
//Para renovar el JWT es necesario un token válido!!!
//Esta petición será interceptada por InterceptorAutenticacion
router.post("/renovarJWT", renovarJWT)

exports.router = router

//POST /login
//CT: app/json
//-----------------
//{ login:AAA, pw:BBB }
function autenticarUsuario(request, response){

    let obj = request.body

    negocioUsuarios.buscarPorLoginYPw(obj.login, obj.pw)
    .then( usuario => {

        let token = jwt.sign(
            { 
                _id    : usuario._id, 
                login  : usuario.login, 
                rol    : usuario.rol,
                //iat    : fecha_de_creacion (issued at)
                exp    : Math.floor(Date.now() / 1000) + 60,                
                movida : "ABCDEF"
            }, 
            JWTUtil.getClave(), 
            { 
                algorithm: 'HS512'
            }
        )

        //Colocando el jwt en la cabecera de la respuesta
        //response.setHeader('Authorization','Bearer '+token)
        //response.setHeader('Access-Control-Expose-Headers', 'Authorization') 

        //Añadiremos el token al body de la respuesta
        //Le retiramos el pw al usuario
        delete usuario.pw 
        let respuesta = {
            usuario : usuario,
            JWT     : token
        }

        response.json(respuesta)
    })
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    })

}

function renovarJWT(request, response){

    let autoridad = request.autoridad
           
    let token = jwt.sign(
        { 
            _id: autoridad._id, 
            login: autoridad.login, 
            rol: autoridad.rol, 
            exp: Math.floor(Date.now() / 1000) + 60,
        }, 
        JWTUtil.getClave(),  
        { algorithm: 'HS512'}
    )
            
    let body = {
        JWT     : token
    }
    response.json(body) 

}
