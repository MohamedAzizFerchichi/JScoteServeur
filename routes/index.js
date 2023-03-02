var express = require('express');
var router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res) {
  if (session && session.isLoggedIn) {
    
    res.render('index', {title: 'Home', isLoggedIn: session.isLoggedIn});
  } else {
    console.log(session);

    res.render('index', {title: 'Home'});
  }
});


module.exports = router;
