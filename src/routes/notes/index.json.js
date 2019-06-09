const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(db.get('notes').value()));
}

export function post(req, res) {
	res.writeHead(201, {
		'Content-Type': 'application/json'
	});
	
	var result = db.get('notes')
		.push({ id: uuid(), text: req.body.text })
		.value();
	db.write();

	res.end(JSON.stringify(result));
}

export function patch(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	var result = db.get('notes')
		.find({ id: req.body.id })
		.assign({ text: req.body.text })
		.value();
	
	db.write()
	
	res.end(JSON.stringify(result));
}

export function del(req, res) {
	res.writeHead(204, {
		'Content-Type': 'application/json'
	});

	db.get('notes')
		.remove({ id: req.body.id })
		.value()
	
	db.write()

	res.end();		
}
