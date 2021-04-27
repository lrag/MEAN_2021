
export class Usuario {

    public constructor(
        public id        : string = null, 
        public correoE   : string = null,
        public pw        : string = null,
        public nombre    : string = null,
        public direccion : string = null,
        public telefono  : string = null,
        public rol       : string = null
    ){}

}

/*

users

{
    _id : 1234,
    email : a@b.c,
    pw : ??
}

usuarios (user custom data)

{
    _id : 4567
    nombre : Harry
    dir
    tel
    ROL
    idUsuario : 1234
}

incidencia

{
    _id : 1357
    nombre : aaa
    descripcion : bbb
    usuario : {
        id : 1234
        nombre : Harry
    }
}

RULE:

{
  "usuario.id" : "%%user.id"
}


*/