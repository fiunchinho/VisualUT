DirectoryHelper = function( path, fs ){
	this.path = path;
	this.fileSystemModule = fs;
	//this.fileSystemModule = require("fs");
	console.log( this.fileSystemModule );
	this.folderToOutput = "./tmp/visualut";
}


DirectoryHelper.prototype = {
	getListOfFilesOutput: function()
	{
		this.removeTrailingSlash( this.path );
		var output = "<ul>";
		output += "<li><a href=\"?path=" + this.getParentFolderPath() + "\">[Parent Folder]</a></li>";
	    var files = this.fileSystemModule.readdirSync( this.path );
	    for ( var i in files )
	    {
			var currentFile = this.path + '/' + files[i];
			var stats = this.fileSystemModule.statSync( currentFile );
			if ( stats.isDirectory() || files[i].match(/Test\.php$/) )
			{
				output += "<li><a href=\"?path=" + currentFile + "\">" + files[i] + "</a></li>";
			}
		}
		output += "</ul>";
		return output;
	},
	getParentFolderPath: function()
	{
		var pathConvertedToArray = this.path.split( "/" );
		pathConvertedToArray.pop();
		return pathConvertedToArray.join( "/" );
	},
	removeTrailingSlash: function( path )
	{
		if ( path.match(/\/$/) )
		{
			path.substring(0, path.length-1)
		}
	},
	readCoverageFile: function( err )
	{
		if (err !== null)
		{
			response.writeHead( 500, { "Content-Type": "text-html" } );
			response.end( "<h1>There's some error executing the test.</h1> " + err.message );
			console.log( err );
		}
		console.log( this );
		this.fileSystemModule.readFile( this.folderToOutput + '/index.html', this.writeResponseContent );
	},
	writeResponseContent: function( err, output )
	{
		if (err !== null)
		{
			response.writeHead( 500, { "Content-Type": "text-html" } );
			response.end( "<h1>There are some errors reading the coverage file</h1> " + err.message );
			console.log( 'Error reading the coverage file: ' + err );
		}
		response.writeHead( 200, { "Content-Type": "text-html" } );
		response.end( output );
		this.fileSystemModule.unlink( this.folderToOutput + '/index.html' );
	}
};

exports.DirectoryHelper = DirectoryHelper;
