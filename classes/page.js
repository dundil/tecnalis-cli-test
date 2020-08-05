// TODO: Privileges in pages.
var fs = require('fs');

class Page {
	constructor(data, lang){
		this.id = data.id;
		this.layout = data.layout.id;
		this.layoutName = data.layout.name;
		this.title = data[lang].title;
		this.url = data[lang].url;
		this.description = data[lang].description;
		this.keywords = data[lang].keywords;
		this.body = "";
	}

	getPageId(){
		return this.id;
	}

	getLayoutName(){
		return this.layoutName;
	}

	getLayout(){
		return this.layout;
	}
	
	getTitle(){
		return this.title;
	}

	getBody(){
		return this.body;
	}
	
	getDescription(){
		return this.description;
	}
	
	getKeywords(){
		return this.keywords;
	}
	
	getUrl(){
		return this.url;
	}
}

function getPageData(url, lang){
	console.log(`getPageData(${url}, ${lang})`);
	let data = fs.readFileSync('../content/pages.json', {encoding:'utf8', flag:'r'});
	if (data){
		let pages = JSON.parse(data);
		let thePage;
		pages.pages.forEach(page => {
			console.log("");
			if (page[lang].url == url){
				thePage = page;
				return false;
			}
		});
		return thePage;
	}else{
		return false;
	}
}

function getPage(url, lang){
	let page = getPageData(url, lang);
	if (page){
		return new Page(page, lang);
	}else{
		return false;
	}
}

exports.getPage = getPage;