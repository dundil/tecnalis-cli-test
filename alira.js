var fs = require('fs');
var playerMod = require('./classes/player');
var pageMod = require('./classes/page');
var moduleMod = require('./classes/module');
var modulesMod = require('./classes/moduleByClass');
var velocity = require('velocityjs');

var lang = 'es-ES';
var variables = {};

function getPage(url){
	variables.player = playerMod.getPlayer();
	variables.thePage = pageMod.getPage(url, variables.player.getLocale());
	
	if (variables.thePage){
		// Page content loading
		let pageURL = url.split('.html')[0];
		let pageFile = fs.readFileSync('../content/pages' + pageURL + '.vm', {encoding:'utf8', flag:'r'});
		if (!pageFile){
			return;
		}
		variables.body = pageFile;
		variables.title = variables.thePage.getTitle();

		// Layout loading
		let layoutURL = variables.thePage.getLayoutName();
		let layoutFile = fs.readFileSync('../content/layouts/' + layoutURL, {encoding:'utf8', flag:'r'});
		if (!layoutFile){
			return;
		}
		layoutFile = '<!-- INIT Layout ' + layoutURL + ' -->\r\n' + layoutFile + '\r\n<!-- END Layout ' + layoutURL + ' -->\r\n';

		// Putting all together
		layoutFile = executeCommand(layoutFile, 'parse', getTemplate);
		let finalFile = layoutFile.replace('$body', variables.body);
		finalFile = velocity.render(finalFile, variables);
		finalFile = replaceModules(finalFile);
		finalFile = replaceConstants(finalFile);
		fs.writeFileSync('tmp/page.txt', finalFile);

		return finalFile;
	}else{
		return "404 ERROR - File not found";
	}
}

function getTemplate(command, url){
	if (!url.includes('.vm')){
		url += '.vm';
	}
	let data = fs.readFileSync('../content/templates/' + url, {encoding:'utf8', flag:'r'});
	if (data){
		let d = '<!-- INIT template ' + url + ' -->\r\n';
		d += data;
		d += '<!-- END template ' + url + ' -->\r\n';
		return d;
	}else{
		return '<!-- NOT RENDERED template ' + url + ' -->\r\n';
	}
}

function executeCommand(page, command, execFunction){
	let regexp = new RegExp('#' + command + '\\([\'|"]([a-z_\\-A-Z.0-9]+)[\'|"]\\)', 'g');
	return page.replace(regexp, execFunction);
}

// TODO: Constants don't work properly.
function replaceConstants(page){
	let data = fs.readFileSync('../content/constants.json', {encoding:'utf8', flag:'r'});
	if (data){
		let constants = JSON.parse(data);
		constants.constants.forEach(constant => {
			let regexp = new RegExp('{constant\\(' + constant['name'] + '\\)}', 'g');
			page = page.replace(regexp, constant[lang]);
		});
		return page;
	}else{
		return false;
	}
}

function replaceModules(page){
	let data = fs.readFileSync('../content/modules.json', {encoding:'utf8', flag:'r'});
	if (data){
		let modules = JSON.parse(data);
		modules.forEach(module => {
			let regexp = new RegExp('{module\\(' + module['id'] + '\\)}', 'g');
			var moduleInstance = new modulesMod.ModuleByClass(module, variables);
			page = page.replace(regexp, moduleInstance.getRenderedBody());
		});
		return page;
	}else{
		return false;
	}
}

exports.getPage = getPage;