import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-discos',
  templateUrl: './discos.component.html',
  styleUrls: ['./discos.component.css']
})
export class DiscosComponent implements OnInit {

  public disco :Disco   //Para el bidirectional binding del formulario
  public discos:Disco[] //Para la tabla

  constructor() { }

  ngOnInit(): void {
  }

  public insertarDisco():void{
  }

  public modificarDisco():void{
  }

  public borrarDisco():void{
  }

  public vaciarFormulario():void{
  }

  public seleccionarDisco():void{
  }

}
