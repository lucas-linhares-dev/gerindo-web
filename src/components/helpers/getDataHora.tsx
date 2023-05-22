const data = new Date()

export function getData() {
    return data.getFullYear() + '-' + (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)) + '-' + (data.getDate() + 1 < 11 ? "0" + (data.getDate()) : (data.getDate()))
}

export function getHora() {
    return (data.getHours() < 10 ? '0' : '') + data.getHours() + (data.getMinutes() < 10 ? ':0' : ':') + data.getMinutes()  
}

export function tratarDate(date:Date,separador:string, inverso:boolean){
    var dia = ''
    var mes = ''
    var ano = date.getFullYear().toString()

    if(date.getDate() < 10 ){
        dia = '0' + date.getDate().toString()
    }else{
        dia = date.getDate().toString()
    }

    if(date.getMonth() < 10){
        mes = '0' + date.getMonth().toString()
    }else{
        mes = date.getMonth().toString()
    }

    if (inverso === false){
        return dia + separador + mes + separador + ano
    }else{
        return ano + separador + mes + separador + dia
    }
    
}