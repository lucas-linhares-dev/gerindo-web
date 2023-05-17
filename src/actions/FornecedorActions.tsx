import axios from "axios";

export function FornecedorActions() {

    return {
        fornecedorInsert,
        fornecedorUpdate,
        fornecedorExcluir
    }

    async function fornecedorInsert(data:any){
        try {
            const res = await axios.post("http://localhost:3001/fornecedores/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function fornecedorUpdate(data:any){
        console.log(data)
        try {
            const res = await axios.post("http://localhost:3001/update_fornecedor/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    async function fornecedorExcluir(data:any){
        try {
            const res = await axios.delete("http://localhost:3001/excluir_fornecedor/", {
                data: {id: data}
            })
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
}