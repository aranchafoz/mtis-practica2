var UserModel = require('../models/users');

module.exports = function(app) {

  app.use('/', function(req, res, next) {
  	var soapKey = req.body.soapKey
    if(!soapKey) {
      res.status(500)
      res.send({msg: "Error: Field \'soapKey\' is mandatory"})
      res.end()
    } else {
      try {
        UserModel.checkSoapKey(soapKey, function(error, exists) {
      		if(!exists) {
            res.status(500)
            res.send({msg: "Soap Key is not valid"})
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
