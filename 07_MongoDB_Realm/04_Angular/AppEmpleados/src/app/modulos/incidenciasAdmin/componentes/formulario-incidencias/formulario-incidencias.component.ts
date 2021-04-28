import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario';
import { UsuariosService } from 'src/app/modulos/usuarios/servicios/usuariosService';
import { Incidencia } from '../../entidades/incidencia';
import { IncidenciasService } from '../../servicios/incidenciasService';

@Component({
  selector: 'app-formulario-incidencias',
  templateUrl: './formulario-incidencias.component.html'
})
export class FormularioIncidenciasComponent implements OnInit {

  public mensajes:string[] = []
  public incidencia:Incidencia
  public listaEmpleados:Usuario[]

  constructor(private usuariosService:UsuariosService,
              private incidenciasService:IncidenciasService,
              private router:Router) {

    this.incidencia = new Incidencia()
    this.listarUsuarios()
  }

  ngOnInit(): void {
  }

  public listarUsuarios(){
    this.usuariosService.listarUsuarios()
    .then( listaUsuarios => this.listaEmpleados=listaUsuarios)
    .catch( error => console.log(error) )
  }

  public insertar():void{

    this.mensajes = []
    if(!this.incidencia.usuario){
      this.mensajes.push("Seleccione el empleado")
    }
    if(!this.incidencia.nombre || this.incidencia.nombre.trim() == ""){
      this.mensajes.push("La incidencia debe tener nombre")
    }
    if(!this.incidencia.fecha || this.incidencia.fecha.trim() == ""){
      this.mensajes.push("La incidencia debe tener una fecha")
    }
    if(this.mensajes.length > 0){
      return
    }

    this.incidenciasService.insertar(this.incidencia)
    .then( incidenciaInsertada => this.router.navigateByUrl("/incidencias/listadoIncidencias"))
    .catch( error => {
      console.log(error)
      this.mensajes.push("Fallo al insertar")
    })
  }
  
  public modificar():void{

  }

  public borrar():void{

  }

  public vaciar():void{
    this.incidencia = new Incidencia()
  }

}
