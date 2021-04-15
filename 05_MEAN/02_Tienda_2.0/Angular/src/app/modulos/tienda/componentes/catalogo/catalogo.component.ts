import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entidades/categoria';
import { CriterioBusquedaProducto } from '../../entidades/criterioBusquedaProducto';
import { Producto } from '../../entidades/producto';
import { CategoriasService } from '../../servicios/categoriasService';
import { ProductosService } from '../../servicios/productosService';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: []
})
export class CatalogoComponent implements OnInit {

  public categorias:Categoria[] //undefined
  public criterio:CriterioBusquedaProducto = new CriterioBusquedaProducto()
  public productos:Producto[] //undefined

  constructor(private productosService:ProductosService,
              private categoriasService:CategoriasService) { 
    this.listarProductos()
    this.listarCategorias()
  }

  ngOnInit(): void {
  }

  public listarCategorias():void {
    this.categoriasService.listarCategorias()
    .subscribe(
      categorias => this.categorias = categorias,
      error => { console.log(error) }
    )
  }

  public listarProductos():void{
    this.productosService.listarProductos(this.criterio)
    .subscribe(
      productos => this.productos = productos,
      error => console.log(error)
    )
  }

  public vaciarCriterio():void{
    this.criterio = new CriterioBusquedaProducto()
  }



}
