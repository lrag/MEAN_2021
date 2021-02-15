
//Crea un objeto a partir de los campos de un formulario
//Requisitos:
//-el formulario debe tener id
//-los campos del formulario deben tener id
//-las propiedades del objeto coincidirán con el id de los campos
function crearObjeto(idFormulario){
    //Creamos un objeto sin propiedades
    let objeto = {}

    /*Nodos dentro de #formulario que sean input, select o textareas
    let nodos = $("#"+idFormulario+" input,textarea,select")
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

