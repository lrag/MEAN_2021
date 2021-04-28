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

  public empleados:any[]

  constructor(private usuariosService:UsuariosService) { 

    this.listarEmpleados()

  }

  ngOnInit(): void {
  }
  
  public listarEmpleados():void{
    this.usuariosService.listarUsuarios()
    .then( listado => this.empleados = listado)
    .catch( error => console.log(error))
  }

}
