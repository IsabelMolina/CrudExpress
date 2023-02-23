const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const petsRoute = require('./router/pets');
const port = 3000;

const uri = `mongodb+srv://vet-usr:vet-pwd@cluster0.zd7k6.mongodb.net/vet?retryWrites=true&w=majority`
mongoose.connect(uri, { useUnifiedTopology: true });

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));
app.use('/pets', petsRoute);

app.listen(port, () => {
  console.log('Servidor a su servicio en el puerto', port);
});
