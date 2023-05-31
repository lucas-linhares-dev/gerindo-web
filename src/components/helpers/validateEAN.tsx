

export function validateEAN8(codigo: any) {
    if (codigo.length !== 8 || !/^\d+$/.test(codigo)) {
      return false; // O código deve ter 8 dígitos numéricos
    }
  
    var digitoVerificador = parseInt(codigo.charAt(7));
    var soma = 0;
  
    for (var i = 0; i < 7; i++) {
      var digito = parseInt(codigo.charAt(i));
      soma += (i % 2 === 0) ? digito * 3 : digito;
    }
  
    var resto = soma % 10;
    var digitoCalculado = (resto === 0) ? 0 : 10 - resto;
  
    return digitoCalculado === digitoVerificador;
}


export function validateEAN13(codigo: any) {
    if (codigo.length !== 13 || !/^\d+$/.test(codigo)) {
      return false; // O código deve ter 13 dígitos numéricos
    }
  
    var digitoVerificador = parseInt(codigo.charAt(12));
    var soma = 0;
  
    for (var i = 0; i < 12; i++) {
      var digito = parseInt(codigo.charAt(i));
      soma += (i % 2 === 0) ? digito : digito * 3;
    }
  
    var resto = soma % 10;
    var digitoCalculado = (resto === 0) ? 0 : 10 - resto;
  
    return digitoCalculado === digitoVerificador;
}


export function validateEAN14(codigo: any) {
    if (codigo.length !== 14 || !/^\d+$/.test(codigo)) {
      return false; // O código deve ter 14 dígitos numéricos
    }
  
    var digitoVerificador = parseInt(codigo.charAt(13));
    var soma = 0;
  
    for (var i = 0; i < 13; i++) {
      var digito = parseInt(codigo.charAt(i));
      soma += (i % 2 === 0) ? digito * 1 : digito * 3;
    }
  
    var resto = soma % 10;
    var digitoCalculado = (resto === 0) ? 0 : 10 - resto;
  
    return digitoCalculado === digitoVerificador;
}
