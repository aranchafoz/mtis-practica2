//creamos un objeto para ir almacenando todo lo que necesitemos
var validatorModel = {};

validatorModel.checkNif = function(nif, callback)
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

validatorModel.checkIban = function(iban, callback)
{
  var isValid = false
  var error = ""
  if(iban) {

    //Se pasa a Mayusculas
    var IBAN = iban.toUpperCase();
    //Se quita los blancos de principio y final.
    IBAN = IBAN.trim()
    IBAN = IBAN.replace(/\s/g, ""); //Y se quita los espacios en blanco dentro de la cadena

    var letra1,letra2,num1,num2;
    var isbanaux;
    var numeroSustitucion;
    //La longitud debe ser siempre de 24 caracteres
    if (IBAN.length != 24) {
       isValid = false
       error = "La longitud debe ser siempre de 24 caracteres"
    }

    // Se coge las primeras dos letras y se pasan a números
    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = getnumIBAN(letra1);
    num2 = getnumIBAN(letra2);
    //Se sustituye las letras por números.
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    // Se mueve los 6 primeros caracteres al final de la cadena.
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

    //Se calcula el resto, llamando a la función modulo97, definida más abajo
    resto = modulo97(isbanaux);
    if (resto == 1){
      isValid = true
      error = ""
    }else{
       isValid = false
       error = "Los dígitos de control IBAN no coinciden con la cadena DC."
    }
    callback(null, { isValid: isValid, error: error});
  } else {
    var error = "Field \'iban\' is required"
    throw error;
  }
}

function modulo97(iban) {
    var parts = Math.ceil(iban.length/7);
    var remainer = "";

    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
    }

    return remainer;
}

function getnumIBAN(letra) {
    ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letras.search(letra) + 10;
}

module.exports = validatorModel
