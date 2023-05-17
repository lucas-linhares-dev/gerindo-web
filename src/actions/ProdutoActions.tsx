import axios from "axios";

export function ProdutoActions() {

    return {
        produtoInsert,
        produtoUpdate,
        produtoExcluir
    }

    async function produtoInsert(data:any){
        try {
            const res = await axios.post("http://localhost:3001/produtos/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function produtoUpdate(data:any){
        console.log(data)
        try {
            const res = await axios.post("http://localhost:3001/update_produto/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    async function produtoExcluir(data:any){
        try {
            const res = await axios.delete("http://localhost:3001/excluir_produto/", {
                data: {id: data}
            })
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
    
}
