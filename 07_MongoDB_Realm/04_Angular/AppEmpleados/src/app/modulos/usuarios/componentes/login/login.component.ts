import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario';
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';
import { SessionService } from 'src/app/servicios/sessionService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public usuario:Usuario
  public mensaje:string

  constructor(private autenticacionService:AutenticacionService,
              private router:Router) { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
  }

  public introPulsado(evento){
    if(evento.keyCode != 13){
        return
    }
    this.entrar()    
  }

  public entrar():void{
    this.autenticacionService.login(this.usuario)
    .then( () => {
        this.router.navigateByUrl("/incidencias")
    })
    .catch(error => {
        this.mensaje = error.mensaje
    })
  }

}
