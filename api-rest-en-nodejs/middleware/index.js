var UserModel = require('../models/users');

module.exports = function(app) {

  app.use('/', function(req, res, next) {
  	var restKey = req.body.RestKey
    if(!restKey) {
      res.status(400)
      res.send({msg: "Field \'RestKey\' is mandatory"})
      res.end()
    } else {
      try {
        UserModel.checkRestKey(restKey, function(error, exists) {
      		if(!exists) {
            res.status(401)
            res.send({msg: "Rest Key is not valid"})
            res.end()
      		} else {
            next();
          }
      	});
      } catch(error) {
          throw error
      }
    }
  });
}
