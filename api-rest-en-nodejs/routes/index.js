//obtenemos los modelos con toda la funcionalidad
var ValidatorsModel = require('../models/validators');
var PoblacionModel = require('../models/poblaciones');


//creamos el ruteo de la aplicación
module.exports = function(app)
{
	// Obtiene un NIF y devuelve si es válido
	app.post("/validarNIF", function(req,res,next)
	{
		var nif = req.body.nif

		ValidatorsModel.checkNif(nif, function(error, data)
		{
			if(data && data.isValid)
			{
				res.status(200)
				res.send({isValid: true})
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.send({isValid: false})
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
			if(data && data.isValid)
			{
				res.status(200)
				res.send(data)
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.send(data)
				res.end()
				next()
			}
		});
	});

	// Obtiene los datos según un codigo postal
	app.post("/consultaCodigoPostal", function(req,res,next)
	{
		var cp = req.body.cp

		PoblacionModel.consultaCP(cp, function(data)
		{
			if(data && data.existe)
			{
				res.status(200)
				res.send(data)
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.send(data)
				res.end()
				next()
			}
		});
	});

  // // Crea un nuevo presupuesto
  // app.post("/generarPresupuesto", function(req,res)
  // {
  //   //creamos un objeto con los datos a insertar del usuario
  //   var userData = {
  //     id : null,
  //     username : req.body.username,
  //     email : req.body.email,
  //     password : req.body.password,
  //     created_at : null,
  //     updated_at : null
  //   };
  //   UserModel.insertUser(userData,function(error, data)
  //   {
  //     //si el usuario se ha insertado correctamente mostramos su info
  //     if(data && data.insertId)
  //     {
  //       res.redirect("/users/" + data.insertId);
  //     }
  //     else
  //     {
  //       res.json(500,{"msg":"Error"});
  //     }
  //   });
  // });
}
