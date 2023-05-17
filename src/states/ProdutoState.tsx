import axios from "axios";
import { atom, selector } from "recoil";


export const produtoSelectorNome = selector({
    key: 'produtoSelectorNome',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let nome = get(produtoSearchAtom)

        if(nome !== null && nome.trim() !== ''){
            const response = await getProdutosNome(nome);
            if(response.status === 200){
                return response.data
            }
            else {
                return {produtos: [], length: 0}
            }
        }

        return {produtos: [], length: 0}
    },
});

async function getProdutosNome(nome:any) {
    const res = await axios.get("http://localhost:3001/produtos_filter_name", { params: {
        nome
    }});

    return res
};

export const produtoSearchAtom = atom({
    key: 'produtoSearchAtom',
    default: ''
})

export const produtoSelector = selector({
    key: 'produtoSelector',
    get: async ({ get }) => {
        const response = await getProdutos();
        return response.data
    },
});

async function getProdutos() {
    const res = await axios.get(`http://localhost:3001/produtos/`);
    return res
};

export const produtoPageState = atom({
    key: 'produtoPageState',
    default: 0
})

export const produtoRowsPerPageState = atom({
    key: 'produtoRowsPerPageState',
    default: 25
})


