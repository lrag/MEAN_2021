import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';

@Component({
  selector: 'app-maquetacion-tienda',
  templateUrl: './maquetacion-tienda.component.html'
})
export class MaquetacionTiendaComponent implements OnInit {

  constructor(private autenticacionService:AutenticacionService,
              private router:Router) { 

    //Si el usuario no se ha autenticado y está trasteando con la barra de navegacion le mandamos
    //a la pantalla de login
    if(!autenticacionService.getUsuario()){
      router.navigateByUrl("/usuarios/login")
      return
    }    
    
    router.navigate([
      "/tienda",
      {
        outlets : {
          //clave: nombre del router outlet
          //valor: ruta a aplicar
          'primary' : ['catalogo'],
          'izq'     : ['barraIzq'],
          'der'     : ['resumenCesta']
        }
      }
    ], { skipLocationChange : true })
    

  }

  ngOnInit(): void {
  }

}


