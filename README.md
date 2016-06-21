# twitter-social-shares
### json-rpc wrapper to get social shares realetd to keywords from twitter api
#### Version: 0.0.1
##### Dependencies:

###### Node.js

* json-rpc2 : "1.0.2"
* twitter : "1.3.0"
* unit-test : "0.0.9"
* chai : "3.5.0"
* mongoose : "4.5.1"

###### RPC-Client Usage:


```javascript
var rpc = require('json-rpc2');
 
var client = rpc.Client.$create(8092, 'localhost');
 
//Call get_Twitter_social_shares function on the server
// Will return an array of twitetr_social_shares corresponding to your array of keywords 
 
client.call("get_Twitter_social_shares", [<array of keywords>], function(err, shares) {
    console.log('Social Shares: ' + shares);
});

```
