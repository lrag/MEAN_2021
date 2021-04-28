import { Component, OnInit } from '@angular/core';
import { Incidencia } from '../../entidades/incidencia';
import { IncidenciasService } from '../../servicios/incidenciasService';

@Component({
  selector: 'app-listado-incidencias',
  templateUrl: './listado-incidencias.component.html'
})
export class ListadoIncidenciasComponent implements OnInit {

  incidencias

  constructor(private incidenciasService:IncidenciasService) {
    this.listarIncidencias()
  }

  ngOnInit(): void {
  }

  public listarIncidencias(){
    this.incidenciasService.listar()
    .then( incidencias => this.incidencias = incidencias )
    .catch( error => console.log(error))
  }

}
