
let listadoPeliculas = {

    crearContenido :
        function (){
            return ` 
            <div class="text-center page-header">
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
                Listado de películas
            </h3>
        
            <div class="row">
        
                <div class="col-sm-12 offset-sm-0 col-md-8 offset-md-2">
        
                    <div class="text-center">
                        <input type="button" id="btnNuevo"      class="btn btn-primary" value="Nuevo"/>
                        <input type="button" id="btnActualizar" class="btn btn-primary" value="Actualizar"/>
                    </div>
        
                    <br/>
        
                    <table class="table table-hover table-striped">    
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Director</th>
                                <th>Género</th>
                                <th>Año</th>
                            </tr>
                        </thead>
                        <tbody id="tablaPeliculas"></tbody>
                    </table>
                </div>
            </div>                
            `            
        },

    inicializar : 
        function (){
            console.log("Inicializando listadoPeliculas")
            
            $("#btnActualizar").click(this.obtenerPeliculas)
            $("#btnNuevo").click(this.verFormulario)
            
            this.obtenerPeliculas()            
        },

    obtenerPeliculas : 
        function (){
            $.ajax({
                url : './peliculas'
            })
            .done(this.rellenarTablaPeliculas)
            .fail(this.mostrarError)
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
                `)
                .click(function(){
                    listadoPeliculas.seleccionarPelicula(pelicula._id)
                })
                .appendTo("#tablaPeliculas")
            }) 
        },            

    mostrarError : function(){
        console.log("Error!")
        console.log(arguments)
    },

    seleccionarPelicula : function(idPelicula){
        framework3000.navegar("formularioPeliculas", { idPelicula : idPelicula })
    },    

    verFormulario : function(){
        framework3000.navegar("formularioPeliculas")
    }
    
}


