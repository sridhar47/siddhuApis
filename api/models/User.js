/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var crypto     = require('crypto');

module.exports = {

  attributes: {

  },

  login: function(doc, cb){
  	if(doc && doc.email && doc.password){
  		User.findOne({ email: doc.email }).exec(function(err, user){
  			if(!err){
  				validatePassword(doc.password, user.password, function(err, result){
  					if(!err){
  						delete user.password
  						cb(null, user)
  					}else{
  						cb(null, 'please enter valid password')
  					}
  				})
  			}else{
  				cb(null, 'user not found')
  			}
  		});
  	}
  },

  signup: function(opts, cb){
  	if(opts && opts.email && opts.password){
  		User.findOne({ email: opts.email }).exec(function(err, user){
  			if(err){
  				cb(err)
  			}else if(user){
  				cb(null, 'email already exits')
  			}else{
  				saltAndHash(opts.password, function(hash){
                  opts.password = hash;
                  User.create(opts, function(err, user){
                      if(err){
                          cb(err);
                      }else{
                          cb(null, user);
                      }
                  });
              });
  			}
  		})
  	}
  },
  list: function(cb){
    User.find().exec(function(err, users){
      if(!err){
        if(users.length > 0){
          users.map(function(obj){
            delete obj.password
          });
          cb(null, users)
        }else{
          cb(null, 'No users registered upto now')
        }
      }
    })
  }
};

var generateSalt = function(){
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  var salt = '';
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
}

var md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
  var salt = generateSalt();
  callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback){
  var salt = hashedPass.substr(0, 10);
  var validHash = salt + md5(plainPass + salt);
  callback(null, hashedPass === validHash);
}