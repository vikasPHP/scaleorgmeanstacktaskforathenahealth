/*Page groupby_provide_subtotal*/
var express = require('express');
var router = express.Router();
var APIS = require('../api_const.js');
var bookshelf = require('../helpers/bookShelfHelper.js');

router.post(APIS.api.GROUPBY_PROVIDE_SUBTOTAL, function(req, res, next) {
   var query = 
   		bookshelf.knex('miniclick')
   		   .max('score')
   		   .min('score')
   		   .avg('score')
   		   .count('game')
		   .select('id', 'username')
		   .groupBy('username')
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
		   	    console.log('DISPLAY_ALL_DATA ERROR==> ' + err.message);
            return;
		   });
});

module.exports = router;
