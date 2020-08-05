var alira = require('./alira');
var fs = require('fs');

function webPageHandler(pathname, extension, response) {
	console.log("'webPageHandler' handler invoked.");
	try{
		let page = alira.getPage(pathname);
		if (page){
			response.writeHead(200, {"Content-Type": "text/html"});
			return [200, 'text/html', page];
		}
	}catch(e){
		console.log(e);
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

function textFileHandler(pathname, extension, response) {
	console.log("'textFileHandler' handler invoked.");
	console.log("Response handled to file files" + pathname);
	let contentType = 'html';
	if (extension == 'css'){
		contentType = 'css';
	}
	try{
		let data = fs.readFileSync('../content/files' + pathname, {encoding:'utf8', flag:'r'});
		if (data){
			response.writeHead(200, {"Content-Type": "text/" + contentType});
			return [200, 'text/' + contentType, data];
		}
	}catch(e){
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

function imageHandler(pathname, extension, response) {
	console.log("'imageHandler' handler invoked.");
	console.log("Response handled to file files" + pathname);
	if (extension == 'jpg'){
		extension = 'jpeg';
	}
	try{
		let data = fs.readFileSync('../content/files' + pathname);//, {encoding:'utf8', flag:'r'});
		if (data){
			response.writeHead(200, {"Content-Type": "image/" + extension});
			//return [200, 'image/' + extension, Buffer.from(data).toString('base64')];
			return [200, 'image/' + extension, data];
		}
	}catch(e){
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

function svgHandler(pathname, extension, response) {
	console.log("'imageHandler' handler invoked.");
	console.log("Response handled to file files" + pathname);
	try{
		let data = fs.readFileSync('../content/files' + pathname, {encoding:'utf8', flag:'r'});
		if (data){
			response.writeHead(200, {"Content-Type": "image/svg+xml"});
			return [200, 'image/svg+xml', data];
		}
	}catch(e){
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

function rootHandler(pathname, extension, response) {
	console.log("'rootHandler' handler invoked.");
	console.log("Response handled to file files/root" + pathname);
	try{
		let data = fs.readFileSync('../content/files/root' + pathname, {encoding:'utf8', flag:'r'});
		if (data){
			response.writeHead(200, {"Content-Type": "image/" + extension});
			return [200, 'image/' + extension, data];
		}
	}catch(e){
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

function fontHandler(pathname, extension, response) {
	console.log("'fontHandler' handler invoked.");
	console.log("Response handled to file files" + pathname);
	try{
		let data = fs.readFileSync('../content/files' + pathname);
		if (data){
			response.writeHead(200, {"Content-Type": "application/octet-stream"});
			return [200, 'application/octet-stream', data];
		}
	}catch(e){
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

function serverHandler(pathname, extension, response) {
	console.log("'serverHandler' handler invoked.");
	console.log("Response handled to file server" + pathname);
	try{
		let data = fs.readFileSync('server' + pathname, {encoding:'utf8', flag:'r'});
		if (data){
			response.writeHead(200, {"Content-Type": "text/" + extension});
			return [200, 'text/' + extension, data];
		}
	}catch(e){
		response.writeHead(404, {"Content-Type": "text/html"});
		return [404, 'text/html', '404 ERROR - File not found'];
	}
}

exports.webPageHandler = webPageHandler;
exports.textFileHandler = textFileHandler;
exports.imageHandler = imageHandler;
exports.svgHandler = svgHandler;
exports.rootHandler = rootHandler;
exports.fontHandler = fontHandler;
exports.serverHandler = serverHandler;