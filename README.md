# grifter
Simple javascript object to contain a configuration

###Examples

    var config = require('grifter');
    
    // setting a variable value (can be changed)
    config.host = 'http://localhost';
    
    // setting a constant value (cannot be changed, throws and error)
    config.define('port', 443);
    
    // displays "http://localhost"
    console.log(config.host);
    
    // displays "443"
    console.log(config.port);
