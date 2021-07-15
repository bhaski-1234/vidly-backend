const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {validate,Movie} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/',async (req,res) => {
    const movies = await Movie.find().sort('name');
    res.json(movies);
});

router.post('/',async (req,res) => {
     const {error} = validate(req.body);
     if(error)return res.status(400).send(error.details[0].message);

     const genre = Genre.findById(req.body.genreId);
     if(!genre)return res.status(400).send('Invalid Genre');

     let movie = new Movie({
          title : req.body.title,
          genre : {
               _id : genre._id,
               name : genre.name
          },
          numberInStock : req.body.numberInStock,
          dailyRentalRate : req.body.dailyRentalRate
     });
     movie = await movie.save();
     res.status(200).json(movie);
});


