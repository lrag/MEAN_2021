"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
const Observable = require("rxjs").Observable

//PROMESAS//////////////////////////////////////////////

let promesa = new Promise(function(resolve, reject){
    //código asociado a la promesa

    //Resolve es la función que se pasa en el 'then'
    resolve("OK (promesa)")
    //reject es la función que se pasa en el 'catch'
    //reject("ZASCA!")
})
/*
promesa.then( mensaje => console.log(mensaje) )
*/

//OBSERVABLES///////////////////////////////////////////

let observable = new Observable(function(subscriber){
    subscriber.next("OK (observable)")
    //subscriber.error("ZASCA TARRASCA!")

    subscriber.complete()
})

/*
observable.subscribe(
    //Esta función es subscriber.next
    mensaje => console.log(mensaje),
    //Esta funcion es subscriber.error
    error => console.log(error)  
)
*/

/*
let observable2 = new Observable(function(subscriber){
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)
    subscriber.next(4)
    subscriber.next(5)
    subscriber.next(6)
    subscriber.complete()
})
*/

let observable3 = new Observable(function(subscriber){

    subscriber.next(1)
    
    setTimeout(function(){
        subscriber.next(2)
    }, 1000)
    setTimeout(function(){
        subscriber.next(3)
    }, 2000)
    setTimeout(function(){
        subscriber.next(4)
    }, 3000)
    setTimeout(function(){
        subscriber.next(5)
    }, 4000)
    setTimeout(function(){
        subscriber.next(6)
    }, 5000)
    setTimeout(function(){
        subscriber.next(7)
    }, 6000)
    setTimeout(function(){
        subscriber.next(8)
    }, 7000)

    setTimeout(function(){
        subscriber.complete()
    }, 8000)
    
})

//A un observable se puede subscribir vários subscriptores
/*
observable3.subscribe(
    numero => console.log("Subscriptor 1:"+numero)    
)
observable3.subscribe(
    numero => console.log("Subscriptor 2:"+numero)    
)
observable3.subscribe(
    numero => console.log("Subscriptor 3:"+numero)    
)
*/

//

const http = require("http")


var options = {
    host: 'jsonplaceholder.typicode.com',
    path: '/users',
    port: '80',
    method: 'GET'
}

http.request(options, function(respuesta){

    console.log(arguments)

    console.log("Respuesta recibida")
    response.on("data", function(body){
        console.log(body)
    })
})




