import axios from "axios";
import { atom, selector } from "recoil";


export const entradaSelectorCodigo = selector({
    key: 'entradaSelectorCodigo',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let codigo = get(entradaSearchAtom)


        const response = await getEntradasCodigo(codigo);
        if(response.status === 200){
            return response.data
        }
        else {
            return {entradas: [], length: 0}
        }
        
    },
});

async function getEntradasCodigo(codigo:any) {
    const res = await axios.get("http://localhost:3001/entradas_filter_codigo", { params: {
        codigo
    }});

    return res
};

export const entradaSearchAtom = atom({
    key: 'entradaSearchAtom',
    default: ''
})

export const entradaSelector = selector({
    key: 'entradaSelector',
    get: async ({ get }) => {
        const response = await getEntradas();
        return response.data
    },
});

async function getEntradas() {
    const res = await axios.get(`http://localhost:3001/entradas/`);
    return res
};

export const entradaPageState = atom({
    key: 'entradaPageState',
    default: 0
})

export const entradaRowsPerPageState = atom({
    key: 'entradaRowsPerPageState',
    default: 25
})


export const entradaSelectorFilter = selector({
    key: 'entradaSelectorFilter',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let objFilters = get(entradaFilterAtom)

        const response = await getEntradasFilter(objFilters);
        if(response.status === 200){
            return response.data
        }
        else {
            return {entradas: [], length: 0}
        }
        
    },
});

async function getEntradasFilter(objFilters:any) {
    console.log(objFilters)
    const res = await axios.get("http://localhost:3001/entradas_filter",  { params: {
        objFilters
    }});;

    return res
};

export const entradaFilterAtom = atom({
    key: 'entradaFilterAtom',
    default: ''
})