import axios from "axios";

export function CategoriaActions() {

    return {
        categoriaInsert,
        categoriaUpdate,
        categoriaExcluir
    }

    async function categoriaInsert(data:any){
        try {
            const res = await axios.post("http://localhost:3001/categorias/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function categoriaUpdate(data:any){
        console.log(data)
        try {
            const res = await axios.post("http://localhost:3001/update_categoria/", {data});
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    async function categoriaExcluir(data:any){
        try {
            const res = await axios.delete("http://localhost:3001/excluir_categoria/", {
                data: {id: data}
            })
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }
    
}
