/* eslint-disable no-console */
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('../client/dist'));



app.listen(PORT, () => {
  console.log(`Server running and listening on port: ${PORT}`);
});


//GET /cart/:user_session
app.get('/cart/:user_session', function (req, res) {
  //query database

  if(err) {
    res.sendStatus(400)
  } else {
    res.sendStatus(200)
  }
});

//add to cart

app.post('/cart/:user_session/:product_id', function (req, res) {
  //query database

  if(err) {
    res.sendStatus(500)
  } else {
    res.sendStatus(201)
  }
});

//Interactions API
app.post('/interactions/:element/:widget/:time', function (req, res) {
  //query database

  if(err) {
    res.sendStatus(422)
  } else {
    res.sendStatus(201)
  }
});

//PRODUCTS API===================================================
//list Products
app.get('/products/list/:page/:count', function (req, res) {
  //query databbase

  //need to account for page and count parameters

  if(err) {
    res.sendStatus(422)
  } else {
    res.sendStatus(201)
  }
});

//product information
app.get('/products/:product_id', function (req, res) {
  //query databbase



  if(err) {
    res.sendStatus(422)
  } else {
    res.sendStatus(200)
  }
});


//product Styles
app.get('/products/:product_id/styles', function (req, res) {
  //query databbase



  if(err) {
    res.sendStatus(422)
  } else {
    res.sendStatus(200)
  }
});

//related Products
app.get('/products/:product_id/related', function (req, res) {
  //query databbase



  if(err) {
    res.sendStatus(422)
  } else {
    res.sendStatus(200)
  }
});