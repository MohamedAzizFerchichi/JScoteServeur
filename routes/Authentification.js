// Authentification User with user name and password 
// Compare this snippet from routes\Authentification.js:
 var express = require('express');
 var router = express.Router();
 var User = require('../model/user');
 const session = require('express-session');
 const crypto = require('crypto');
 const secretKey = crypto.randomBytes(32).toString('hex');
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');
 const saltRounds = 10;


//
 router.get('/register', function(req, res){
        res.render('Authentification/register.twig', {title: 'Register'});
    }
);
router.get('/login', function(req, res){
    res.render('Authentification/login.twig', {title: 'login'});
}
);

//register  with jwt tooken 
router.post('/register', function(req, res) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone
    });
  
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (err) throw err;
      user.password = hash;
  
      user.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully!');
        
        const payload = { username: user.username };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
  
        res.render('Authentification/login.twig', { title: 'Login' });
      });
    });
  });

  router.post('/login', function(req, res ) {
    const username = req.body.username;
    const password = req.body.password;
  
    // Find user by username
    User.findOne({ username }, function(err, user) {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
  
      if (!user ) {
        return res.status(401).send('Invalid username or password');
      }
  
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) {
          return res.status(500).send('Internal server error');
        }
  
        if (!isMatch) {
          return res.status(401).send('Invalid username or password');
        }
  
        const payload = { id: user._id };
        const options = { expiresIn: '1d' };
        const token = jwt.sign(payload, secretKey, options);
        session({
          secret: secretKey ,
          resave: false,
          saveUninitialized: false
        });
        session.isLoggedIn = true;
        res.redirect('/')
      });
    });
  });

  router.get('/logout', function(req, res) {
   session.isLoggedIn = false;
  
  // Destroy session
  
    res.redirect('/');
  
});


module.exports = router;