var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var app = express(); // app è istanza di express()
var api = require('./public/app/routes/api')(app,express);

// MongoDB:
// Tolgo in quanto uso config.js var dbUri = 'mongodb://localhost:27017/agendalegale';
var server = require('http');
/* on('connected')... oppure once('open') */

mongoose.connection.once("open", function() {
	console.log("Connesso al DB!");
	server = server.createServer(app)
		.listen(config.port, function(){
			console.log('Server in ascolto sulla porta '+config.port);
		}
	).on('error', function(err) {
			console.log('Errore di avvio: '+err);
		}
	);
}).on("error", function(err) {
	console.error('Impossibile collegarsi al DB in fase di avvio: ', err);
}).on("disconnected", function () {
	console.log('Mongoose è stato disconnesso!');
	//server.close();

});

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use('/api',api);

app.get('/',function(req,res){
	res.send('Hello World');
});



