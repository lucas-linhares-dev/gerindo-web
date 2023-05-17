import axios from "axios";
import { atom, selector } from "recoil";


export const formaPagamentoSelectorNome = selector({
    key: 'formaPagamentoSelectorNome',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let nome = get(formaPagamentoSearchAtom)

        if(nome !== null && nome.trim() !== ''){
            const response = await getFormasPagamentoNome(nome);
            if(response.status === 200){
                return response.data
            }
            else {
                return {formasPagamento: [], length: 0}
            }
        }

        return {formasPagamento: [], length: 0}
    },
});

async function getFormasPagamentoNome(nome:any) {
    const res = await axios.get("http://localhost:3001/formasPagamento_filter_name", { params: {
        nome
    }});

    return res
};

export const formaPagamentoSearchAtom = atom({
    key: 'formaPagamentoSearchAtom',
    default: ''
})

export const formaPagamentoSelector = selector({
    key: 'formaPagamentoSelector',
    get: async ({ get }) => {
        const response = await getFormasPagamento();
        return response.data
    },
});

async function getFormasPagamento() {
    const res = await axios.get(`http://localhost:3001/fornecedores/`);
    return res
};

export const formaPagamentoPageState = atom({
    key: 'formaPagamentoPageState',
    default: 0
})

export const formaPagamentoRowsPerPageState = atom({
    key: 'formaPagamentoRowsPerPageState',
    default: 25
})