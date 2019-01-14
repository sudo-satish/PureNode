const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

const server = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    
    var queryStringObj = parsedUrl.query;

    var method = req.method.toLowerCase();

    var headers = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    /**
     * Get payload if any
     */
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    
    req.on('end', function() {
        
        var action = typeof controller[path] == 'function' ? controller[path] : controller['notFound'];
        buffer += decoder.end();
        action(req, res, buffer);
        
    });

});


/**
 * Controller
 */
var controller = {};

/**
 * Action handler for status 404 not-found
 * 
 * Not found
 */
controller['notFound'] = function(req, res, data) {
    res.writeHead(404);
    res.end('Page not found!');
}

/**
 * Action handler for route /hello-world
 * 
 * status 200
 */
controller['hello-world'] = function(req, res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(data);
}


/**
 * Server listen to port defined in config.
 */
server.listen(config.port, function() {
    console.log(`The server is listing to ${config.port}`);
});