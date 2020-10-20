/**
 * Express server to handle API calls, routes, etc.
 * 
 * NOTE: This is only for development purposes - when using
 * Firebase Hosting, a server is not necessary, only the static
 * HTML/build files. Firebase Functions can be used in place
 * of the server functions and routes included here.
 */

// package dependencies
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require('path');

// server port
const PORT = process.env.PORT || 8080;


/**
 * Express config and Middleware
 */

// express app config
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.json());


/**
 * Express API endpoints
 */

// route defaults to main html page
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});


// listen on environment port or 8080
http.listen(PORT, function () {
    console.log(`Running on localhost:${PORT}`);
});
