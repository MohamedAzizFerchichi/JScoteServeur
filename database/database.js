//connect to mongos
var mongoose = require('mongoose');
//create a schema
var Schema = mongoose.Schema;
var Comment = new Schema({
    id: Number ,
    title: String,
});
//create a model
mongoose.model('comments', Comment);
mongoose.connect('mongodb://localhost/node-comments');
//export this module
module.exports = mongoose;

