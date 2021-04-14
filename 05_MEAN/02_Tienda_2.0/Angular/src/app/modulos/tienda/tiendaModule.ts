import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { PerfilComponent } from "../usuarios/componentes/perfil/perfil.component";
import { MaquetacionTiendaComponent } from "./componentes/maquetacion-tienda/maquetacion-tienda.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { CestaComponent } from './componentes/cesta/cesta.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CatalogoComponent } from "./componentes/catalogo/catalogo.component";
import { DetallePedidoComponent } from "./componentes/detallePedido/detallePedido.component";
import { ConfirmacionCompraComponent } from "./componentes/confirmacion-compra/confirmacion-compra.component";
import { ListadoPedidosComponent } from "./componentes/listado-pedidos/listado-pedidos.component";
import { ResumenCestaComponent } from "./componentes/resumen-cesta/resumen-cesta.component";
import { BarraIzquierdaComponent } from "./componentes/barra-izquierda/barra-izquierda.component";

@NgModule({
    declarations: [
      MenuComponent,
      CestaComponent,
      CatalogoComponent,
      ProductoComponent,
      ResumenCestaComponent,
      DetallePedidoComponent,
      BarraIzquierdaComponent,
      ListadoPedidosComponent,
      MaquetacionTiendaComponent,
      ConfirmacionCompraComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, 
        RouterModule.forRoot(TiendaModule.rutasMaquetacionTienda)
    ],
    exports: [
        MaquetacionTiendaComponent
    ]
  })
export class TiendaModule {

    public static rutasMaquetacionTienda = [
      //
      //Rutas para la segunda carpeta de la barra del navegador:  
      //
      {
        path      : 'perfil',
        component : PerfilComponent
      },
      {
        path      : 'catalogo',
        component : CatalogoComponent
      },
      {
        path      : 'cesta',
        component : CestaComponent
      },
      {
        path      : 'compra',
        component : ConfirmacionCompraComponent
      },
      {
        path      : 'pedidos',
        component : ListadoPedidosComponent
      },
      //  
      //Rutas para los named router outlets
      //
      {
        outlet    : 'izq',
        path      : 'barraIzq',
        component : BarraIzquierdaComponent
        //pueden tener 'children' 
      },
      {
        outlet    : 'der',
        path      : 'resumenCesta',
        component : ResumenCestaComponent
        //pueden tener 'children' 
      },

    ]
}