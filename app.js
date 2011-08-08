var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
/* List of handlers / secions */
var handler = {}
handler["/"] = requestHandlers.home;
handler["/about"] = requestHandlers.about;
/* Launch the server */
server.start( router.route, handler );