// TODO: Privileges in modules.
var fs = require('fs');
var velocity = require('velocityjs');

class AliraModule {
	constructor(data, variables){
		this.variables = variables;
		this.id = data.id;
		this.name = data.name;
		this.class = data.class;
		this.lang = this.variables.player.getLocale();
		this.data = data;
		this.body = getModuleBody(this.id, this.lang);
	}

	getId(){
		return this.id;
	}

	getName(){
		return this.name;
	}

	getClass(){
		return this.class;
	}
	
	getData(){
		return this.data;
	}

	getRenderedBody(){
		let moduleBody = this.body;
		let regexp = new RegExp('#parse\\([\'|"]([a-z_\\-A-Z.0-9]+)[\'|"]\\)', 'g');
		moduleBody = moduleBody.replace(regexp, (command, url)=> {
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
		});
		moduleBody = velocity.render(moduleBody, this.variables);
		moduleBody = '<!-- INIT Module ' + this.getId() + ' -->\r\n' + moduleBody + '\r\n<!-- END Module ' + this.getId() + ' -->\r\n';
		return moduleBody;
	}
}

function getModuleData(id, lang){
	let data = fs.readFileSync('../content/modules.json', {encoding:'utf8', flag:'r'});
	if (data){
		let modules = JSON.parse(data);
		let theModule;
		modules.forEach(module => {
			if (module[lang].url == url){
				theModule = module;
				return false;
			}
		});
		return theModule;
	}else{
		return false;
	}
}

function getModule(id, lang){
	let module = getModuleData(id, lang);
	if (module){
		return new AliraModule(module, lang);
	}else{
		return false;
	}
}

function getModuleBody(id, lang){
	let data = fs.readFileSync('../content/modules/' + id + '.vm', {encoding:'utf8', flag:'r'});
	if (data){
		return data;
	}else{
		return false;
	}
}

exports.getModule = getModule;
exports.AliraModule = AliraModule;