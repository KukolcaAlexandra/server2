const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const newsController = require('../controllers/newsController');
var passport = require('passport');
let data; 

//router.use(readDataFromFile);

router.get('/:id', newsController.getNewsWithId);
router.get('/', newsController.getNews);
router.post('/', newsController.addNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

/*router.get('/', passport.authenticate('facebook'),
(req, res) => {
  if (req.user) {
    console.log('successfully logged in');
    //console.log(`req.user = ${req.user}`);
    console.log(req.user);
    //res.redirect('/lo');
    //newsController.getNews(req, res);
    res.redirect('/');
  }
})*/
/*router.delete('/:id', passport.authenticate('facebook'),
(req, res) => {
  if (req.user) {
    console.log('successfully logged in');
    console.log(`req.user = ${req.user}`);
    res.redirect('/lo');
    newsController.deleteNews(req, res);
  }
})*/

/*router.get('/:id', function(req, res) {
  let newsFound;
  data.forEach((item) => {
    if(item['id'] === req.params.id) {
      newsFound = item;
    }
  });
  
  if (newsFound) {
    res.send(newsFound);
  } else {
    res.send('No news found with the id');
  }
});

router.get('/', function(req, res) {
  res.send(data);
});

router.post('/', function(req, res) {
  const news = req.body;
  data.push(news);
  res.status(201).send();
});

router.put('/:id',function(req, res) {
  const news = req.body;
  let indexOfElement = -1;
  data.forEach((item, index) => {
    if(item['id'] === req.params.id){
      indexOfElement = index;
    }
  });

  if (indexOfElement !== -1) {
    data[indexOfElement] = news;
  }
  res.status(201).send();
});

router.delete('/:id', function(req, res) {
  let indexOfElement = -1;
  data.forEach((item, index) => {
    if(item['id'] === req.params.id){
      indexOfElement = index;
    }
  });

  if (indexOfElement !== -1) {
    data.splice(indexOfElement, 1);
  }
  res.status(201).send();
});

async function readDataFromFile(req, res, next) {
  const file = './source.json';
 
  if (!data) {
    try {
      const source = await readFileAsync(file, 'utf-8');
      data = JSON.parse(source);
    } catch (err) {
      console.log(err);
    }
  }
  next();
}*/

module.exports = router;
