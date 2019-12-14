var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var pdf = require('html-pdf');
var bodyParser = require('body-parser');
var uniqid = require('uniqid');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mocks = require ('./mocks/mocks');

app.get('/:report', function(req, res) {
    const reportId = req.params.report;
    const params =  mocks[reportId];
    res.render(`pages/${reportId}`, {params});
});

const buildPdf = (reportId, html, res) => {
  // Get the raw HTML response body
  var config = {format: 'A4'}; // or format: 'letter' - see https://github.com/marcbachmann/node-html-pdf#options

 // Create the PDF
  const fileName = `${reportId}-${uniqid()}.pdf`;
  pdf.create(html, config).toFile(fileName, function (err, result) {
     if (err) return console.log(err);
     console.log(result);
     // res.sendFile('generated.pdf',{ root: __dirname });
     res.send({
      success: true,
      file: fileName
    });
  });
}

app.post('/:report', function(req, res) {
  const reportId = req.params.report;
  const params = req.body
  console.log('params', params);
  console.log('reportId', reportId);
  res.render(`pages/${reportId}`, {params}, (err, html) => {
    if (!err) {
      console.log(err);
    }
    // console.log(html);
    buildPdf(reportId, html, res);
  });
});

app.listen(3000, function () {
  console.log('Report generator is running at 3000!');
});