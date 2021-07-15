
const express = require('express');
const app = express();
const genres = require('./rotues/genres');
const customers = require('./rotues/customers');
const movies = require('./rotues/movies');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true , useUnifiedTopology: true })
   .then(() => console.log('Connected to database'))
   .catch((err) => console.log('Something went wrong'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);


app.listen(3000,() => console.log('Listening at port 3000....'));   