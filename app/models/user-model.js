var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var DailiesSchema = new mongoose.Schema({
    day: String,
    MindActivities: [],
    BodyActivities: [],
    SoulActivities: []
});

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
        { day: String, Mind: Number, Body: Number, Soul: Number}
    ],
    favorites        : Array
});

var MindSchema = new mongoose.Schema( {activity: String});
var BodySchema = new mongoose.Schema( {activity: String});
var SoulSchema = new mongoose.Schema( {activity: String});

MindSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) return callback(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

BodySchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) return callback(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

SoulSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) return callback(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var Mind = mongoose.model('Mind', MindSchema, 'minds');
var Body = mongoose.model('Body', BodySchema, 'bodies');
var Soul = mongoose.model('Soul', SoulSchema, 'souls');
var User = mongoose.model('User', UserSchema, 'users');
var Dailies = mongoose.model('Dailies', DailiesSchema, 'dailies');

module.exports = {
    User: User,
    Mind: Mind,
    Body: Body,
    Soul: Soul,
    Dailies: Dailies
}