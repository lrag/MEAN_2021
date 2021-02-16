
//Crea un objeto a partir de los campos de un formulario
//Requisitos:
//-el formulario debe tener id
//-los campos del formulario deben tener id
//-las propiedades del objeto coincidirán con el id de los campos
function crearObjeto(idFormulario){
    //Creamos un objeto sin propiedades
    let objeto = {}

    /*Con JS a secas
    Nodos dentro de #formulario que sean input, select o textareas
    let nodos = document.querySelectorAll("#"+idFormulario+" input,textarea,select")
    //Le asignamos al objeto las propiedades necesarias
    for(let nodo of nodos){
        let id    = nodo.id
        let valor = nodo.value
        objeto[id] = valor
    }
    */

    //Podemos utilizar la función 'each'
    $("#"+idFormulario+" input,textarea,select")
        .each(function(){
            objeto[this.id] = this.value
        })

    return objeto
}

//Vacía los campos de un formulario
//Requisitos:
//-Que el formulario tenga id
//-Puede ser cualquier etiqueta
function vaciarFormulario(idFormulario){
    $(`#${idFormulario} input,textarea,select`)
        .val("")
}

//Rellena los campos de un formulario con el objeto recibido
//Requisitos:
//-Los ids de los campos han de coincidir con las propiedades del objeto
function rellenarFormulario(objeto){
    for(let propiedad in objeto){
        $(`#${propiedad}`).val(objeto[propiedad])
    }
}

//
//
//
function generarTabla(){

}