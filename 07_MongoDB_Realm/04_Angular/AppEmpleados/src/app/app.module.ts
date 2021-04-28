import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaquetacionLoginComponent } from './modulos/usuarios/componentes/maquetacion-login/maquetacion-login.component';
import { UsuariosModule } from './modulos/usuarios/usuariosModule';
import { IncidenciasEmpleadoModule } from './modulos/incidenciasEmpleado/incidenciasEmpleadoModule';
import { MaquetacionIncidenciasComponent } from './modulos/incidenciasEmpleado/componentes/maquetacion-incidencias/maquetacion-incidencias..component';

@NgModule({
  declarations: [
    PieComponent,
    AppComponent,
    CabeceraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,             //Para el [(ngModel)]
    ReactiveFormsModule,     //Para los formularios reactivos y las validaciones que tanto nos gustan y tanto nos entretienen
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet), //Para los router outlet
    UsuariosModule,
    IncidenciasEmpleadoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  //Estas rutas son para la primera carpeta de la url
  public static rutasPrimerRouterOutlet = [     
      //{
      //  path      : '**',  
      //  component : CuatrocientosCuatroComponent 
      //},
      {
        path      : '',   
        redirectTo: '/usuarios/login', 
        pathMatch : 'full' 
      },
      {
        path      : 'usuarios',
        component : MaquetacionLoginComponent,
        children  : UsuariosModule.rutasMaquetacionLogin
      },
      {
        path      : 'incidencias',
        component : MaquetacionIncidenciasComponent,
        children  : IncidenciasEmpleadoModule.rutasMaquetacionIncidencias
      }
  ]
  
}




