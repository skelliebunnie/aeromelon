const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

PORT = process.env.PORT || 8080;

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', (req, res) => {
	fs.readFile(__dirname + '/db.json', 'utf8', (err,data) => {
		if(err) {
			console.error(err);
		} else {
			res.json( JSON.parse(data) );
		}
	});
	
});

app.get('/api/users/:name', (req, res) => {

	fs.readFile(__dirname + '/db.json', 'utf8', (err,data) => {
		if(err) {
			console.error(err);
		} else {
			const list = JSON.parse(data);

			for(var i in list) {
				if(list[i].name.toLowerCase() === (req.params.name).toLowerCase()) {
					res.send([list[i]]);
				}
			}
		}
	});
	
});


app.post('/api/users', (req, res) => {
	let isStudent = req.body.isStudent === 'student' ? true : false;

	fs.readFile(__dirname + '/db.json', 'utf8', (err,data) => {
		if(err) {
			console.error(err);
		} else {
			userList = JSON.parse(data);

			userList.push({name: req.body.name, isStudent: isStudent});

			fs.writeFile(__dirname + '/db.json', JSON.stringify(userList), (err) => {
				if(err) console.log(err);
				else res.json(userList);
			});
		}
	});
});

app.delete('/api/users/:id', (req, res) => {

	fs.readFile(__dirname + '/db.json', 'utf8', (err,data) => {
		if(err) {
			console.error(err);
		} else {
			userList = JSON.parse(data);

			for(var i in userList) {
				if(userList[i].id === parseInt(req.params.id)) {
					userList.splice(i, 1);
				}
			}

			fs.writeFile(__dirname + '/db.json', JSON.stringify(userList), (err) => {
				if(err) console.log(err);
				else res.json(userList);
			});
		}
	});
});

app.listen(PORT, function() {
	console.log(`Listening on port ${PORT}`);
});