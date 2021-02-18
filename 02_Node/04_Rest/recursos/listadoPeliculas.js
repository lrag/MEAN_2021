
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
        `).appendTo("#tablaPeliculas")
    })    

}

function mostrarError(){
    console.log("Error!")
    console.log(arguments)
}

function inicializar(){
    console.log("Inicializando!")

    $("#btnActualizar").click(obtenerPeliculas)

    obtenerPeliculas()

}