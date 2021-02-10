
exports.devolverError = function(response, codigo, mensaje){
    response.statusCode = codigo
    response.setHeader("Content-Type", "application/json")
    let error = { codigo:codigo, mensaje:mensaje }
    response.end(JSON.stringify(error))
}