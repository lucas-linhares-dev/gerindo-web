import axios from "axios";
import { atom, selector } from "recoil";


export const categoriaSelectorNome = selector({
    key: 'categoriaSelectorNome',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let nome = get(categoriaSearchAtom)

        if(nome !== null && nome.trim() !== ''){
            const response = await getCategoriasNome(nome);
            if(response.status === 200){
                return response.data
            }
            else {
                return {categorias: [], length: 0}
            }
        }

        return {categorias: [], length: 0}
    },
});

async function getCategoriasNome(nome:any) {
    const res = await axios.get("http://localhost:3001/categorias_filter_name", { params: {
        nome
    }});

    return res
};

export const categoriaSearchAtom = atom({
    key: 'categoriaSearchAtom',
    default: ''
})

export const categoriaSelector = selector({
    key: 'categoriaSelector',
    get: async ({ get }) => {
        const response = await getCategorias();
        return response.data
    },
});

async function getCategorias() {
    const res = await axios.get(`http://localhost:3001/categorias/`);
    return res
};

export const categoriaPageState = atom({
    key: 'categoriaPageState',
    default: 0
})

export const categoriaRowsPerPageState = atom({
    key: 'categoriaRowsPerPageState',
    default: 25
})