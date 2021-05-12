const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {titulo: "Inicio"});
});

router.get("/servicios", (req, res) => {
  //res.send("Estas en la pagina de servicios");
  res.render("servicios", {titulo: "Servicios"})
});

module.exports = router;
