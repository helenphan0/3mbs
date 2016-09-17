// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1819293234971177', 
        'clientSecret'  : 'de31cc0ee57b9fba02d030b48a1c934f', 
        'callbackURL'   : 'https://glacial-cove-28448.herokuapp.com/auth/facebook/callback',
        'profileFields' :  ["emails", "displayName", "name", "email", "hometown", "location"]
    },

    'googleAuth' : {
        'clientID'      : '1016331660179-u9r76fluhj708k5g8929s0f1l8jeao6n.apps.googleusercontent.com',
        'clientSecret'  : '6aVuIImMfBbvbHLD5NxTDIwQ',
        'callbackURL'   : 'https://glacial-cove-28448.herokuapp.com/auth/google/callback'
    }

};