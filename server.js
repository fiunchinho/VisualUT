/* List of modules required */
var http = require('http');
var url = require("url");

/* Function to start the server */
function serverStart( route, handler )
{
	http.createServer( function( request, response  )
	{
		var pathname = url.parse(request.url).pathname;
        	console.log("Received petition for " + pathname);
        	route( handler, pathname, response, require('url').parse( request.url, true ) );
	}).listen( 4444 );	
}

/* Export function as module */
exports.start = serverStart;
