import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/modulos/usuarios/servicios/usuariosService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  public errorLoginRepetido
  
  public usuario:Usuario
  public confirmacionPw:string

  constructor(private router:Router,
              private usuariosService:UsuariosService) { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
  }

  public guardar():void{
    
  }

}
