import axios from "axios";

export function EntradaActions() {

    return {
        entradaInsert,
        entradaUpdate,
        entradaExcluir
    }

    async function entradaInsert(data:any){
        try {
            const res = await axios.post("http://localhost:3001/entradas/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function entradaUpdate(data:any){
        try {
            const res = await axios.post("http://localhost:3001/update_entrada/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    async function entradaExcluir(data:any){
        try {
            const res = await axios.delete("http://localhost:3001/excluir_entrada/", {
                data: {id: data}
            })
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
    
}
