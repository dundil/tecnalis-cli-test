const {LobbyModule} = require('../modules/LobbyModule');
const {BannerHTML5Module} = require('../modules/BannerHTML5Module');

const classes = {
	"LobbyModule": LobbyModule,
	"BannerHTML5Module": BannerHTML5Module
}

class ModuleByClass {
	constructor(data, lang){
		let className = data.className.split('.').pop();
		return new classes[className](data, lang);
	}
}

exports.ModuleByClass = ModuleByClass;