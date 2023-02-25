var express = require('express');
var router = express.Router();
var Contact = require('../model/contact');

router.get('/', function(req, res){
Contact.find(function(err, data){
    if(err) throw err;
    res.render('ContactList/Contact.twig', {title: 'Contact', contacts: data})
});


    
});

router.get('/new', function(req, res){
    res.render('ContactList/AjouterContact.twig', {title: 'Ajouter Contact'});
});

router.post('/new', function(req, res){   
    var contact = new Contact({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    });
    
    contact.save(function(err){
        if(err) throw err;
        console.log('Contact saved successfully!');
        res.redirect('/contact')
    }
    );
        
});
//delete 
router.get('/:id/delete', function(req, res){
    Contact.findById(req.params.id, function(err){
       console.log(req.params.id);
        if(err) throw err;
        Contact.findByIdAndRemove(req.params.id, function(err){
            if(err) throw err;
            console.log('Contact deleted successfully!');
            res.redirect('/contact');
        }
        );
    });

});

//get and update
router.get('/:id/edit', function(req, res){
    Contact.findById(req.params.id, function(err, data){
        if(err) throw err;
        console.log(data);
        res.render('ContactList/ModifierContact.twig', {title: 'Modifier Contact', contact: data})
    });
});

router.post('/:id/edit', function(req, res){
    Contact.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    }, function(err){
        if(err) throw err;
        console.log('Contact updated successfully!');
        res.redirect('/contact');
    });
});



module.exports = router;