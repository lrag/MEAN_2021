import { ngfactoryFilePath } from "@angular/compiler/src/aot/util";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ListadoUsuariosComponent } from "./componentes/listadoUsuarios/listado-usuarios.component";
import { LoginComponent } from "./componentes/login/login.component";
import { MaquetacionLoginComponent } from "./componentes/maquetacion-login/maquetacion-login.component";
import { PerfilComponent } from "./componentes/perfil/perfil.component";
import { RegistroComponent } from "./componentes/registro/registro.component";

@NgModule({
    declarations: [
      LoginComponent,
      PerfilComponent,
      RegistroComponent,
      ListadoUsuariosComponent,
      MaquetacionLoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(UsuariosModule.rutasMaquetacionLogin)
    ],
    exports: [
        PerfilComponent,
        RegistroComponent,
        ListadoUsuariosComponent,
        MaquetacionLoginComponent
    ]
  })
export class UsuariosModule {

    //Estas son las rutas para el router outlet que hay en MaquetacionLoginComponent
    public static rutasMaquetacionLogin = [
        {
          path      : 'login',
          component : LoginComponent
        }
    ]

}