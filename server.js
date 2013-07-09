var port = process.env.PORT || 5000;
var http = require("http");
var url = require("url");
var io;

function start(route, handle) {
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		//console.log("Request for "+pathname+" recieved.");

		route(handle, pathname, response, request, io);
	}

	app = http.createServer(onRequest).listen(port);
	//console.log("Server has started.");

	//init sockets
	io = require('socket.io').listen(app);
	io.configure(function () { 
		io.set("transports", ["xhr-polling"]); 
		io.set("polling duration", 10); 
	});

	io.sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});


}



exports.start = start;



