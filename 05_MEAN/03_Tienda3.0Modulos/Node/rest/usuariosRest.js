//import express, { response } from 'express';
//const { response } = require('express')
const express=require('express')
const negocioUsuarios=require('../modelo/negocio/negocioUsuarios') //valkidar que este en la ruta correcto de modelo




 
/*
    GET /usuarios
    GET /usuarios?estado=eactivo
    GET /usuarios?fechaAlta?{gt}


    GET /usuarios?login=XX
*/

let router=express.Router()

//Anonimo
router.get('/comprobarLogin',comprobarLogin)

//Api rest de Usaurio
    //router.get('/usuarios',)

//Anonimo
router.post('/usuarios',altaUsuario)
//router.post('/usuarios',controladorUsaurios.altaUsuario) defionindo objetos de funciones

//Autenticado
router.delete('/usuarios/:id',bajaUsuario)
//Autenticado
router.put('/usuarios/:id',modificarUsuario)
 
exports.router=router
 
//validadnod usuario //para hacerlo de tipo rest. fnciones con la logica de control

//GET /comprobarLogin?login=valor
function comprobarLogin(request,response){
    let login =request.query.login //esto es query param
    negocioUsuarios
            .comprobarLogin(login)
            .then(existe=>{
                response.json({existe:existe})
            })
            .catch(error =>{
                console.log(error)
                response.statusCode=error.codigo
                response.json(error)
            })
}

//POST /usuario
function altaUsuario(request,response){

    let usuario=request.body

    negocioUsuarios
            .altaUsuario(usuario)
            .then(usrInsertado=>{
                response.statusCode = 201
                response.json(usrInsertado)     
            })
            .catch( error => {
                response.statusCode = error.codigo
                response.json(error)
            })
   
}

function bajaUsuario(request,reposnse){
    //LC BAJA USR
    //comprobar Token y LC
    response.end("USUARIO ELIMINADOO")
    //LC ELIMINAR USR
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
*/
/*
    //PUT /usuarios/:101
    CT:app/json
    Auth: Bearer fhfgyrw7.{ _id : 101, rol: ADMIN }.fhdhfjdshf
    ----------------------------
    { 
    _id       :  100
    nombre    : 'fulanito'
    direccion : 'otra direccion'
*/

function modificarUsuario(request,response){

    //VIENE DEL BODy DEL LA PETICION
    
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
    
    //comprobar Token y LC
        //response.end("USUARIO MODIFICADO")
    //LC MODIF USR
}

function listarProductos(request, response){
    //LC LP prueba de otras funciones
}

function insertarProducto(request, response){
    //LC IP, prubea de otras funciones
}

