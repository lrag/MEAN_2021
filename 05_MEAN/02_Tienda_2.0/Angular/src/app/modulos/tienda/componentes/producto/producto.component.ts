import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../entidades/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  //Este componente recibe el valor 'producto' via selector
  @Input()
  public producto:Producto = new Producto()

  constructor() { }

  ngOnInit(): void {
  }

}
