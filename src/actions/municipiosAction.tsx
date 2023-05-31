import axios from "axios";

export function useMunicipiosActions() {

    return {
        load_endereco,
        load_lojas
    }

    async function load_lojas() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/lojas/lojas?fields=id,fantasia,razaosocial,cnpj`, config);
            return res.data

        } catch (err) {
            return 
        }
    }

    async function load_endereco(cep: string) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get('https://viacep.com.br/ws/' + cep + '/json/', config);
            return { logradouro: res.data.logradouro, bairro: res.data.bairro }

        } catch (err) {
            return { logradouro: "", bairro: "" }
        }
    
    }

}