const { AliraModule } = require('../classes/module.js');

class LobbyModule extends AliraModule {
	constructor(data, lang){
		super(data, lang);
		this.games = data.rooms;
		this.variables.games = this.games;
	}
}

exports.LobbyModule = LobbyModule;