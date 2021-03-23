import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacionService';
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

  public entrar():void{
    this.autenticacionService.login(this.usuario)
    .subscribe(
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
