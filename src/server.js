const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');

const config = require('./config');

/**
 * Init app
 */
const app = express();
app.disable('x-powered-by');
app.locals.compileDebug = false;
app.locals.cache = true;
app.set('view engine', 'pug');

/**
 * CORS
 */
app.use(cors());

/**
 * Handlers
 */
app.get('/:url(*)', require('./proxy'));

/**
 * Create server
 */
const server = config.https.enable ?
	https.createServer({
		key: fs.readFileSync(config.https.key),
		cert: fs.readFileSync(config.https.cert),
		ca: fs.readFileSync(config.https.ca)
	}, app) :
	http.createServer(app);

/**
 * Server listen
 */
server.listen(config.port, () => {
	console.log('Yee haw');
});
