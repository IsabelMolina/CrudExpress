const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async(req, res) => {
    try {
      const arrayMascotasDB= await Mascota.find();
      const titulo = "Mascotas";
      if(arrayMascotasDB.length > 0){
        res.render("mascotas", {
          titulo,
          listaMascotas: arrayMascotasDB,
          estado: true
        })
      }
      else{
        res.render("mascotas", {
          titulo,
          estado: false,
          mensaje: "No se encuentran mascotas"
        })
      }
    } catch (error) {
      console.log(error)
    }

})

router.get('/crear', (req, res)=>{
  res.render('crear', {titulo: "Crear"});
})

router.post('/', async (req, res)=>{
  const body =  req.body;
  try {
    // const mascotaDB = new Mascota(body);
    // await mascotaDB.save();

    await Mascota.create(body);

    res.redirect("/mascotas");

  } catch (error) {
    console.log(error);
  }
})

router.get('/:id', async(req, res) => {
    // en mongodb el id se especifica como _id
    const id = req.params.id;
    const titulo = "Detalle mascota";
    try {
      const mascotaDB = await Mascota.findOne({_id: id})

      res.render('detalle', {
        titulo: titulo,
        mascota: mascotaDB,
        error: false
      })

    } catch (error) {

      res.render('detalle', {
        titulo: titulo,
        error: true,
        mensaje:"No se encuentra el id seleccionado"
      })
      console.log(error)
    }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });
      if(mascotaDB){
        res.json({
          estado:true,
          mensaje:"eliminado"
        })
      }
      else{
        res.json({
          estado:false,
          mensaje:"fallo eliminar"
        })
      }
  } catch (error) {
    console.log(error);
  }
})

router.put("/:id", async(req, res)=>{
  const id = req.params.id;
  const body = req.body;

  try {
    const mascotaDB = await Mascota.findByIdAndUpdate(
         id, body, { useFindAndModify: false }
     )

    res.json({
      estado: true,
      mensaje: 'editado'
    })

  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: 'fallamos'
    })
  }
})

module.exports = router;
