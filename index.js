#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const clui = require('clui');
const Spinner = clui.Spinner;

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var velocity = require("./alira");

let currentArgument = '';
let arguments = process.argv.slice(2);
if (arguments.length == 0){
	console.log("ERROR: No command found");
	return;
}else{
	let command = arguments[0];
	switch (command){
		case 'init':
			initProject(arguments.slice(1));
			break;
		case 'update':
			break;
		case 'deploy':
			break;
		case 'serve':
			initServer(arguments.slice(1));
			break;
		case 'help':
			printHelp();
			break;
		default:
			console.log('"ERROR: Command unknown. Please try with these commands:');
			printHelp();
			return;
	}
}

async function initProject(args){
	let gms = '';
	let isHelp = false;
	args.forEach(function (val, index, array) {
		if (currentArgument){
			switch (currentArgument){
				case 'gms':
					gms = val;
					break;
			}
			currentArgument = '';
		}else{
			switch (val){
				case '--gms':
					currentArgument = 'gms';
					break;
				case '--help':
					isHelp = true;
					printInitHelp();
					break;
			}
		}
	});
	if (!isHelp){
		let projectData;
		try{
			projectData = fs.readFileSync('./project.json', {encoding:'utf8', flag:'r'});
		}catch(e){
			
		}
		if (projectData){
			console.log("ERROR: Project already created.");
		}else{
			printLogo();
			console.log("Welcome to Alira CLI. Initializing project...");
			if (gms == ''){
				gms = await inquirer.prompt([
					{
						name: 'gms',
						type: 'input',
						message: 'Please, enter GMS url:',
						validate: function( value ) {
							if (value.length) {
								return value;
							} else {
								return 'Please enter GMS url:';
							}
						}
					}
				]);
				let spinner = new Spinner("Connecting to GMS...");
				spinner.start();
				//await fetch(gms);
				wait(5000);
				spinner.stop();
			}
		}
	}
}

function initServer(args){
	let port = '8888';
	let isHelp = false;
	args.forEach(function (val, index, array) {
		if (currentArgument){
			switch (currentArgument){
				case 'port':
					port = val;
					break;
			}
			currentArgument = '';
		}else{
			switch (val){
				case '--port':
					currentArgument = 'port';
					break;
				case '--help':
					isHelp = true;
					printServeHelp();
					break;
			}
		}
	});
	if (!isHelp){
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
}

function printHelp(){
	console.log(
	`
	usage: alira <command> [<options>]

	Commands:
		init			creates a new project in current folder
		update			updates local files with Alira's database
		deploy			updates Alira's database with local files
		serve			starts a local server

	To get command options help: alira <command> --help
	`
	);
}

function printInitHelp(){
	console.log(
		`
	usage: alira init [<options>]

	Options:
		--gms <url>			provides GMS url.
	`
	);
}

function printServeHelp(){
	console.log(
		`
	usage: alira serve [<options>]

	Options:
		--port <port>			sets the port value
	`
	);
}

function printLogo(){
	console.log(
		`
          _ _
    /\\   | (_)          
   /  \\  | |_ _ __ __ _ 
  / /\\ \\ | | | '__/ _  |
 / ____ \\| | | | | (_| |
/_/    \\_\\_|_|_|  \\__,_|
	
		`);
}

async function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}