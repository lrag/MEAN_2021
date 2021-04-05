

//Array tiene una serie de funciones muy chulas

///////////
//forEach//
///////////
console.log("=====================================================")
//ForEach. Recibe una función que se ejecutará por cada elemento del array
//(elemento, pos, refArray) : void 

let datos = [1,2,3,4,5,6,7,8,9]
let total = 0
datos.forEach(function(e){
    total += e
})
console.log("Total:"+total)

////////
//find//
////////
console.log("=====================================================")
//Find:  recibe un predicate, una función que recibe un parámetro y devuelve un boolean
//(elemento):boolean 
let palabras = [ "HELLO", "DOCTOR", "NAME", "CONTINUE", "YESTERDAY", "TOMORROW" ]
let elem = palabras.find(function(e){
    return e == "NAME"
})
console.log(elem)

