// load http module
var http = require('http');
var fs = require('fs');
var express = require('express');

// // create http server
// http.createServer(function (req, res) {
//     // open and read in helloworld.js
//     fs.readFile('helloworld.js', 'utf8', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         if (err) {
//             res.write('Could not find or open file for reading\n');
//         } else {
//             // if no error, write JS file to client
//             res.write(data);
//             res.end();
//             console.log('Hello World Served');
//         }
//     });
// }).listen(8124, function() { console.log('Bound to port 8124'); });

// console.log('Server running on 8124/');



const hostname = '127.0.0.1'; 
const port = 3000;
var path = require('path')

var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));


app.get('/', (req, res) => { 
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) {
            res.write('Could not find or open file for reading\n');
        } else {
            // if no error, write JS file to client
            res.write(data);
            res.end();
            console.log('Hello World Served');
        }
    });
});

app.get('/tester', (req, res) => { 
    res.write(req);
    console.log(req);
});


app.listen(port, hostname, () => { 
   console.log(`Server running at http://${hostname}:${port}/`); 
}); 




// $(document).on('change', '.file-input', function() {
//     console.log("change detected");
        

//     var filesCount = $(this)[0].files.length;
    
//     var textbox = $(this).prev();
  
//     if (filesCount === 1) {
//       var fileName = $(this).val().split('\\').pop();
//       textbox.text(fileName);
//       console.log("File uploaded: ");
//     } else {
//       textbox.text(filesCount + ' files selected');
//     }
//   });