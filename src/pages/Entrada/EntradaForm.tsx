
import { Box, Card, CardContent, Grid, Icon, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useEffect, useMemo, useState } from "react";
import { CategoriaActions } from "../../actions/CategoriaActions";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { ProdutoActions } from "../../actions/ProdutoActions";
import { OpenModalConfirm } from "../../components/helpers/OpenModalConfirm";
import { FornecedorActions } from "../../actions/FornecedorActions";
import { fornecedorPageState, fornecedorRowsPerPageState, fornecedorSearchAtom, fornecedorSelector, fornecedorSelectorNome } from "../../states/FornecedorState";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClienteActions } from "../../actions/ClienteActions";
import { clientePageState, clienteRowsPerPageState, clienteSearchAtom, clienteSelectorNome } from "../../states/ClienteState";
import { ProdutoForm } from "./ProdutoForm";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { GetAutoCompleteForm } from "../../components/AutoComplete/GetAutoCompleteForm";
import { getData } from "../../components/helpers/getDataHora";

export interface EntradaForm {
    codigo: string,
    data: any,
    fornecedor: number,
    vlr_total: string,
    descricao: string,
    produtos: any
}

export const Entrada = () => {


    // const entradaActions = entradaActions() 

    const [produtos, setProdutos] = useState<any>([])

    const dataAtual = getData()

    const [entradaSelecionada, setEntradaSelecionado] = useState<any>(null)

    const [reload, setReload] = useState<any>(false)


    // const [hasError, setHasError] = useState<boolean>(false)

    const [cardPesquisar, setCardPesquisar] = useState<boolean>(false)


    const initialValues = useMemo(() => {
        return {
            codigo: '',
            descricao: '',
            data: dataAtual,
            vlr_total: '',
            fornecedor: undefined,
            produtos: undefined
        }
    }, [dataAtual])

    const validationSchema = yup.object().shape({
        data: yup.string()
            .required('Campo obrigatório'),
        vlr_total: yup.string()
            .required("Campo obrigatório") 
    })

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<EntradaForm>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmitEntrada = async (data: any) => {
        console.log(data)
        console.log(produtos)
        //     const confirm = await OpenModalConfirm("Cadastrar entrada?")
        //     if(confirm){
        //         entradaActions.entradaInsert(data).then((res: any) => {
        //             if (res.status === 200) {
        //                 OpenModal(`Entrada cadastrada com sucesso!`, () => { })
        //                 reset({...initialValues})
        //             }
        //             else {
        //                 console.log("ERROS BACK END")
        //             } 
        //         })
        //     }
    }


    useEffect(() => {
        if (entradaSelecionada != null) {
            reset(entradaSelecionada)
        } else {
            reset({ ...initialValues })
        }
    }, [entradaSelecionada, initialValues, reset])


    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit(onSubmitEntrada)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title={'Entradas'}/>


                    {/* {hasError &&
                     <Grid item sx={{ marginBottom: 4 }}>
                        <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                    </Grid>
                    } */}

                    {/* <Box sx={{ margin: 2.5 }}>
                        <Grid container direction={'row'} sx={{  }} >
                            <Grid item xs={12} md={12} lg={4} xl={5}>
                            </Grid>

                            {!cardPesquisar && <Grid item xs={12} md={12} lg={4} xl={2}>
                                <ButtonGeneric fullWidth title='pesquisar' typeIcon="pesquisar" backgroundColor={'#dbdbdb'} color={'black'} backgroundColorHover={'#ffffff'} onClick={() => { setCardPesquisar(true) }} />
                            </Grid>}

                            <Grid item xs={12} md={12} lg={4} xl={5}>
                            </Grid>
                        </Grid>
                    </Box> */}

                    {/* {cardPesquisar &&
                    <Grid item>

                        <Grid container
                            direction="row" spacing={1.5}>
                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3.0 }}>
                                <TableFornecedores reload={reload} setReload={setReload} setCardPesquisa={setCardPesquisar} clienteSelecionado={clienteSelecionado} setClienteSelecionado={setClienteSelecionado} atomFilter={clienteSearchAtom} selector={clienteSelectorNome} />
                            </Grid>
                        </Grid>

                    </Grid>} */}

                    <Grid item>

                        <Box sx={{margin: 2, marginTop: 4}}>
                            <CardGeneric title="Dados da entrada">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item  xs={12} md={12} lg={4} xl={4} >
                                        <TxtFieldForm name={"codigo"} control={control} label={"Codigo"} error={errors.codigo?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={2} xl={2} >
                                        <TxtFieldForm name={"data"} control={control} label={"Data"} error={errors.data?.message} type={'date'} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={4} xl={4} >
                                        <GetAutoCompleteForm label={"Fornecedor"} name={"fornecedor"} control={control} selector={fornecedorSelector} optionLabel={"nome"} />                                    
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={2} xl={2} >
                                        <TxtFieldForm name={"vlr_total"} control={control} label={"Vlr. total"} error={errors.vlr_total?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12} >
                                        <TxtFieldForm name={"descricao"} control={control} label={"Descricao"} error={errors.descricao?.message} />
                                    </Grid>
                                </Grid>
                            </CardGeneric>
                        </Box>

                        <Grid item>
                            <Box sx={{margin: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <ButtonGeneric title={'cadastrar'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <ProdutoForm setProdutos={setProdutos} />
        </div >
    )
}

// interface ITableFornecedores {
//     clienteSelecionado: any,
//     setClienteSelecionado: any,
//     atomFilter: any,
//     selector: any,
//     setCardPesquisa: any,
//     reload: any,
//     setReload: any
// }

// const TableFornecedores = (props: ITableFornecedores) => {


//     const columns = [
//         {
//             disablePadding: false,
//             field: 'editar',
//             label: 'Editar',
//             enableOrder: true,
//             align: 'center',
//             width: '10%',
//             itemSelected: <IconButton sx={{ color: "#2B7C41", outline: 'none !important;;' }}><CheckBoxIcon /></IconButton>,
//             itemNoSelected: <IconButton sx={{ color: "#2B7C41", outline: 'none !important;;', }}><CheckBoxOutlineBlankIcon /></IconButton>,
//             checkField: true
//         },
//         {
//             disablePadding: false,
//             field: 'nome',
//             label: 'Nome',
//             enableOrder: true,
//             align: "right",
//             width: '22.5%'

//         },
//         {
//             disablePadding: false,
//             field: 'email',
//             label: 'E-mail',
//             enableOrder: true,
//             align: "left",
//             width: '22.5%'
//         },
//         {
//             disablePadding: false,
//             field: 'telefone',
//             label: 'Telefone',
//             enableOrder: true,
//             align: "left",
//             width: '22.5%'
//         },
//         {
//             disablePadding: false,
//             field: 'cpf',
//             label: 'cpf',
//             enableOrder: true,
//             align: "left",
//             width: '22.5%'
//         },
//     ]

//     return (
//         <TableGeneric atomPage={clientePageState} atomRowPerPage={clienteRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="clientes" title='Pesquisar' setItemEdit={props.setClienteSelecionado} itemEdit={props.clienteSelecionado} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} />
//     )
// }   

