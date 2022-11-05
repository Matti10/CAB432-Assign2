/*
    CAB432 Assignment 2

    Node server to host the front end

    Author: Mattias Winsen
    Date: 20/10/2022

    References:
    CAB432 Lectures
*/

// load http module
var http = require('http');
var fs = require('fs');
var express = require('express');

// Defines
const hostname = '127.0.0.1'; 
const port = 3000;
var path = require('path')

// Setup app
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));


// Setup routes
app.get('/', (req, res) => { 
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) {
            res.write('Could not find or open file for reading\n');
        } else {
            // if no error, write JS file to client
            res.write(data);
            res.end();
            console.log('Image Converter Served');
        }
    });
});

// Run the server
app.listen(port, hostname, () => { 
   console.log(`Server running at http://${hostname}:${port}/`); 
}); 
