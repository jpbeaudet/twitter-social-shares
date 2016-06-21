// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// twitter-social-shares
// Version : 0.0.1
// License: 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Cient example:
//var rpc = require('json-rpc2');
 
//var client = rpc.Client.$create(8000, 'localhost');
 
// Call add function on the server 
 
//client.call('add', [1, 2], function(err, result) {
    //console.log('1 + 2 = ' + result);
//});
// =====================================================

var rpc = require('json-rpc2');
var func = require('./scripts/func.js')
var config = require('./scripts/config.js');
var server = rpc.Server.$create({
    'websocket': true, // is true by default 
    'headers': { // allow custom headers is empty by default 
        'Access-Control-Allow-Origin': '*'
    }
});
 
//expose func lib
server.expose("get_Twitter_social_shares", func.get_Twitter_social_shares);
// expects calls to be namespace.function1, namespace.function2 and namespace.function3 
 
// listen creates an HTTP server on localhost only 
server.listen(config.NODE_PORT, config.NODE_HOST);
