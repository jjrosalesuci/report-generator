var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var pdf = require('html-pdf');
var requestify = require('requestify');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mocks = require ('./mocks/mocks');

app.get('/:report', function(req, res) {
    const reportId = req.params.report;
    const params =  mocks[reportId];
    console.log(params);
    res.render(`pages/${reportId}` , {params});
});

app.post('/:report', function(req, res) {
  const reportId = req.params.report;
  const params = req.body
  console.log('params', params);
  console.log('params', reportId);
  res.send({
    file: 'generated.pdf'
  });
});


app.get('/pdf', function(req, res) {
   
    var externalURL = 'http://127.0.0.1:3000/index';
      
      requestify.get(externalURL).then(function (response) {
        // Get the raw HTML response body
        var html = response.body; 
        
        var config = {format: 'A4'}; // or format: 'letter' - see https://github.com/marcbachmann/node-html-pdf#options
     
       // Create the PDF
        pdf.create(html, config).toFile('generated.pdf', function (err, result) {
           if (err) return console.log(err);
           console.log(result);
           res.sendFile('generated.pdf',{ root: __dirname });
        });
     });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});