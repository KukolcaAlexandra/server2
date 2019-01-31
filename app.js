const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const winston = require('winston');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const app = express();
var mongoose = require('mongoose');
var session = require('express-session');
const User = require('./models/user');
var flash = require('express-flash');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    //console.log(User);
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        console.log('err'); 
        return done(err); 
      }
      if (!user) {
        console.log('!user');
        return done(null, false, { message: 'Incorrect username.' });
      }
      //if (!user.validPassword(password)) {
      if (user.password != password) {
        console.log('incorrect password');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: '612251399234373',
  clientSecret: '4e2341920972fc5c5c0052e5f94fe66c',
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},

function(accessToken, refreshToken, profile, done) {
  console.log('Facebook strategy');
  console.log(profile);
  //done(null, profile);
  User.findOne({facebookId: profile.id}, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!err && user !== null) {
      return done(null, user);
    } else {
      user = new User({ 
        username: profile.displayName
      });
      user.facebookId = profile.id;
      user.firstname = profile.name.givenName;
      user.lastname = profile.name.familyName;
      user.save((err, user) => {
        if (err)
          return done(err, false);
        else 
          return done(null, user);
      })
    }
  });
  console.log('write in the data base');
  
  /*User.findOrCreate(..., function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });*/
}
));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
//app.use(express.cookieParser());
//app.use(express.bodyParser());
//app.use(express.session({ secret: 'keyboard cat' }));
app.use(session({
  secret: "cats",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
  //done(null, user);
  console.log(id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/*app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());*/

app.get('/auth/facebook', passport.authenticate('facebook'));

/*app.delete('/news/delete/:id',
  passport.authenticate('facebook'),
  function(req, res) {
    console.log('redirect to');
    res.redirect('/news/:id');
  }
);*/
    
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', scope: [
    'email',
    'publish_actions',
    'user_friends',
    'user_about_me',
    'user_birthday'
    ]
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('hello from Facebook callback');
    console.log(req.user);
    console.log('the end');
    //console.log(`req.user = ${req.user}`);
    res.redirect('/news');
  }
);


//const News = require('./models/news');
console.log('start app');

mongoose.connect('mongodb://localhost:27017/news');
/*mongoose.connect('mongodb://localhost/testdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});*/

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});
/*
const user = new User({ 
  username: 'alex',
  password: '123'
});

user.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('add user');
    //res.status(201).send();
  }
});*/

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});



/////////////////

/////////////////

app.use((req, res, next) => {
  logger.log({
    level: 'info',
    message: `${new Date()}: ${req.method} URL = ${req.url}`,
  });
  next();
})

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//mongoimport --host=127.0.0.1 --db test --collection restaurants --drop --file 'D:\js\frontcamp\mongorestaurants.json'