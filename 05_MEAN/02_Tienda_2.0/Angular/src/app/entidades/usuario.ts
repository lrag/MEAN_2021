import { LoginComponent } from "../componentes/usuarios/login/login.component"


export class Usuario {

    public constructor(
        public _id       : string = null,
        public nombre    : string = null,
        public login     : string = null,
        public pw        : string = null,
        public idioma    : string = null,
        public correoE   : string = null,
        public telefono  : string = null,
        public direccion : string = null
    ){}


}
