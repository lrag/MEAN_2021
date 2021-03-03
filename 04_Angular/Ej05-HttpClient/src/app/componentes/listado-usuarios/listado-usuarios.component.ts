import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@Angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html'
})
export class ListadoUsuariosComponent implements OnInit {

  public usuarios:any[] = []

 constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  public listarUsuarios():void{

    //this.httpClient.get("URL", headers?):Observable
    //                delete
    //
    //this.httpCliente.post("USR", body?, headers?):Observable

    /*
    //Sin función flecha
    let that = this
    let obs:Observable<any> = this.httpClient.get("https://reqres.in/api/users?delay=3")
    obs.subscribe(
      function(resultado){
        console.log(resultado.data)
        //Aqui this no es el componente
        //this.usuarios = resultado.data
        that.usuarios = resultado.data
      },
      function(error){
        console.log(error)
      }
    )
    */

    //Con función flecha (más sucinto)
    let obs:Observable<any> = this.httpClient.get("https://reqres.in/api/users?delay=3")
    obs.subscribe(
      resultado => this.usuarios = resultado.data,
      error     => console.log(error)
    )
    
  }

  //Experimento de [src]
  //------------------------------------
  public rutaImagen:string = ""

  public imagen1():void{
    this.rutaImagen = "https://reqres.in/img/faces/6-image.jpg"
  }

  public imagen2():void{
    this.rutaImagen = "https://reqres.in/img/faces/2-image.jpg"
  }


}
