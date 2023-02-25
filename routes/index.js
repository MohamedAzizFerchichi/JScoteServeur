var express = require('express');
var router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res) {
  if (session && session.isLoggedIn) {
    // User is logged in, render the logged in view
    console.log(session);
    res.render('index', {title: 'Home', isLoggedIn: session.isLoggedIn});
  } else {
    // User is not logged in, render the logged out view
    console.log(session);

    res.render('index', {title: 'Home'});
  }
});


module.exports = router;
