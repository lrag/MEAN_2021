import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/modulos/usuarios/servicios/usuariosService';

@Component({
  selector: 'app-registro',
  templateUrl: './listado-usuarios.component.html'
})
export class ListadoUsuariosComponent implements OnInit {


  constructor() { 
  }

  ngOnInit(): void {
  }

}
