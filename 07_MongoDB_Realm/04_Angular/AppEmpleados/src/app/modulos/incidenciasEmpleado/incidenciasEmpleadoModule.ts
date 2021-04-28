import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { PerfilComponent } from "../usuarios/componentes/perfil/perfil.component";
import { ListadoIncidenciasComponent } from "./componentes/listado-incidencias/listado-incidencias.component";
import { MaquetacionIncidenciasComponent } from "./componentes/maquetacion-incidencias/maquetacion-incidencias..component";
import { MenuComponent } from "./componentes/menu/menu.component";

@NgModule({
    declarations: [
      MenuComponent,
      ListadoIncidenciasComponent,
      MaquetacionIncidenciasComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, 
        RouterModule.forRoot(IncidenciasEmpleadoModule.rutasMaquetacionIncidencias)
    ],
    exports: [
      MaquetacionIncidenciasComponent
    ]
  })
export class IncidenciasEmpleadoModule {

    public static rutasMaquetacionIncidencias = [
      //
      //Rutas para la segunda carpeta de la barra del navegador:  
      //
      {
        path      : 'perfil',
        component : PerfilComponent
      },
      {
        path      : 'listadoIncidencias',
        component : ListadoIncidenciasComponent
      }
    ]
}