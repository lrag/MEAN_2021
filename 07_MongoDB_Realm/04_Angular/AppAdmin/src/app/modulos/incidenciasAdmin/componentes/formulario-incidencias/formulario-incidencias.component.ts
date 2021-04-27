import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario';
import { UsuariosService } from 'src/app/modulos/usuarios/servicios/usuariosService';
import { Incidencia } from '../../entidades/incidencia';

@Component({
  selector: 'app-formulario-incidencias',
  templateUrl: './formulario-incidencias.component.html'
})
export class FormularioIncidenciasComponent implements OnInit {

  public incidencia:Incidencia
  public listaEmpleados:Usuario[]

  constructor(private usuariosService:UsuariosService) {

    this.incidencia = new Incidencia()
    this.incidencia.usuario = new Usuario()
    console.log(this.incidencia)

    usuariosService.listarUsuarios()
    .then( listaUsuarios => this.listaEmpleados=listaUsuarios)
    .catch( error => console.log(error) )

  }

  ngOnInit(): void {
  }

  public insertar():void{

    console.log(this.incidencia)

  }
  
  public modificar():void{

  }

  public borrar():void{

  }

  public vaciar():void{

  }

}
