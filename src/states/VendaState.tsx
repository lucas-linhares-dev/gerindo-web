import axios from "axios";
import { atom, selector } from "recoil";


export const vendaSelectorCodigo = selector({
    key: 'vendaSelectorCodigo',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let codigo = get(vendaSearchAtom)


        const response = await getVendasCodigo(codigo);
        if(response.status === 200){
            return response.data
        }
        else {
            return {vendas: [], length: 0}
        }
        
    },
});

async function getVendasCodigo(codigo:any) {
    const res = await axios.get("http://localhost:3001/vendas_filter_codigo", { params: {
        codigo
    }});

    return res
};

export const vendaSearchAtom = atom({
    key: 'vendaSearchAtom',
    default: ''
})

export const vendaSelectorFilter = selector({
    key: 'vendaSelectorFilter',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let objFilters = get(vendaFilterAtom)

        const response = await getVendasFilter(objFilters);
        if(response.status === 200){
            return response.data
        }
        else {
            return {vendas: [], length: 0}
        }
        
    },
});

async function getVendasFilter(objFilters:any) {
    console.log(objFilters)
    const res = await axios.get("http://localhost:3001/vendas_filter",  { params: {
        objFilters
    }});;

    return res
};

export const vendaFilterAtom = atom({
    key: 'vendaFilterAtom',
    default: ''
})



export const vendaSelector = selector({
    key: 'vendaSelector',
    get: async ({ get }) => {
        const response = await getVendas();
        return response.data
    },
});

async function getVendas() {
    const res = await axios.get(`http://localhost:3001/vendas/`);
    return res
};

export const vendaPageState = atom({
    key: 'vendaPageState',
    default: 0
})

export const vendaRowsPerPageState = atom({
    key: 'vendaRowsPerPageState',
    default: 25
})


