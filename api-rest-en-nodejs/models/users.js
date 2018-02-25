var connection = require('../mySqlConnection')

//creamos un objeto para ir almacenando todo lo que necesitemos
var userModel = {};

userModel.checkSoapKey = function(soapKey, callback)
{
	if (!connection) {
		throw "Error: Failed to connect with database"
	} else {
    var sql = 'SELECT count(*) as number FROM `soap_keys` WHERE soapKey = \'' + soapKey + '\';'
		connection.query(sql, function(error, rows) {
      if(rows[0].number > 0) {
					callback(null, true);
			} else {
				callback(null, false);
			}
		});
	}
}

module.exports = userModel
