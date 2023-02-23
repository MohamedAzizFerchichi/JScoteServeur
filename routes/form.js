var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('comments')
/* GET Form listing. */

router.get('/', function(req, res) {
    Comment.find(function(err,comments)
    {
        console.log(comments);
        res.render('form.twig', { title: 'My form', comments: comments });
    }
    );
});


router.post('/', function(req, res) {
    console.log(req.body.comment);
    var comment = new Comment();
    comment.title = req.body.comment;
    comment.save(function(err, comment){
        res.redirect('form');
    });
});

//delete
router.get('/delete/:id', function(req, res) {
    Comment.remove({_id: req.params.id}, function(err){
        res.redirect('/form');
    });
});

//edit
router.get('/edit/:id', function(req, res) {
    Comment.findOne({_id: req.params.id}, function(err, comment){
        res.render('edit.twig', {comment: comment});
    });
});


module.exports = router;