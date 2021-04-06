//import { ngfactoryFilePath } from "@angular/compiler/src/aot/util";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
//import { AppComponent } from "../../app.component";
import { UsuariosLoginComponent } from "./componentes/usuarios-login/usuarios-login.component";
import { AceptacionTerminosComponent } from "./componentes/aceptacion-terminos/aceptacion-terminos.component";
import { RegistroComponent } from "./componentes/registro/registro.component";
import { PerfilUsuariosComponent } from "./componentes/perfil-usuarios/perfil-usuarios.component";
//import { CabeceraComponent } from "../../componentes/maquetacion/cabecera/cabecera.component";
import { MaquetacionLoginComponent } from "./maquetacion-login/maquetacion-login.component";


@NgModule({
    declarations: [
        //AppComponent,
        UsuariosLoginComponent,
        RegistroComponent,
        PerfilUsuariosComponent,
        //PerfilComponent,
       // CabeceraComponent,
        MaquetacionLoginComponent,
        AceptacionTerminosComponent,
        //MaquetacionTiendaComponent,
        //AceptacionTerminosComponent
      ],
      exports:[
        PerfilUsuariosComponent,
        MaquetacionLoginComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule, //para los [(ngModel)]
        ReactiveFormsModule, //formualrio reactivos
     //   HttpClientModule, //para las peticiones ajx con el objeto HTTPClient
        RouterModule.forRoot(UsuariosModule.rutasMaquetacionLogin) ////Para los router outlet desde MOdule
      ],
      providers: [
        //Para registrar un interceptor HTTP se encarag el modulo suypero
      ],
      bootstrap: []

})

export class UsuariosModule {

//las rutas para el router outlet que hay en maquetacion
  public static rutasMaquetacionLogin=[
  
    {
      path:'login',
      component:UsuariosLoginComponent
    },
    {
      path:'registro',
      component:RegistroComponent
    },
    {
      path:'aceptacion',
      component:AceptacionTerminosComponent
    }
   
  ]
}
