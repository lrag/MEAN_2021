import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';

@Component({
  selector: 'app-maquetacion-incidencias',
  templateUrl: './maquetacion-incidencias.component.html'
})
export class MaquetacionIncidenciasComponent implements OnInit {

  constructor(private autenticacionService:AutenticacionService,
              private router:Router) { 

    //Si el usuario no se ha autenticado y está trasteando con la barra de navegacion le mandamos
    //a la pantalla de login
    if(!autenticacionService.getUsuario()){
      console.log("NO AY HUSUARIO!")
      router.navigateByUrl("/usuarios/login")
      return
    }

    router.navigateByUrl("/incidencias/listadoIncidencias")
     
  }

  ngOnInit(): void {
  }

}


