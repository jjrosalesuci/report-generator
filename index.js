var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var pdf = require('html-pdf');
var bodyParser = require('body-parser');
var uniqid = require('uniqid');
var log4js = require('log4js');

log4js.configure({
    appenders: {error: {type: 'file', filename: 'log.txt'}},
    categories: {default: {appenders: ['error'], level: 'error'}}
});

const logger = log4js.getLogger('error');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

const mocks = require('./mocks/mocks');

app.get('/favico.ico', function (req, res) {});

app.get('/favicon.ico', function (req, res) {});

app.get('/:report/html', function (req, res) {
    const reportId = req.params.report;
    const params = mocks[reportId];
    res.render(`pages/${reportId}`, {params});
});

app.get('/:fileId/pdf', function (req, res) {
    const fileId = req.params.fileId;
    res.sendFile(fileId, {root: `${__dirname}\\reports/`});
});

const buildPdf = (reportId, html, res) => {
    // Get the raw HTML response body
    const config = {format: 'A4'}; // or format: 'letter' - see https://github.com/marcbachmann/node-html-pdf#options

  // Create the PDF
    const fileName = `${reportId}-${uniqid()}.pdf`;
    pdf.create(html, config).toFile(`${__dirname}\\reports/${fileName}`, function (err, result) {
        if (err) return console.log(err);
        console.log(result);
        // res.sendFile('generated.pdf',{ root: __dirname });
        res.send({
            success: true,
            file: fileName,
            url: `http://localhost:3000/${fileName}/pdf`
        });
    });
}

app.post('/:report', function (req, res) {
    try {
        const reportId = req.params.report;
        const params = req.body;
        res.render(`pages/${reportId}`, {params}, (err, html) => {
            if (!err) {
                console.log(err);
            }
            buildPdf(reportId, html, res);
        });
    } catch (err) {
        logger.error(req.body);
        logger.error(err);
        res.send({
            success: false,
            file: null,
            url: null,
        });
    }
});


app.post('/htmlraw/:reportId', function (req, res) {
    try {
        const reportId = req.params.reportId;
        const { html } = req.body;
        if (!html || !reportId) {
            res.send(400);
        } else {
            buildPdf(reportId, html, res);
        }
    } catch (err) {
        logger.error(req.body);
        logger.error(err);
        res.send({
            success: false,
            file: null,
            url: null,
        });
    }
});

app.listen(3000, function () {
    console.log('Report generator is running at 3000!');
});