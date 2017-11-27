/*Page sorting_acs_desc*/
var express = require('express');
var router = express.Router();
var APIS = require('../api_const.js');
var bookshelf = require('../helpers/bookShelfHelper.js');

router.post(APIS.api.SORTING_ACS_DESC, function(req, res, next) {
   var username = req.body.username || 'ASC';
   var game = req.body.game || 'ASC';
   var score = req.body.score || 'ASC';
   var query = 
   		bookshelf.knex
		   .select('id', 'username', 'game', 'difficult_level',	'start_time', 'end_time', 'score')
		   .from('miniclick')
		   .orderBy('username', username)
		   .orderBy('game', game)
		   .orderBy('score', score)
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
		   	    console.log('SORTING_ACS_DESC ERROR==> ' + err.message);
            return;
		   });
});
router.post(APIS.api.FILTER_BY_ALL_COLUMN, function (req, res, next) {
    var id = req.body.id || null;
    var username = req.body.username || null;
    var game = req.body.game || null;
    var difficult_level = req.body.difficult_level || null;
    var score = req.body.score || null;

    /*if(id == null && id == undefined) {
    	res.status(200).json({ status: 1003, message: 'id '+APIS.messages.STATUS_MSG_1003 });
        return;
    } else if(username == null && username == undefined) {
    	res.status(200).json({ status: 1003, message: 'username '+APIS.messages.STATUS_MSG_1003 });
        return;
    } else if(game == null && game == undefined) {
    	res.status(200).json({ status: 1003, message: 'game '+APIS.messages.STATUS_MSG_1003 });
        return;
    } else if(difficult_level == null && difficult_level == undefined) {
    	res.status(200).json({ status: 1003, message: 'Difficult Level '+APIS.messages.STATUS_MSG_1003 });
        return;
    } else if(score == null && score == undefined) {
    	res.status(200).json({ status: 1003, message: 'Score '+APIS.messages.STATUS_MSG_1003 });
        return;
    }*/
    var query =
       bookshelf.knex
       	 .select('id', 'username', 'game', 'difficult_level', 'start_time', 'end_time', 'score')
       	 .from('miniclick')
       	 .orWhere('id', 'like', '%'+id+'%')
       	 .orWhere('username', 'like', '%'+username+'%')
       	 .orWhere('game', 'like', '%'+game+'%')
       	 .orWhere('difficult_level', 'like', '%'+difficult_level+'%')
       	 .orWhere('score', 'like', '%'+score+'%')
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
		   	console.log('FILTER_BY_ALL_COLUMN ERROR==> ' + err.message);
            return;
		 });
});

module.exports = router;
