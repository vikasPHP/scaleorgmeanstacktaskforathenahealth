/*Page display_custom_chart*/
var express = require('express');
var router = express.Router();
var APIS = require('../api_const.js');
var bookshelf = require('../helpers/bookShelfHelper.js');

router.get(APIS.api.DISPLAY_CUSTOM_CHART, function(req, res, next) {
   var query = 
   		bookshelf.knex('miniclick')
   		   .max('score as MaxScore')
   		   .min('score as MinScore')
   		   .avg('score as AvgScore')
   		   .count('game as NumOfGame')
		   .select('id', 'username')
		   .groupBy('username')
		   .limit(1)
		   .offset(10)
		   .then(function(allData) {
		   	  if(allData != null && allData != undefined) {
		   	  	 res.status(200).json({ status: 200, allData: allData });
        		 return;
		   	  } else {
		   	  	res.status(200).json({ status: 1001, message: APIS.messages.STATUS_MSG_1001 });
            	return;
		   	  }
		   })
		   .catch(function(err) {
		   	    console.log('DISPLAY_CUSTOM_CHART ERROR==> ' + err.message);
            return;
		   });
});

module.exports = router;
