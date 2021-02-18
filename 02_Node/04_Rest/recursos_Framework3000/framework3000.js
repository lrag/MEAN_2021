
let framework3000 = {

    navegar : function(pagina, parametros){ 
           
        let contenido = paginas[pagina].crearContenido()
        $("body").html(contenido)

        paginas[pagina].inicializar(parametros)    
    }

}


