var connection = require('../mySqlConnection')

//creamos un objeto para ir almacenando todo lo que necesitemos
var userModel = {};

userModel.checkRestKey = function(restKey, callback)
{
	if (!connection) {
		throw "Error: Failed to connect with database"
	} else {
    var sql = 'SELECT count(*) as number FROM `rest_keys` WHERE restKey = \'' + restKey + '\';'
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
