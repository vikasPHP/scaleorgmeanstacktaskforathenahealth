/*Page displayAllData*/
var express = require('express');
var router = express.Router();
var APIS = require('../api_const.js');
var bookshelf = require('../helpers/bookShelfHelper.js');

router.post(APIS.api.DISPLAY_ALL_DATA, function(req, res, next) {
   var query = 
   		bookshelf.knex
		   .select('id', 'username', 'game', 'difficult_level',	'start_time', 'end_time', 'score')
		   .from('miniclick')
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
router.post(APIS.api.DISPLAY_LIMIT_30_DATA, function (req, res, next) {
    var limit = req.body.limit || 5000;
    var pageNumber = req.body.pageNumber || 0;
    var offset = pageNumber * limit;

    if(limit < 0) {
    	res.status(200).json({ status: 1002, message: 'Limit '+APIS.messages.STATUS_MSG_1002 });
        return;
    }
    if(pageNumber == 0) {
    	res.status(200).json({ status: 1002, message: 'Page Number '+APIS.messages.STATUS_MSG_1002 });
        return;
    }
    var query =
       bookshelf.knex
       	 .select('id', 'username', 'game', 'difficult_level', 'start_time', 'end_time', 'score')
       	 .from('miniclick')
       	 .limit(limit)
       	 .offset(offset)
       	 .then(function(selectedData) {
       	 	 if(selectedData != null && selectedData != undefined) {
		   	  	 res.status(200).json({ status: 200, selectedData: selectedData });
        		 return;
		   	  } else {
		   	  	res.status(200).json({ status: 1001, message: APIS.messages.STATUS_MSG_1001 });
            	return;
		   	  }
       	 })
       	 .catch(function(err) {
		   	console.log('DISPLAY_LIMIT_30_DATA ERROR==> ' + err.message);
            return;
		 });
});

module.exports = router;
