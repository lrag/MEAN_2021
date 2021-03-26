import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: []
})
export class CatalogoComponent implements OnInit {

  public productos:Producto[]


  constructor() { }

  ngOnInit(): void {
  }

}
