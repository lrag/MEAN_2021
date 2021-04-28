import { Component, OnInit } from '@angular/core';
import { Incidencia } from '../../entidades/incidencia';
import { IncidenciasService } from '../../servicios/incidenciasService';

@Component({
  selector: 'app-listado-incidencias',
  templateUrl: './listado-incidencias.component.html'
})
export class ListadoIncidenciasComponent implements OnInit {

  public incidencias:Incidencia[]

  public mensaje:string

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

  public modificarEstado(incidencia){

    //Podemos buscar el desplegable y sacarle el valor con document.getElementById()

    //Nos devuelven un HTMLElement, que es una clase genérica que representa cualquier tipo de nodo DOM
    let nodo:HTMLElement = document.getElementById("estado-"+incidencia._id)
    //Podemos hacer un cast y decogerlo en una nueva variable más específica
    let desplegable:HTMLInputElement = <HTMLInputElement> nodo
    //HTMLInputElement si que tiene la propiedad value
    let nuevoEstado:string = desplegable.value
    console.log("Estado:"+nuevoEstado)

    //Podemos pasar de las clases y hacerlo con 'any'
    let movida:any = document.getElementById("estado-"+incidencia._id)
    console.log(movida.value)

    //Pero gracias al [(ngModel)]="incidencia.estado" cuando el usuario cambia el estado
    //en el desplegable se lo cambia al objeto del array 'incidencias'

    this.incidenciasService.modificar(incidencia)
    .then( () => this.mensaje = "Incidencia modificada" )
    .catch( error => console.log(error))

  }

}


