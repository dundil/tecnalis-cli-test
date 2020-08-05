var http = require("http");
var url = require("url");

function startServer(port, route, handler){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Requested " + pathname);
		
		if (pathname == '' || pathname == '/'){
			pathname = '/index.html';
		}

		var data;
		if (pathname.includes('favicon')){
			data = handler["ROOT"](pathname, 'ico', response);
		}else if(pathname.includes('banner-list')){
			pathname = '/banner-list.json';
			data = handler["SERVER"](pathname, 'json', response);
		}else{
			data = route(pathname, handler, response);
		}

		console.log("Responding to " + pathname + " with code " + data[0]);
		response.writeHead(data[0], {"Content-Type": data[1]});
		response.write(data[2]);
		response.end();
		
		console.log(" ");
	}

	http.createServer(onRequest).listen(port);
	
	console.log(" ");
	console.log(" *************************************** ");
	console.log("Server started");
	console.log("at http://localhost:" + port + "/index.html");
	console.log("Hit CTRL-C to stop the server.");
	console.log(" ");
}

exports.startServer = startServer;