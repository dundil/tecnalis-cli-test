#!/usr/bin/env node

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var velocity = require("./alira");

var port = '8888';

let currentArgument = '';
let arguments = process.argv.slice(2);
if (arguments.length == 0){
	console.log("ERROR: No command found");
	return;
}else{
	let command = arguments[0];
	switch (command){
		case 'serve':
			initServer(arguments.slice(1));
			break;
		default:
			console.log('"ERROR: Command unknown');
			return;
	}
}

function initServer(args){
	args.forEach(function (val, index, array) {
		if (currentArgument == 'port'){
			currentArgument = '';
			port = val;
		}
		if (val == '--port'){
			currentArgument = 'port'
		}
	});
	var handler = {};
	handler["SERVER"] = requestHandlers.serverHandler;
	handler["ROOT"] = requestHandlers.rootHandler;
	handler["html"] = requestHandlers.webPageHandler;
	handler["jpg"] = requestHandlers.imageHandler;
	handler["jpeg"] = requestHandlers.imageHandler;
	handler["png"] = requestHandlers.imageHandler;
	handler["gif"] = requestHandlers.imageHandler;
	handler["svg"] = requestHandlers.svgHandler;
	handler["json"] = requestHandlers.textFileHandler;
	handler["js"] = requestHandlers.textFileHandler;
	handler["css"] = requestHandlers.textFileHandler;
	handler["scss"] = requestHandlers.textFileHandler;
	handler["ttf"] = requestHandlers.fontHandler;
	
	server.startServer(port, router.route, handler, velocity);
}