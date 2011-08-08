var fs = require("fs");
/* Router */
function route( handler, pathname, response, params ) {
	var extension = /\.(html|css|png)$/.exec( pathname );
    var contentTypes = { "html": "text/html", "css": "text/css", "png": "image/png", "jpg": "image/jpeg" };
    if ( extension != null )
	{
        response.writeHead( 200, {"Content-Type": contentTypes[extension[0].substring( 1 )] } );
        response.end( fs.readFileSync( "./tmp/visualut" + pathname ) );
	}
	else if ( typeof handler[pathname] === 'function' )
	{
        handler[pathname]( response, params );
    }
    else
    {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end( "404 Not Found" );
    }
}
/* Export function as module */
exports.route = route;