const express = require('express');
const router = express.Router();
//const User = require('../models/user');
var passport = require('passport')

router.post('/', 
  passport.authenticate('local', { successRedirect: '/news',
                                   failureRedirect: '/error',
                                   failureFlash: false })
  /*passport.authenticate('local', function(err, user, info) {
    if (err) { 
      console.log('/login err');
      return next(err); 
    }
    console.log('user');
    console.log(user);
    if (!user) {
      console.log('/login !user'); 
      return res.redirect('/login'); 
    } 
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('/login res.logIn');
        return res.redirect('/news');
    });
  })(req, res, next);*/
);

//router.get('/login', )
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
