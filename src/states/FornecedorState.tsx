import axios from "axios";
import { atom, selector } from "recoil";


export const fornecedorSelectorNome = selector({
    key: 'fornecedorSelectorNome',
    get: async ({ get }) => {

        // let page = get(credorPageState)
        // let rowsPerPage = get(credorRowsPerPageState)

        let nome = get(fornecedorSearchAtom)

        if(nome !== null && nome.trim() !== ''){
            const response = await getFornecedoresNome(nome);
            if(response.status === 200){
                return response.data
            }
            else {
                return {fornecedores: [], length: 0}
            }
        }

        return {fornecedores: [], length: 0}
    },
});

async function getFornecedoresNome(nome:any) {
    const res = await axios.get("http://localhost:3001/fornecedores_filter_name", { params: {
        nome
    }});

    return res
};

export const fornecedorSearchAtom = atom({
    key: 'fornecedorSearch',
    default: ''
})

export const fornecedorSelector = selector({
    key: 'fornecedorSelector',
    get: async ({ get }) => {
        const response = await getFornecedores();
        return response.data
    },
});

async function getFornecedores() {
    const res = await axios.get(`http://localhost:3001/fornecedores/`);
    return res
};

export const fornecedorPageState = atom({
    key: 'fornecedorPageState',
    default: 0
})

export const fornecedorRowsPerPageState = atom({
    key: 'fornecedorRowsPerPageState',
    default: 25
})



// async function getFornecedoresId(id:any) {
//     const res = await axios.get("http://localhost:3001/fornecedores/id", { params: {
//         id
//     }});
//     return res
// };



// export const fornecedorSelectorId = selector({
//     key: 'fornecedorSelectorId',
//     get: async ({ get }) => {

//         // let page = get(credorPageState)
//         // let rowsPerPage = get(credorRowsPerPageState)

//         let id = get(fornecedorSearchAtom)

//         const response = await getFornecedoresId(id);

//         if(response.status === 200){
//             console.log(response.data)
//             return response.data
//         }
//         else {
//             return []
//         }
//     },
// });

