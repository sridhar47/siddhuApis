/**
* ScheduleOrders.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  },

  add: function(docs, cb){
  	if(!Array.isArray(docs)){
      docs = [docs];
    }
    for (var i = 0; i < docs.length; i++) {
    	var item = docs[i];
    	ScheduleOrders.create(item, function(err, product){
    		if(!err){
    			sails.log.debug(i);
    		}
    	});
    };
    cb(null, 'Done..!');
  },

  getProductsList: function(cb){
  	var options = {};
  	options.createdAt = -1;
  	ScheduleOrders.find().sort(options).exec(function(err, response){
  		if(!err){
  			cb(null, response)
  		}
  	});
  }


};

