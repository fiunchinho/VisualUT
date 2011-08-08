var exec = require('child_process').exec;
var child;
/* Module to run a command line statement */
function run( command, callback )
{
	child = exec( command , callback );
}
exports.run = run;