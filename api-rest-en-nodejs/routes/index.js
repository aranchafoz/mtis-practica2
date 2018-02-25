//obtenemos los modelos con toda la funcionalidad
var NifModel = require('../models/nif');


//creamos el ruteo de la aplicación
module.exports = function(app)
{
	// Obtiene un NIF y devuelve si es válido
	app.post("/validarNIF", function(req,res,next)
	{
		var nif = req.body.nif

		NifModel.checkNif(nif, function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.isValid)
			{
				res.status(200)
				res.send({msg: "NIF is valid"})
				res.end()
				next()
			}
			else
			{
				res.status(500)
				res.send({msg: "NIF is not valid"})
				res.end()
				next()
			}
		});
	});
	//
  // // Obtiene un IBAN y devuelve si es válido (si no lo es devuelve un mensaje de error)
  // app.post("/validarIBAN", function(req,res)
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
	//
  // // Obtiene los datos según un codigo postal
	// app.get("/consultaCodigoPostal", function(req,res)
	// {
	// 	//id del usuario
	// 	var id = req.params.id;
	// 	//solo actualizamos si la id es un número
	// 	if(!isNaN(id))
	// 	{
	// 		UserModel.getUser(id,function(error, data)
	// 		{
	// 			//si el usuario existe lo mostramos en formato json
	// 			if (typeof data !== 'undefined' && data.length > 0)
	// 			{
	// 				res.json(200,data);
	// 			}
	// 			//en otro caso mostramos una respuesta conforme no existe
	// 			else
	// 			{
	// 				res.json(404,{"msg":"notExist"});
	// 			}
	// 		});
	// 	}
	// 	//si hay algún error
	// 	else
	// 	{
	// 		res.json(500,{"msg":"Error"});
	// 	}
	// });
	//
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
