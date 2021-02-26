"use strict";
exports.__esModule = true;
exports.Disco = void 0;
var Disco = /** @class */ (function () {
    function Disco(id, titulo, grupo, year, genero, notas) {
        if (id === void 0) { id = null; }
        if (titulo === void 0) { titulo = null; }
        if (grupo === void 0) { grupo = null; }
        if (year === void 0) { year = null; }
        if (genero === void 0) { genero = null; }
        if (notas === void 0) { notas = null; }
        this.id = id;
        this.titulo = titulo;
        this.grupo = grupo;
        this.year = year;
        this.genero = genero;
        this.notas = notas;
        if (!id) {
            //this.id = Math.round(Math.random()*10000)
            this.id = Date.now();
            console.log(this.id);
        }
    }
    return Disco;
}());
exports.Disco = Disco;
/////////////////////////////////////////////////////////
var Direccion = /** @class */ (function () {
    function Direccion(ciudad, calle, numero) {
        if (ciudad === void 0) { ciudad = null; }
        if (calle === void 0) { calle = null; }
        if (numero === void 0) { numero = null; }
        this.ciudad = ciudad;
        this.calle = calle;
        this.numero = numero;
    }
    return Direccion;
}());
var Persona = /** @class */ (function () {
    function Persona(nombre, direccion, telefono) {
        if (nombre === void 0) { nombre = null; }
        if (direccion === void 0) { direccion = null; }
        if (telefono === void 0) { telefono = null; }
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }
    Persona.prototype.saludar = function () {
        console.log("Hola, soy " + this.nombre);
    };
    return Persona;
}());
var p1 = new Persona("Templeton Peck", new Direccion("L.A.", "C/Tal", "12"), "555111222");
var p2 = new Persona("John McClane", new Direccion("N.Y.", "C/Pascual", "12"), "555666444");
console.log(p1.direccion.ciudad);
console.log(p2.direccion.ciudad);
var dir = new Direccion("Minganillas", "C/SANA", "12");
var p3 = new Persona("Fulanito", dir, "123");
var p4 = new Persona("Fulanita", dir, "321");
p4.direccion.ciudad = "Santa Pola";
console.log(p3.direccion.ciudad);
console.log(p4.direccion.ciudad);
console.log("=================================");
var p5 = Object.create(p1);
p5.nombre = "Menganito";
p5.direccion.ciudad = "Las Pedroñeras";
console.log(p5.nombre);
console.log(p5.direccion.ciudad);
console.log(p1.nombre);
console.log(p1.direccion.ciudad);
var p6 = new Persona(p2.nombre, new Direccion(p2.direccion.ciudad, p2.direccion.calle, p2.direccion.numero), p2.telefono);
p6.saludar();
var p7 = JSON.parse(JSON.stringify(p2));
console.log("=================================");
console.log(p2);
console.log(p7);
try {
    p7.saludar();
}
catch (e) {
    console.log("No tiene saludar()!");
}
Object.setPrototypeOf(p7, Persona.prototype);
p7.saludar();
console.log(p7);
