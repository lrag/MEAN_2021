import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/servicios/usuariosService';

@Component({
  selector: 'app-aceptacion-terminos',
  templateUrl: './aceptacion-terminos.component.html'
})
export class AceptacionTerminosComponent implements OnInit {

  public acepta:boolean
  public mensaje:string = ""

  constructor(private sessionService:SessionService,
              private usuariosService:UsuariosService) { }

  ngOnInit(): void {
  }

  public registrar():void{

    if(!this.acepta){
      this.mensaje = "Debe aceptar los terminos para continuar"
      return //pa no seguir
    }

    //let usuario:Usuario = JSON.parse(sessionStorage.getItem("usuario"))
    let usuario:Usuario = this.sessionService.getItem("usuario")
    console.log(usuario)

    this.usuariosService.altaUsuario(usuario)
    .subscribe(
      usuarioInsertado => console.log(usuarioInsertado),
      error =>console.log(error)
    )
  }

}


