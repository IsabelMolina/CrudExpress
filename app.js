/*const {frutas, dinero} = require("./frutas");

frutas.forEach((fruta) => {
  console.count(fruta);
});

console.log("mi dinero actual: ", dinero);

var cowsay = require("cowsay");
console.log(
  cowsay.say({
    text: "I'm a moooodule",
    e: "Oo",
    T: "U",
  })
);*/

/*const http = require("http");
const server = http.createServer((req, res) =>{
  res.end("Estoy respondiendo a tu solicitud");
});

const port = 3000;
server.listen(port, ()=>{
  console.log("Escuchando solicitudes");
})*/

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config();

const port = process.env.PORT || 3000;

// conexion base de datos
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zd7k6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Base de datos conectada"))
.catch(e=>console.log(e))

// motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname+"/views");

// Middleware (accion que se ejecuta antes de nuestra funcion de ruta)
app.use(express.static(__dirname + "/public"));

app.use('/', require('./router/web'));
app.use('/mascotas', require('./router/mascotas'));

/*app.get("/", (req, res) => {
  res.render("index", {titulo: "mi titulo dinamico"});
});*/

/*app.get("/servicios", (req, res) => {
  //res.send("Estas en la pagina de servicios");
  res.render("servicios", {titulo: "Este es un titulo dinamico de servicios"})
});*/

app.use((req, res, next) => {
  // res.status(404).send("Sorry cant find that!");
  // res.status(404).sendFile(__dirname + "/public/404.html");
  res.status(404).render("404", {
    titulo: 404,
    descripcion: "Pagina no encontrada"
  });
});

app.listen(port, () => {
  console.log('Servidor a su servicio en el puerto', port);
});
