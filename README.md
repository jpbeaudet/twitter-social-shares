# twitter-social-shares
### json-rpc wrapper to get social shares realetd to keywords from twitter api
#### Version: 0.0.1
##### Dependencies:

###### Node.js

* json-rpc2 : "1.0.2"
* twitter : "1.3.0"
* unit-test : "0.0.9"
* chai : "3.5.0"

###### RPC-Client Usage:


```javascript
var rpc = require('json-rpc2');
 
var client = rpc.Client.$create(8092, 'localhost');
 
//Call add function on the server 
 
client.call("get_social_shares", [""], function(err, shares) {
    console.log('Social Shares: ' + shares);
});

```
