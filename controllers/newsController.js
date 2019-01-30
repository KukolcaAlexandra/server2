const News = require('../models/news');

exports.getNews = function(req, res) {
  //res.send('NOT IMPLEMENTED: news list');
  console.log('from get news, req.user = ');
  console.log(req.user);
  News.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.getNewsWithId = function(req, res) {
  //res.send('NOT IMPLEMENTED: News with id: ' + req.params.id);
  News.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('result');
      console.log(data);
      res.send(data);
    }
  });

};

// Создать автора по запросу POST.
exports.addNews = function(req, res) {
  //res.send('NOT IMPLEMENTED: News add POST');
  console.log('from post news, req.user = ');
  console.log(req.user);
  console.log(req.body);
  const news = new News(req.body);
  news.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('add news');
      res.status(201).send();
    }
  });
  // res.redirect('/catalog');
};

exports.deleteNews = function(req, res) {
  // res.send('NOT IMPLEMENTED: News delete DELETE');
  //console.log(req.user);
  console.log('from delete news, req.user = ');
  console.log(req.user);
  News.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('delete one');
      res.status(201).send();
    }
  });
};

exports.updateNews = function(req, res) {
  //res.send('NOT IMPLEMENTED: News update UPDATE');
  console.log('from update news, req.user = ');
  console.log(req.user);
  console.log(req.body);
  //console.log(req.body.keys);
  const param = {};
  for (key in req.body) {
    console.log(`key = ${key}`);
    param[key] = req.body[key];
  }
  
  console.log(param);
  News.updateOne(
    { _id: req.params.id }, 
    param,
    (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('update one');
      res.status(201).send();
    }
  });
};
