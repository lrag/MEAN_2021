import { Observable } from "rxjs";



/*
let observable = new Observable(function(subscriber){

    setTimeout(function(){
        subscriber.next(1)
    },1000)
    setTimeout(function(){
        subscriber.next(2)
    },2000)
    setTimeout(function(){
        subscriber.next(3)
    },3000)
    setTimeout(function(){
        subscriber.next(4)
    },4000)
    setTimeout(function(){
        subscriber.next(5)
    },5000)
    setTimeout(function(){
        subscriber.next(6)
    },6000)
    setTimeout(function(){
        subscriber.next(7)
    },7000)
    setTimeout(function(){
        subscriber.complete()
    },8000)
})
*/

let observable = new Observable(function(subscriber){
    subscriber.next("WILKINS")
    subscriber.complete()
})

observable.subscribe(
    numero => console.log(numero)
)
