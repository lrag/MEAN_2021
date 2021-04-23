import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { PerfilComponent } from "../usuarios/componentes/perfil/perfil.component";
import { RegistroComponent } from "../usuarios/componentes/registro/registro.component";
import { MaquetacionIncidenciasComponent } from "./componentes/maquetacion-incidencias/maquetacion-incidencias..component";
import { MenuComponent } from "./componentes/menu/menu.component";

@NgModule({
    declarations: [
      MenuComponent,
      MaquetacionIncidenciasComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, 
        RouterModule.forRoot(IncidenciasAdminModule.rutasMaquetacionIncidencias)
    ],
    exports: [
      MaquetacionIncidenciasComponent
    ]
  })
export class IncidenciasAdminModule {

    public static rutasMaquetacionIncidencias = [
      //
      //Rutas para la segunda carpeta de la barra del navegador:  
      //
      {
        path      : 'perfil',
        component : PerfilComponent
      },
      {
        path      : 'empleados',
        component : RegistroComponent
      }
      //path : incidencias
    ]
}