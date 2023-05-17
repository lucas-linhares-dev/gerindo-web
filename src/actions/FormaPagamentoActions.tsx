import axios from "axios";

export function FormaPagamentoActions() {

    return {
        formaPagamentoInsert,
        formaPagamentoUpdate,
        formaPagamentoExcluir
    }

    async function formaPagamentoInsert(data:any){
        try {
            const res = await axios.post("http://localhost:3001/insert_formaPagamento/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function formaPagamentoUpdate(data:any){
        console.log(data)
        try {
            const res = await axios.post("http://localhost:3001/update_formaPagamento/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    async function formaPagamentoExcluir(data:any){
        try {
            const res = await axios.delete("http://localhost:3001/excluir_formaPagamento/", {
                data: {id: data}
            })
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
    
}
