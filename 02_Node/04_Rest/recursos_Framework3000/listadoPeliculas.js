
let listadoPeliculas = {

    crearContenido :
        function (){
            $("body")
            .append(    
                `<div class="text-center page-header">
                    <h2 class="mt-4 mb-4">Aplicación de gestion de películas GestPeliculas 3000</h2>
                </div>   
                
                <div class="navbar navbar-expand-sm bg-dark navbar-dark">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Peliculas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Directores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Actores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Salir</a>
                        </li>
                    </ul>
                </div> 
                
                <h3 class="text-center mt-3 mb-3">
                    Formulario de películas
                </h3>`
                )

                inicializar()
        },

    inicializar : 
        function (){
            console.log("Inicializando!")
            
            $("#btnActualizar").click(obtenerPeliculas)
            $("#btnNuevo").click(verFormulario)
            
            obtenerPeliculas()
            
        },

    obtenerPeliculas : 
        function (){
            $.ajax({
                url : './peliculas'
            })
            .done(rellenarTablaPeliculas)
            .fail(mostrarError)
        },

    rellenarTablaPeliculas : 
        function (peliculas){            
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
        },

    mostrarError : function(){
        console.log("Error!")
        console.log(arguments)
    },

    verFormulario : function(){
        //Para cambiar desde JS la barra del navegador
        window.location.href = "/formularioPeliculas.html"
    }
    
}


