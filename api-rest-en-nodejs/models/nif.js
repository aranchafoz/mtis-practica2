var UserModel = require('../models/users');

//creamos un objeto para ir almacenando todo lo que necesitemos
var nifModel = {};

nifModel.checkNif = function(nif, callback)
{
  if(nif) {
    var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
  	var valueDni = nif.substr(0, nif.length-1);
  	var letra = nif.substr(nif.length-1, 1).toUpperCase();

    var isValid = (lockup.charAt(valueDni % 23) === letra)

    callback(null, { isValid: isValid });
  } else {
    var error = "Field \'nif\' is required"
    throw error;
  }
}

module.exports = nifModel
