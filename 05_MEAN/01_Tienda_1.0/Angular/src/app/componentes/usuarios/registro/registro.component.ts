import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/servicios/usuariosService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  public errorLoginRepetido
  
  public usuario:Usuario
  public confirmacionPw:string

  constructor(private router:Router,
              private sessionService:SessionService,
              private usuariosService:UsuariosService) { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
  }

  public siguiente():void{
    
    this.sessionService.setItem("usuario",this.usuario)

    //Navega
    this.router.navigateByUrl("/login/aceptacion")
  }


  private idTimer

  public programarTemporizador():void{
    if(this.idTimer){
      clearTimeout(this.idTimer)
    }
    this.idTimer = setTimeout(this.comprobarLogin.bind(this), 250)
  }

  public comprobarLogin():void{
    console.log("===========================")
    console.log(this)

    if(this.usuario.login.length < 5){
      return
    }

    /*
    this.usuariosService.comprobarLogin(this.usuario.login)
    .subscribe(
      function(data) {},
      function(error) {}
    )
    */
    this.usuariosService.comprobarLogin(this.usuario.login)
    .subscribe(
      data => {
        if(data.existe){
          this.errorLoginRepetido = "Ya existe un usario con este login"
        } else {
          this.errorLoginRepetido = null
        }
      },
      error => console.log(error)
    )
    
  }

}
