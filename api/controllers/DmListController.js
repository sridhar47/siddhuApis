/**
 * DmListController
 *
 * @description :: Server-side logic for managing dmlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dmListAll: function(req, res){
		if(req.method == 'POST'){
			sails.log.debug(req.body);
			// return;
			DmList.dmListAdd(req.body, function(err, response){
				if(!err){
					res.json(response)
				}
			})
		}else{
			DmList.getList(function(err, list){
				if(!err){
					res.json(list);
				}
			})
		}
	}	
};

