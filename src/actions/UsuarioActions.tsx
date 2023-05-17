import axios from "axios";

export function UsuarioActions() {

    return {
        usuarioInsert,
        usuarioAuth
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

    
}
