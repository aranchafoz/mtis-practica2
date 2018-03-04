//obtenemos los modelos con toda la funcionalidad
var ValidatorsModel = require('../models/validators');
var PoblacionModel = require('../models/poblaciones');
var PresupuestoModel = require('../models/presupuestos');


//creamos el ruteo de la aplicación
module.exports = function(app)
{
	// Obtiene un NIF y devuelve si es válido
	app.post("/validarNIF", function(req,res,next)
	{
		var nif = req.body.nif

		ValidatorsModel.checkNif(nif, function(error, data)
		{
			if(data)
			{
				res.send({isValid: data.isValid})
				res.status(200)
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.end()
				next()
			}
		});
	});

	// Obtiene un IBAN y devuelve si es válido (si no lo es devuelve un mensaje de error)
	app.post("/validarIBAN", function(req,res,next)
	{
		var nif = req.body.iban

		ValidatorsModel.checkIban(nif, function(error, data)
		{
			if(data)
			{
				res.status(200)
				res.send(data)
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.end()
				next()
			}
		});
	});

	// Obtiene los datos según un codigo postal
	app.post("/consultaCodigoPostal", function(req,res,next)
	{
		var cp = req.body.codigoPostal

		PoblacionModel.consultaCP(cp, function(data)
		{
			console.log(data)
			if(data)
			{
				res.status(200)
				res.send(data)
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.end()
				next()
			}
		});
	});

	// Crea un nuevo presupuesto
	app.post("/generarPresupuesto", function(req,res,next)
	{
		var presupuesto = req.body

		PresupuestoModel.generarPresupuesto(presupuesto, function(data)
		{
			if(data)
			{
				res.status(200)
				res.send(data)
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.end()
				next()
			}
		});
	});
}
