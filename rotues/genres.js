const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Genre,validate} = require('../models/genre');



router.get('/',async (req,res) => {
      const genres = await Genre.find();
      res.send(genres);
})

router.get('/:id', async (req,res) => {
     const genre = await Genre.findById(req.params.id);
     res.send(genre);
})

router.post('/', async (req,res) => {
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let genre = new Genre({
          name : req.body.name
     });
    genre = await genre.save();
    res.send(genre);
})

router.delete('/:id',async (req,res) => {
     const genre = await Genre.findByIdAndRemove(req.params.id);
     if(!genre) return res.status(404).send('Bad request');
     res.send(genre);
})




module.exports = router;
