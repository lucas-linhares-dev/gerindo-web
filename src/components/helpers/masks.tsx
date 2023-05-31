export const decimalDigitsMask = (value: string,casasDecimais:number) => {
    
    if(value.trim() === ''){
        let text = '0,'
        for (let i = 0; i < casasDecimais; i++) {
            text += '0'
        }
        text = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: casasDecimais }).format(
            parseFloat(text) / 10 ** casasDecimais
          )
        return text
    }
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: casasDecimais }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 10 ** casasDecimais
    )
    
    return result
    // if ( (parseFloat(value) / 10 ** casasDecimais) >= 1000 ){
    //     return result
    // }else{
    //     return result
    // }
}

export const formatCPFMask = (value: string) => {
  // Remove tudo que não for número
  const numericValue = value.replace(/\D/g, '');

  // Aplica a máscara de CPF
  let maskedValue = numericValue;

  if (numericValue.length > 3) {
    maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
  }
  if (numericValue.length > 6) {
    maskedValue = `${maskedValue.slice(0, 7)}.${maskedValue.slice(7)}`;
  }
  if (numericValue.length > 9) {
    maskedValue = `${maskedValue.slice(0, 11)}-${maskedValue.slice(11, 13)}`;
  }

  return maskedValue;
};


export const formatCNPJMask = (value: string) => {
  // Remove tudo que não for número
  const numericValue = value.replace(/\D/g, '');

  // Aplica a máscara de CNPJ
  let maskedValue = numericValue;

  if (numericValue.length > 2) {
    maskedValue = `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
  }
  if (numericValue.length > 5) {
    maskedValue = `${maskedValue.slice(0, 6)}.${maskedValue.slice(6)}`;
  }
  if (numericValue.length > 8) {
    maskedValue = `${maskedValue.slice(0, 10)}/${maskedValue.slice(10)}`;
  }
  if (numericValue.length > 12) {
    maskedValue = `${maskedValue.slice(0, 15)}-${maskedValue.slice(15, 17)}`;
  }

  return maskedValue;
};

export const formatPhone = (value: string) => {
  // Remove tudo que não for número
  const numericValue = value.replace(/\D/g, '');

  // Aplica a máscara de telefone celular
  let maskedValue = numericValue;

  if (numericValue.length > 0) {
    maskedValue = `(${numericValue.slice(0, 2)}`;
  }
  if (numericValue.length > 2) {
    maskedValue = `${maskedValue}) ${numericValue.slice(2, 7)}`;
  }
  if (numericValue.length > 7) {
    maskedValue = `${maskedValue}-${numericValue.slice(7, 11)}`;
  }

  return maskedValue;
};

export function formatCEPMask(cep: string) {
  var value = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
  var formattedValue = '';

  if (value.length > 8) {
    formattedValue = value.substring(0, 8);
  } else {
    formattedValue = value;
  }

  if (formattedValue.length > 5) {
    formattedValue = formattedValue.substring(0, 5) + '-' + formattedValue.substring(5);
  }

  return formattedValue;
}


export function removerMascara(value: string) {
  return value.replace(/\D/g, '');
}