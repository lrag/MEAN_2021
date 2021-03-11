import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  //mensaje?
  public usuario:Usuario
  public confirmacionPw:string

  constructor(private router:Router,
              private sessionService:SessionService) { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
  }

  public siguiente():void{
    
    this.sessionService.setItem("usuario",this.usuario)

    //Navega
    this.router.navigateByUrl("/login/aceptacion")
  }

}
