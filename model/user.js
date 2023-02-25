var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username : String,
    password : String,
    email : String,
    phone : Number,
      
});




module.exports = mongoose.model('Users', User);