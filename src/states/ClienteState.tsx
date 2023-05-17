import axios from "axios";
import { atom, selector } from "recoil";


export const clienteSelectorNome = selector({
    key: 'clienteSelectorNome',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let nome = get(clienteSearchAtom)

        if(nome !== null && nome.trim() !== ''){
            const response = await getClientesNome(nome);
            if(response.status === 200){
                return response.data
            }
            else {
                return {clientes: [], length: 0}
            }
        }

        return {clientes: [], length: 0}
    },
});

async function getClientesNome(nome:any) {
    const res = await axios.get("http://localhost:3001/clientes_filter_name", { params: {
        nome
    }});

    return res
};

export const clienteSearchAtom = atom({
    key: 'clienteSearch',
    default: ''
})

export const clienteSelector = selector({
    key: 'clienteSelector',
    get: async ({ get }) => {
        const response = await getClientes();
        return response.data
    },
});

async function getClientes() {
    const res = await axios.get(`http://localhost:3001/clientes/`);
    return res
};

export const clientePageState = atom({
    key: 'clientePageState',
    default: 0
})

export const clienteRowsPerPageState = atom({
    key: 'clienteRowsPerPageState',
    default: 25
})
