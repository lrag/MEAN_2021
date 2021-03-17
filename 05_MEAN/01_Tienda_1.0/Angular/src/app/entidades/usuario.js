"use strict";
exports.__esModule = true;
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(_id, nombre, login, pw, idioma, correoE, telefono, direccion) {
        if (_id === void 0) { _id = null; }
        if (nombre === void 0) { nombre = null; }
        if (login === void 0) { login = null; }
        if (pw === void 0) { pw = null; }
        if (idioma === void 0) { idioma = null; }
        if (correoE === void 0) { correoE = null; }
        if (telefono === void 0) { telefono = null; }
        if (direccion === void 0) { direccion = null; }
        this._id = _id;
        this.nombre = nombre;
        this.login = login;
        this.pw = pw;
        this.idioma = idioma;
        this.correoE = correoE;
        this.telefono = telefono;
        this.direccion = direccion;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
