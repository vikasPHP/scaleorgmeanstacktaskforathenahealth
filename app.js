/*App.JS to create index*/
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var fs = require('fs');
var localPath = __dirname;

/*T rectify the issue TypeError: Router.use() requires middleware function but got a Object*/
app.use(bodyParser.json());

displayAllData = require('./routers/display_all_data.js');
sortingAcsDesc = require('./routers/sorting_acs_desc.js');
groupbyProvideSubtotal = require('./routers/groupby_provide_subtotal.js');
displayCustomChart = require('./routers/display_custom_chart.js');

app.use('/miniclick/homepage', displayAllData);
app.use('/miniclick/homepage', sortingAcsDesc);
app.use('/miniclick/homepage', groupbyProvideSubtotal);
app.use('/miniclick/homepage', displayCustomChart);


/*Rectify the GET error*/
app.get('/', function(req, res, next) {
   res.send('Welcome to MiniClick ...');
   res.end();
});

app.get('/appChart/', function(req, res, next) {
   res.sendFile(localPath+'/appChart/index.html');
});

/*Create th connection string with server*/
app.listen(port, function(err) {
   if(!err) {
   	  console.log('Server has connected with port:', port);
   } else {
   	  console.log('Server error::', err);
   }
})

