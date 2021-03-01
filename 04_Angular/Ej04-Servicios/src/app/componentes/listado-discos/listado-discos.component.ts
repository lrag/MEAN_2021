import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-listado-discos',
  templateUrl: './listado-discos.component.html'
})
export class ListadoDiscosComponent implements OnInit {

  public discos:Disco[] //undefined

  constructor() {
    console.log("Creando ListadoDiscosComponent")
  }

  ngOnInit(): void {
  }

}
