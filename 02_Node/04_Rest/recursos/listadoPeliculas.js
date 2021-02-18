$(inicializar)

function obtenerPeliculas(){
    $.ajax({
        url : './peliculas'
    })
    .done(rellenarTablaPeliculas)
    .fail(mostrarError)
}

function rellenarTablaPeliculas(peliculas){
    $("#tablaPeliculas").html('')
    $(peliculas).each(function(pos, pelicula){
        $(`
        <tr>
            <td>${pelicula.titulo}</td>
            <td>${pelicula.director}</td>
            <td>${pelicula.genero}</td>
            <td>${pelicula.year}</td>
        </tr>   
        `)
        .click(function(){
            seleccionarPelicula(pelicula._id)
        })
        .appendTo("#tablaPeliculas")
    }) 
}

function mostrarError(){
    console.log("Error!")
    console.log(arguments)
}

function seleccionarPelicula(idPelicula){
    window.location.href = '/formularioPeliculas.html?idPelicula='+idPelicula
}

function verFormulario(){
    //Para cambiar desde JS la barra del navegador
    window.location.href = "/formularioPeliculas.html"
}

function inicializar(){
    console.log("Inicializando!")

    $("#btnActualizar").click(obtenerPeliculas)
    $("#btnNuevo").click(verFormulario)

    obtenerPeliculas()

}