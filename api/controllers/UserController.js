/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	login: function(req, res){
		var doc = req.body;
		User.login(doc, function(err, response){
			if(!err){
				res.json(response)
			}
		});
	},

	signup: function(req, res){
		var doc = req.body;
		User.signup(doc, function(err, response){
			if(!err){
				res.json(response)
			}
		});
	}

};

