const express = require('express');
const router = express.Router();

const Pet = require('../models/Pet')

router.get('/', async(req, res) => {

  const pets = await Pet.find();

  res.render("pets/index", { 
    pets: pets
  })      

})

router.get('/create', (req, res)=>{

  res.render('pets/create');

})

router.post('/', async (req, res)=>{

  const body =  req.body;

  if(!body.name || !body.description){
    res.render('422');
  }

  await Pet.create(body);

  res.redirect("/pets");

})

router.get('/:id', async(req, res) => {

  const id = req.params.id;

  try {
    const pet = await Pet.findOne({_id: id})
    res.render('pets/detail', {
      pet: pet
    })
  } 
  catch (error) {
    res.render('404')
  }

})

router.delete("/:id", async (req, res) => {

  const id = req.params.id;

  try {
    await Pet.findByIdAndDelete({ _id: id });
    res.sendStatus(204)
  } 
  catch (error) {
    res.sendStatus(404);
  }
})

router.put("/:id", async(req, res)=>{

  const id = req.params.id;
  const body = req.body;

  if(!body.name || !body.description){
    res.sendStatus(422);
  }

  try {
    await Pet.findByIdAndUpdate(id, body, { useFindAndModify: false });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
})

module.exports = router;
