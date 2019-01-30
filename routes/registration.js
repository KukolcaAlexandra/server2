const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', function(req, res) {
  
  User.findOne({username: req.body.username}).then((currentUser) => {
    if (currentUser) {
      console.log('user already exists');
    } else {
      new User(req.body)
      .save()
      .then((newUser) => console.log('new user created'))
      .catch((err) => console.log(err))
    }  
  });

  res.status(201).send()
    
});

module.exports = router;