import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//En este decorador le explicamos a Angular en qué consiste exactametne nuestro módulo
@NgModule({
  //En declarations colocamos una lista exhaustiva de los componentes
  //presentes en el módulo
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //Si queremos el bidirectional binding y los [(ngModel)] debemos incluir 'FormsModule'
    FormsModule 
  ],
  providers: [],
  //En boostrap colocamos el componente cuyo selecctor va a aparecer en index.html
  bootstrap: [AppComponent]
})
export class AppModule { }
