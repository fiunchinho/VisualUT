var exec = require("child_process").exec;
var cli = require("./commandLineInterface");
var dh  = require("./directoryHelper");
var url = require("url");

function home( response, params )
{
	var directoryHelper = new DirectoryHelper( params.query.path );

	if ( params.query.path.match(/\.php$/))
	{
		var phpunitCommand = "phpunit --colors --coverage-html " + directoryHelper.folderToOutput ;
		cli.run( phpunitCommand + " " + params.query.path, directoryHelper.readCoverageFile );	
	}
	else
	{		
		response.writeHead( 200, { "Content-Type": "text-html" } );
		response.end( directoryHelper.getListOfFilesOutput() );
	}
}
function about( response, params )
{
	response.writeHead( 200, { "Content-Type": "text-html" } );
	response.end( "ABOUT::This is a tool to have a visual output of our PHP Unit Testings." );
}
exports.home = home;
exports.about = about;