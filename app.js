const express = require("express")
const app = express();

const bodyParser = require("body-parser");

// Middleware
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
