import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
//import { CabeceraComponent } from "../../componentes/maquetacion/cabecera/cabecera.component";
//import { PieComponent } from "../../componentes/maquetacion/pie/pie.component";

import { MaquetacionTiendaComponent } from "./componentes/maquetacion-tienda/maquetacion-tienda.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { PerfilUsuariosComponent } from "../usuarios/componentes/perfil-usuarios/perfil-usuarios.component";
import { CestaComponent } from './componentes/cesta/cesta.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { DetallePedidoComponent } from "./componentes/detallePedido/detallePedido.component";
import { ConfirmacionCompraComponent } from "./componentes/confirmacion-compra/confirmacion-compra.component";



@NgModule({
    declarations: [
      //PieComponent,
      MenuComponent,
      MaquetacionTiendaComponent,
      CestaComponent,
      ProductoComponent,
      CatalogoComponent,
      DetallePedidoComponent,
      ConfirmacionCompraComponent
     
    ],
    imports: [
      BrowserModule,
      FormsModule, //para los [(ngModel)]
      ReactiveFormsModule, //formualrio reactivos
      //HttpClientModule, //para las peticiones ajx con el objeto HTTPClient
      RouterModule.forRoot(TiendaModule.rutasMaquetacionTienda)  ////Para los router outlet desde MOdule
     // UsuariosModule  ////Para los router y defuukmo la jerarquia de MOudle
    ],
    exports:[
        MaquetacionTiendaComponent
    ]
   
  })

export class TiendaModule{

  public static rutasMaquetacionTienda=[
    {
      path:'perfil',
      component: PerfilUsuariosComponent
      
    },
    {
      path      : 'catalogo',
      component : CatalogoComponent
    },
    
    {
      
      path:'cesta',
      component:CestaComponent
      
    },
    {
      
      path:'compra',
      component:ConfirmacionCompraComponent
      
    }
    
    
  ]
  
}