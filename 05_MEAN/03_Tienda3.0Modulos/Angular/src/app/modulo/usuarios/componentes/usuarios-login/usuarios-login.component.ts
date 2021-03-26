import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';


//import { SessionService } from 'src/app/servicios/sessionService';
import { Usuario } from '../../entidades/usuario';
import { AutenticacionService } from '../../servicios/autenticacionService';

//nota este es login en el proyecto base del Prof
@Component({
  selector: 'app-usuarios-login',
  templateUrl: './usuarios-login.component.html'
})
export class UsuariosLoginComponent implements OnInit {
  
  //se decidira utilziar o no en le formualrio como objeto
  //se necesitara un mensaje patra mostrar al usuario
    public usuario:Usuario //asi lo tiene undfined
    public mensaje:string


  constructor(private autenticacionService:AutenticacionService,
              private router:Router
              //private sessionService:SessionService
              ) { 
    this.usuario=new Usuario()
  }

  ngOnInit(): void {
  }

  public entrar():void{
    this.autenticacionService.login(this.usuario)
    .subscribe(
      //data => {
      () => {
        this.router.navigateByUrl("/tienda/perfil")
      },
      error => {
        console.log(error)
        this.mensaje = "Credenciales incorrectas"
      }
    )
  }
}
  /*
      public entrar():void{
      
        this.autenticacionService.login(this.usuario)
        .subscribe(
          data=>{
            //console.log(data)
            ()=>{
              //
            this.router.navigateByUrl("/tienda/perfil")
            },
            //gaudar token y se guarda mientras estes navegando
            //this.sessionService.setItem("JWT",data.JWT)
            //this.sessionService.setItem("usuario",data.usuario)
          error=>{
            console.log(error)
            
            //
            this.mensaje="Credenciales Incorrectas..!"
          }
        
      }
  */

  
  /*
    public irARegistro():void{
    //esta funcion no es necesario porque va director con el routerlink 
    }
*/


