import { Component, OnInit } from '@angular/core';

import { CriterioBusquedaProducto } from '../../entidades/criterioBusquedaProducto';
import { Producto } from '../../entidades/producto'
import { ProductosService } from '../../servicios/productosService';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: []
})
export class CatalogoComponent implements OnInit {

  public criterio:CriterioBusquedaProducto = new CriterioBusquedaProducto()

  public productos:Producto[] //undefined

 
  constructor(private productosService:ProductosService) { 
    this.listarProductos()
  }

  ngOnInit(): void {
  }

  public listarProductos():void{
    this.productosService.listarProductos()
    .subscribe(
      productos => this.productos = productos,
      error => console.log(error)
    )
  }

  public vaciarCriterio():void{
    this.criterio = new CriterioBusquedaProducto()
  }



}