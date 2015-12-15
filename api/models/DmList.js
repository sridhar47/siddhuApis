/**
* DmList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  },

  dmListAdd: function(docs, cb){
  	if(!Array.isArray(docs)){
      docs = [docs];
    }
    for (var i = 0; i < docs.length; i++) {
    	var item = docs[i];
    	DmList.create({name: item}, function(err, dm){
    		if(!err){
    			sails.log.debug(dm);
    		}
    	});
    };
    cb(null, 'Done..!')
  },

  getList: function(cb){
  	DmList.find().exec(function(err, list){
  		sails.log.debug(list);
  		if(!err){
  			cb(null, list);
  		}
  	})
  }

};

