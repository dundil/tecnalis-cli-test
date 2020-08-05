
class Player {
	getId(){
		return -1;
	}
	
	getAlias(){
		return "";
	}

	getSessionID(){
		return "0";
	}
	
	getLocale(){
		return "es-ES";
	}
	
	isGroupMember(groupID){
		return groupID == 3 || groupID == 17 || groupID == 20;
	}
	
	getSessionTime(){
		return 100;
	}
	
	getBalance(){
		return 0;
	}
}

const player = new Player();

function getPlayer(){
	return player;
}

exports.getPlayer = getPlayer;