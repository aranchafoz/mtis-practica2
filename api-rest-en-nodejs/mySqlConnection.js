//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{
		host: 'localhost',
		user: 'arancha',
		password: '12345',
		database: 'mtis_p1'
	}
);

module.exports = connection;
