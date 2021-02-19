
let idPeliculaSel = null

function vaciarFormulario(){
    $("#formulario input,select,textarea").val("")
    idPeliculaSel = null
    modoInsercion()
}

function verListado(){
    window.location.href = './listadoPeliculas.html'
}

//Crea un objeto con los datos del formulario
function crearPelicula(){
    return {
        titulo   : $("#titulo").val(),
        director : $("#director").val(),
        genero   : $("#genero").val(),
        year     : $("#year").val(),
        sinopsis : $("#sinopsis").val()
    }
}

function insertarPelicula(){

    //Validar...

    let pelicula = crearPelicula()

    $.ajax({
        type : "POST",
        url  : "/peliculas",
        contentType : 'application/json',
        data : JSON.stringify(pelicula)
    })
    .done(verListado)
    .fail(mostrarError)
}

function mostrarError(){
    console.log("ERROR!")
}

function obtenerPelicula(idPelicula){
    $.ajax({
        url : '/peliculas/'+idPelicula
    })
    .done(rellenarFormulario)
    .fail(mostrarError)

}

function rellenarFormulario(pelicula){

    //$("#titulo").val(pelicula.titulo)
    //$("#director").val(pelicula.director)
    //$("#genero").val(pelicula.genero)
    //$("#year").val(pelicula.year)
    //$("#sinopsis").val(pelicula.sinopsis)

    idPeliculaSel = pelicula._id

    //Qué cosas...
    with(pelicula){
        $("#titulo").val(titulo)
        $("#director").val(director)
        $("#genero").val(genero)
        $("#year").val(year)
        $("#sinopsis").val(sinopsis)        
    }

    modoSeleccion()
}

function modificarPelicula(){
    let pelicula = crearPelicula()
    pelicula._id = idPeliculaSel   
    
    $.ajax({
        type        : "PUT",
        url         : "/peliculas/"+idPeliculaSel,
        contentType : "application/json",
        data        : JSON.stringify(pelicula)
    })
    .done(verListado)
    .fail(mostrarError)    
}

function borrarPelicula(){    
    $.ajax({
        type : "DELETE",
        url  : "/peliculas/"+idPeliculaSel
    })
    .done(verListado)
    .fail(mostrarError)
}

function modoInsercion(){
    $("#btnInsertar").prop('disabled', false)
    $("#btnModificar").prop('disabled', true)
    $("#btnBorrar").prop('disabled', true)
}

//Para cuando el usuario selecciona una película
function modoSeleccion(){
    $("#btnInsertar").prop('disabled', true)
    $("#btnModificar").prop('disabled', false)
    $("#btnBorrar").prop('disabled', false)
}

$(inicializar)
function inicializar(){
    $("#btnInsertar").click(insertarPelicula)
    $("#btnModificar").click(modificarPelicula)
    $("#btnBorrar").click(borrarPelicula)
    $("#btnVaciar").click(vaciarFormulario)
    $("#btnVolver").click(verListado)

    //Por defecto 'empezamos en modoInserccion'
    modoInsercion()

    //Averiguamos si nos han pasado un id de pelicula
    //para rellenar el formulario
    let trozos = window.location.href.split("?")
    if(trozos.length == 2){
        let id = trozos[1].split("=")[1]
        obtenerPelicula(id)
    }
}


