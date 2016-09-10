var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({  

    local            : {
        email        : String,
        password     : String,
        nickname     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    completion       : [
        { day: Date, Mind: Number, Body: Number, Soul: Number}
    ],
    favorites        : Array
});

var MindSchema = new mongoose.Schema([ { activity: String}]);
var BodySchema = new mongoose.Schema([ { activity: String}]);
var SoulSchema = new mongoose.Schema([ { activity: String}]);



// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var Mind = mongoose.model('Mind', MindSchema);
var User = mongoose.model('User', UserSchema);
module.exports = Mind;
module.exports = User;