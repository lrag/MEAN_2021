import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';
//import { UsuariosService } from 'src/app/servicios/usuariosService';
import { UsuariosService } from 'src/app/modulo/usuarios/servicios/usuariosService';
@Component({
  selector: 'app-aceptacion-terminos',
  templateUrl: './aceptacion-terminos.component.html'
})
export class AceptacionTerminosComponent implements OnInit {

  public acepta:boolean
  public mensaje:string =""
  constructor(private router:Router,
              private sessionService:SessionService,
              private usuariosService:UsuariosService) { }

  ngOnInit(): void {
  }

 
  public registrar():void{
    
    if(!this.acepta){
      this.mensaje="Debe Aceptar los terminos para Avnzar..!"
      console.log('Has chequeado el checke')
      return
    }

    //cuando esta marcado el check box
    //let usuario:Usuario =JSON.parse(sessionStorage.getItem("usuario")) //cuado se devuelve en volver sin utilizar el servicio
    let usuario:Usuario = this.sessionService.getItem("usuario")
    console.log(usuario)
     //aJAX sin token

     this.usuariosService.altaUsuario(usuario)
     .subscribe(usuarioInsertado => this.router.navigateByUrl('/login'),
     error=>this.mensaje="No se pudo registrar, valide "
     )
     


  }
}
