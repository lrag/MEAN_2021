import { ngfactoryFilePath } from "@angular/compiler/src/aot/util";
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

@NgModule({
    declarations: [
      MenuComponent,
      CestaComponent,
      CatalogoComponent,
      ProductoComponent,
      MaquetacionTiendaComponent
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
        {
          path      : 'perfil',
          component : PerfilComponent
        },
        {
          path      : 'catalogo',
          component : CatalogoComponent
        },
        /*{
          path      : 'cesta',
          component : CestaComponent
        }  
        */
      ]
}