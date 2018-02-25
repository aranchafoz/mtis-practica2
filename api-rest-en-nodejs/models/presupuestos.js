var connection = require('../mySqlConnection')

//creamos un objeto para ir almacenando todo lo que necesitemos
var presupuestoModel = {};

presupuestoModel.generarPresupuesto = function(presupuesto, callback)
{
  if(presupuesto) {
    if (!connection) {
  		throw "Error: Failed to connect with database"
  	} else {
      let obj = {
        idPresupuesto: -1,
        presupuestoGeneradoCorrectamente: false
      }

      presupuestoModel.getMaxPresupuestoId( function(data) {
        if(data && data.maxId > 0) {
          let nextId = data.maxId + 1
          if(presupuesto.idCliente && presupuesto.fechaPresupuesto && presupuesto.referenciaProducto && presupuesto.cantidadProducto) {
            var sql = 'INSERT INTO `presupuestos`(`id`, `idCliente`, `fechaPresupuesto`, `referenciaProducto`, `cantidadProducto`)'
                        + " VALUES (" + nextId + ","
                					+ presupuesto.idCliente + ","
                					+ "STR_TO_DATE('" + presupuesto.fechaPresupuesto + "', '%Y-%m-%d') ,'"
                					+ presupuesto.referenciaProducto + "',"
                					+ presupuesto.cantidadProducto + ");";

        		connection.query(sql, function(error, result) {
              if(!error){
                obj.idPresupuesto = nextId
                obj.presupuestoGeneradoCorrectamente = true
              }
        			callback(obj);
        		});
          } else {
    				callback(obj);
          }
        } else {
  				callback(obj);
        }
      });
  	}
  } else {
    var error = "Some \'presupuesto\' fields are missing."
    throw error;
  }
}

presupuestoModel.getMaxPresupuestoId = function(callback)
{
  if (!connection) {
		throw "Error: Failed to connect with database"
	} else {
    var sql = 'SELECT max(id) AS maxId FROM `presupuestos`;'
		connection.query(sql, function(error, rows) {
      if(rows.length > 0) {
				callback({maxId: rows[0].maxId});
			} else {
				callback({maxId: 0});
			}
		});
	}
}

module.exports = presupuestoModel
