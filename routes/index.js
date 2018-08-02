var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});
router.get('/u/:user', function(req, res, next){
  res.render('index', {title: 'User'})
  //res.send('The time is'+new Date().toString())
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

router.post('/reg', function(req, res){
  //检查两次输入的口令是否一致
  if(req.body['password-repeat'] != req.body['password']){
    req.flash('error', '两次口令输入不一致');
    return res.redirect('/reg');
  }
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.username,
    password: password,
  });

  User.get(newUser.name, function(err, user) {
    if (user)
      err = 'Username already exists.';
    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }
    //如果不存在则新增用户
    newUser.save(function(err) {
    if (err) {
    req.flash('error', err);
    return res.redirect('/reg');
    }
    req.session.user = newUser;
    req.flash('success', '注册成功');
    res.redirect('/');
    });
  });

  res.render('index', {title:'post'});
});
module.exports = router;
