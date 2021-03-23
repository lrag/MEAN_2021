const jwt = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")

exports.interceptorJWT = function(request, response, next){

    console.log("------------------------------------------")
    console.log("Interceptor autenticacion")

    // :(
    let urlSinParametros = request.url.split("?")[0]
    if((request.method.toUpperCase()=="POST" && urlSinParametros == "/login") || 
       (request.method.toUpperCase()=="POST" && urlSinParametros == "/usuarios") ||
       (request.method.toUpperCase()=="GET"  && urlSinParametros == "/comprobarLogin")){
        next()
        return
    }

    //Accedemos al header Authorization
    let authorization = request.headers.authorization
    
    if(!authorization){
        response.statusCode = 401
        response.end("Falta la cabecera authorization")
        return
    }
    
    let trozos = authorization.split(" ")
    if( trozos.length!=2 || trozos[0]!="Bearer"){
        response.statusCode = 400
        response.end("La cabecera authorization está mal construida")
        return
    }

    let jwtString = trozos[1]
    console.log("JWT:"+jwtString)

    try{
        var token = jwt.verify(jwtString, JWTUtil.getClave(), {algorithm: 'HS512'}  );
        console.log(token)  
    } catch(e){
        console.log(e)
        response.statusCode = 400
        let error = {
            codigo : 400,
            descripcion : "Error con el JWT: "+e.message
        }
        response.json(error)
        return
    }

    //Creamos la autoridad
    let autoridad = {
        _id   : token._id,
        login : token.login,
        rol   : token.rol 
    }
    //Se la asignamos al request
    request.autoridad = autoridad

    next()
}
