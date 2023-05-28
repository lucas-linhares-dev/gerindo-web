import axios from "axios";

export function VendaActions() {

    return {
        vendaInsert,
        vendaUpdate,
    }

    async function vendaInsert(data:any){
        console.log("Ä")
        console.log(data)
        try {
            const res = await axios.post("http://localhost:3001/vendas/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function vendaUpdate(data:any){
        try {
            const res = await axios.post("http://localhost:3001/update_venda/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
    
}
