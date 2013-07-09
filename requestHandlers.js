var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var url = require("url");

//lobby specific variables
//could use persistant storage but these are things
//that can be reset every time we run the server

function start(response,request){
	fs.readFile(__dirname + '/pinger.html',
	function (err, data) {
		if (err) {
			response.writeHead(500);
			return res.end('Error loading index.html');
		}
		response.writeHead(200);
		response.end(data);
	});
}

function list(response,request){
	console.log("Request handler 'list' was called.");

	exec("ls -lah", function(error,stdout,stderr) {
		response.writeHead(200,{"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
}

function movement(response, request){
	var urlParts = url.parse(request.url, true);
	var query = urlParts.query;

	//show the name of the object
	//console.log(query.object);

	//if the query has x,y, or z 
	//add those to the previous x,y,z

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received movement");
	response.end();

}

function upload(response,request){
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	
	console.log("about to parse");

	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		//possible error on windows systems: trying to rename an already existing file
		fs.rename(files.upload.path, "./tmp/test.gif", function(error) {
			if(error){
				fs.unlink("./tmp/test.gif");
				fs.rename(files.upload.path,"./tmp/test.gif");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");		
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response, request){
	console.log("Request handler 'show' was called.");
	fs.readFile("./tmp/test.gif", "binary", function(error,file){

		if(error){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error+ "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file,"binary");
			response.end();
		}

	});
}


exports.start = start;
exports.list = list;
exports.upload = upload;
exports.show = show;
exports.movement = movement;