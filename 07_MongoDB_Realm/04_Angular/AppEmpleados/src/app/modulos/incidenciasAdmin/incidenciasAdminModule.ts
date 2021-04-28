import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ListadoUsuariosComponent } from "../usuarios/componentes/listadoUsuarios/listado-usuarios.component";
import { PerfilComponent } from "../usuarios/componentes/perfil/perfil.component";
import { RegistroComponent } from "../usuarios/componentes/registro/registro.component";
import { FormularioIncidenciasComponent } from "./componentes/formulario-incidencias/formulario-incidencias.component";
import { ListadoIncidenciasComponent } from "./componentes/listado-incidencias/listado-incidencias.component";
import { MaquetacionIncidenciasComponent } from "./componentes/maquetacion-incidencias/maquetacion-incidencias..component";
import { MenuComponent } from "./componentes/menu/menu.component";

@NgModule({
    declarations: [
      MenuComponent,
      ListadoIncidenciasComponent,
      FormularioIncidenciasComponent,
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
        path      : 'registroEmpleado',
        component : RegistroComponent
      },
      {
        path      : 'empleados',
        component : ListadoUsuariosComponent
      },
      {
        path      : 'listadoIncidencias',
        component : ListadoIncidenciasComponent
      },
      {
        path      : 'formularioIncidencias',
        component : FormularioIncidenciasComponent
      }
      //path : incidencias
    ]
}