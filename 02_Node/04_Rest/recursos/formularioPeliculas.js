
function vaciarFormulario(){
    $("#formulario input,select,textarea").val("")
}

function verListado(){
    window.location.href = './listadoPeliculas.html'
}

function insertarPelicula(){

    //Validar...

    let pelicula = {
        titulo   : $("#titulo").val(),
        director : $("#director").val(),
        genero   : $("#genero").val(),
        year     : $("#year").val(),
        sinopsis : $("#sinopsis").val()
    }

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

    //Qué cosas...
    with(pelicula){
        $("#titulo").val(titulo)
        $("#director").val(director)
        $("#genero").val(genero)
        $("#year").val(year)
        $("#sinopsis").val(sinopsis)        
    }

}

$(inicializar)
function inicializar(){
    $("#btnInsertar").click(insertarPelicula)
    //$("#btnModificar").click(mofidicarPelicula)
    //$("#btnBorrar").click(borrarPelicula)
    $("#btnVaciar").click(vaciarFormulario)
    $("#btnVolver").click(verListado)

    //Averiguamos si nos han pasado un id de pelicula
    //para rellenar el formulario
    let trozos = window.location.href.split("?")
    if(trozos.length == 2){
        let id = trozos[1].split("=")[1]
        obtenerPelicula(id)
    }
}


