import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { AceptacionTerminosComponent } from './componentes/usuarios/aceptacion-terminos/aceptacion-terminos.component';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';

import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { MenuComponent } from './componentes/maquetacion/menu/menu.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaquetacionLoginComponent } from './componentes/maquetacion/maquetacion-login/maquetacion-login.component';
import { MaquetacionTiendaComponent } from './componentes/maquetacion/maquetacion-tienda/maquetacion-tienda.component';
import { SessionService } from './servicios/sessionService';
import { AutenticacionService } from './servicios/autenticacionService';
import { InterceptorJWT } from './interceptores/interceptorJWT';


@NgModule({
  declarations: [
    PieComponent,
    AppComponent,
    MenuComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    CabeceraComponent,
    MaquetacionLoginComponent,
    MaquetacionTiendaComponent,
    AceptacionTerminosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,             //Para el [(ngModel)]
    ReactiveFormsModule,     //Para los formularios reactivos y las validaciones que tanto nos gustan y tanto nos entretienen
    HttpClientModule,        //Para las peticiones ajax con el objeto HttpClient
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet) //Para los router outlet
  ],
  providers: [
    //Para registrar un interceptor HTTP:
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptorJWT,
      multi : true
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static rutasMaquetacionLogin = [
    {
      path      : '',
      component : LoginComponent
    },
    {
      path      : 'registro',
      component : RegistroComponent
    },
    {
      path      : 'aceptacion',
      component : AceptacionTerminosComponent
    }
  ]
  
  public static rutasMaquetacionTienda = [
    {
      path      : 'perfil',
      component : PerfilComponent
    },
    /*{
      path      : 'catalago',
      component : CatalogoComponent
    },
    {
      path      : 'cesta',
      component : CestaComponent
    }  */
  ]
  
  //Estas rutas son para la primera carpeta de la url
  public static rutasPrimerRouterOutlet = [
      {
        path      : '',
        component : MaquetacionLoginComponent,
        children  : AppModule.rutasMaquetacionLogin
      },
      {
        path      : 'login',
        component : MaquetacionLoginComponent,
        children  : AppModule.rutasMaquetacionLogin
      },
      {
        path      : 'tienda',
        component : MaquetacionTiendaComponent,
        children  : AppModule.rutasMaquetacionTienda
      }
  ]
  

}
