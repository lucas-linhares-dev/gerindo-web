import axios from "axios";

export function UsuarioActions() {

    return {
        usuarioInsert,
        usuarioAuth,
        usuarioUpdate
    }

    async function usuarioInsert(data:any){
        try {
            const res = await axios.post("http://localhost:3001/usuarios/", {data});
            return res
        } catch (error) {
            return error
        }
    }

    async function usuarioAuth(data:any){
        try {
            console.log(data)
            const res = await axios.post("http://localhost:3001/auth/usuarios", {data});
            return res
        } catch (error) {
            return error
        }
    }

        async function usuarioUpdate(data:any){
        try {
            const res = await axios.post("http://localhost:3001/update_usuario/", {data})
            return res
        } catch (error) {
            return console.log("DEU RUIM")
        }
    }

    
}
