var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});
router.get('/u/:user', function(req, res, next){
  res.render('index', {title: 'User'})
  //res.send('The time is'+new Date().toString())
});
router.post('/post', function(req, res, next){
  res.render('index', {title:'post'});
});
router.get('/login', function(req, res, next){
  res.render('index', {title:'login'});
});
router.get('/reg', function(req, res, next){
  res.render('reg', {title:'用户注册'});
});
router.get('/logout', function(req, res){
  res.render('index', {title:'logout'});
});

module.exports = router;
