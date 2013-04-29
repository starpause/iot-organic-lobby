var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		//console.log("Request for "+pathname+" recieved.");

		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8988);
	console.log("Server has started.");
}

exports.start = start;