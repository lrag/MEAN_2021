const jwt = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")

exports.interceptorJWT = function(request, response, next){

    console.log("------------------------------------------")
    console.log("Interceptor autenticacion")

    //Temporal
    if((request.method.toUpperCase()=="POST" && request.url == "/login") || 
       (request.method.toUpperCase()=="POST" && request.url == "/usuarios") ||
       (request.method.toUpperCase()=="GET"  && request.url == "/comprobarLogin")){
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
        let error = {
            codigo : 400,
            descripcion : "Error con el JWT: "+e.message
        }
        response.json(error)
        return
    }

    //
    //
    //
    next()

}
