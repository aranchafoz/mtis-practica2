var connection = require('../mySqlConnection')

//creamos un objeto para ir almacenando todo lo que necesitemos
var poblacionModel = {};

poblacionModel.consultaCP = function(cp, callback)
{
  if(cp) {
    if (!connection) {
  		throw "Error: Failed to connect with database"
  	} else {
      var sql = 'SELECT nombre, provincia FROM `poblaciones` WHERE cp = \'' + cp + '\';'
  		connection.query(sql, function(error, rows) {
        if(rows.length > 0) {
          let obj = {
            cp: cp,
            poblacion: rows[0].nombre,
            provincia: rows[0].provincia,
            existe: true
          }

  				callback(obj);
  			} else {
          let obj = {
            cp: cp,
            poblacion: '',
            provincia: '',
            existe: false
          }
  				callback(obj);
  			}
  		});
  	}
  } else {
    var error = "Field \'cp\' is required"
    throw error;
  }
}

module.exports = poblacionModel
