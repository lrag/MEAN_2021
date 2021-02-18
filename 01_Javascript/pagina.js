
let peces = []

$(inicializar)

function inicializar(){
    console.log("hola")
    $("#btnInsertar").click(insertar)
    $("#btnVaciar").click(limpiarFormulario)
    $("#btnGuardar").click(guardarDatos)
    $("#btnBorrar").click(borrar)
    $("#btnModificar").click(modificar)
}

function insertar(){

    let pez ={
        id               : Math.round(Math.random()*10000),
        nombre           : $("#nombre").val(),
        nombreCientifico : $("#nombreCientifico").val(),
        temperatura      : $("#temperatura").val(),
        dureza           : $("#dureza").val(),
        //tipoAgua         : $("input:checked[name=tipoAgua]").val(), 
        tipoAgua         : $("[name=tipoAgua]").filter("input:checked").val(), 
        comida           : $("#comida").val(),
        numero           : $("#numeroPeces").val(), 
        comentarios      : $("#comentarios").val() 
    }

    peces.push(pez)

    console.log(peces)


}

function limpiarFormulario(){

}

function modificar(){

}

function borrar(){

}

function guardarDatos(){

}
 