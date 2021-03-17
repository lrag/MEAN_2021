import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';

@Component({
  selector: 'app-aceptacion-terminos',
  templateUrl: './aceptacion-terminos.component.html'
})
export class AceptacionTerminosComponent implements OnInit {

  constructor(private sessionService:SessionService) { }

  ngOnInit(): void {
  }

  public registrar():void{

    if()


    //let usuario:Usuario = JSON.parse(sessionStorage.getItem("usuario"))
    let usuario:Usuario = this.sessionService.getItem("usuario")
    console.log(usuario)
    //AJAX

  }

}
