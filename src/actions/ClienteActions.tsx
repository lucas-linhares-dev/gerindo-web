import axios from "axios";

export function ClienteActions() {

    return {
        clienteInsert,
        clienteUpdate,
        clienteExcluir
    }

    async function clienteInsert(data:any){
        console.log(data)
        // try {
            const res = await axios.post("http://localhost:3001/insert_cliente/", {data});
            return res
        // } catch (error) {
        //     return error
        // }
    }

    async function clienteUpdate(data:any){
        console.log(data)
        try {
            const res = await axios.post("http://localhost:3001/update_cliente/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    async function clienteExcluir(data:any){
        try {
            const res = await axios.delete("http://localhost:3001/excluir_cliente/", {
                data: {id: data}
            })
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
}