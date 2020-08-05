function route(pathname, handler, response) {
  let extension = pathname.split('?')[0].split('.').slice(-1);
  let handleFunction = handler[extension];
  if (handleFunction){
    console.log("Routing request to " + pathname);
    return handleFunction(pathname, extension, response);
  }else{
    response.writeHead(500, {"Content-Type": "text/html"});
		return [500, 'text/html', '500 ERROR - File type ' + extension + ' not defined in the server'];
  }
}

exports.route = route;