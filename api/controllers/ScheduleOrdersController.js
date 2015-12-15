/**
 * ScheduleOrdersController
 *
 * @description :: Server-side logic for managing scheduleorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getProductsList: function(req, res){
		ScheduleOrders.getProductsList(function(err, products){
			if(!err){
				res.json(products);
			}
		});
	},

	add: function(req, res){
		ScheduleOrders.add(req.body, function(err, response){
			if(!err){
				res.json(response);
			}
		})
	}
};

