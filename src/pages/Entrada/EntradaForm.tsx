
import { Box, Collapse, Grid, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useEffect, useMemo, useState } from "react";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { ProdutoForm } from "./ProdutoForm";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { GetAutoCompleteForm } from "../../components/AutoComplete/GetAutoCompleteForm";
import { getData } from "../../components/helpers/getDataHora";
import { EntradaActions } from "../../actions/EntradaActions";
import { entradaFilterAtom, entradaPageState, entradaRowsPerPageState, entradaSelectorFilter } from "../../states/EntradaState";
import { decimalDigitsMask } from "../../components/helpers/masks";
import { useAlertDialog } from "../../components/Dialogs/DialogProviderAlert";
import { useResolveDialog } from "../../components/Dialogs/DialogProviderResolve";
import { fornecedorSelector } from "../../states/FornecedorState";

export interface EntradaForm {
    codigo: string,
    data: any,
    fornecedor: number,
    vlr_total: string,
    descricao: string,
    produtos: any
}

const dataAtual = getData()

export const Entrada = () => {


    const entradaActions = EntradaActions()

    const [produtos, setProdutos] = useState<any>([])
    const [flagprodutosSalvos, setFlagProdutosSalvos] = useState<any>(false)
    const [entradaSelecionada, setEntradaSelecionada] = useState<any>(null)
    const [reload, setReload] = useState<any>(false)
    const [resetProdutos, setResetProdutos] = useState<boolean>(false)

    const showDialogResolve = useResolveDialog()
    const showDialogConfirmed = useAlertDialog()

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
            .required("Campo obrigatório"),
        codigo: yup.string()
            .required('Campo obrigatório'),
    })

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<EntradaForm>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmitEntrada = async (data: any) => {
        if (!entradaSelecionada) {
            const confirm = await showDialogResolve({title: '', message: 'Cadastrar entrada?'})
            if (confirm) {
                data.produtos = produtos.map((produto: any) => { return { cod_ref: produto.cod_ref, quantidade: produto.quantidade, nome: produto.nome } })

                entradaActions.entradaInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Entrada cadastrada com sucesso!", "success")
                        reset({ ...initialValues })
                        setResetProdutos(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else {
            const confirm = await showDialogResolve({title: '', message: 'Alterar entrada?'})
            if (confirm) {
                entradaActions.entradaUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Entrada alterada com sucesso!", "success")
                        setReload((prev: any) => !prev)

                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }

    }


    useEffect(() => {
        if (entradaSelecionada != null) {
            reset(entradaSelecionada)
            window.scrollTo(0, 1000)
        } else {
            reset({ ...initialValues })
        }
    }, [entradaSelecionada, initialValues, reset])


    useEffect(() => {
        let vlrTotalEntrada = 0
        produtos.forEach((produto: any) => {
            let preco_custo_format = produto.preco_custo.slice(0, produto.preco_custo.length - 3);
            preco_custo_format = Number(preco_custo_format)
            let vlrTotalProduto = preco_custo_format * produto.quantidade
            vlrTotalEntrada += vlrTotalProduto
        });
        setValue('vlr_total', decimalDigitsMask((vlrTotalEntrada*100).toString(), 2))
    }, [produtos, setValue])


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitEntrada)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title={'Entradas'} />


                    {/* {hasError &&
                     <Grid item sx={{ marginBottom: 4 }}>
                        <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                    </Grid>
                    } */}

                    <Collapse in={!cardPesquisar}>
                        <Box sx={{ marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center' }}>
                            <ButtonGeneric buttonPesquisar title='Pesquisar' typeIcon="pesquisar" type="button" onClick={() => { setCardPesquisar(true) }} />
                        </Box>
                    </Collapse>

                    <Collapse in={cardPesquisar} unmountOnExit timeout={'auto'}>
                        <Grid item>

                            <Grid container
                                direction="row" spacing={1.5}>
                                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3.0 }}>
                                    <TableEntradas reload={reload} setReload={setReload} setCardPesquisa={setCardPesquisar} entradaSelecionada={entradaSelecionada} setEntradaSelecionada={setEntradaSelecionada} atomFilter={entradaFilterAtom} selector={entradaSelectorFilter} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Collapse>

                    <Grid item>

                        <Box sx={{ margin: 2, marginTop: 4 }}>
                            <CardGeneric title="Dados da entrada">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={9} lg={4} xl={4} >
                                        <TxtFieldForm name={"codigo"} control={control} label={"Codigo"} error={errors.codigo?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={2} xl={2} >
                                        <TxtFieldForm name={"data"} control={control} label={"Data"} error={errors.data?.message} type={'date'} readOnly={entradaSelecionada} />
                                    </Grid>
                                    <Grid item xs={12} md={9} lg={4} xl={4} >
                                        <GetAutoCompleteForm label={"Fornecedor"} name={"fornecedor"} control={control} selector={fornecedorSelector} optionLabel={"nome"} />
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={2} xl={2} >
                                        <TxtFieldForm name={"vlr_total"} control={control} label={"Vlr. total"} type="decimal" error={errors.vlr_total?.message} readOnly={entradaSelecionada} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12} >
                                        <TxtFieldForm name={"descricao"} control={control} label={"Descricao"} error={errors.descricao?.message} />
                                    </Grid>
                                </Grid>
                            </CardGeneric>
                        </Box>

                        <Grid item>
                            <Box sx={{ margin: 2, marginRight: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                                <ButtonGeneric title={!entradaSelecionada ? 'cadastrar' : 'alterar'} disabledPadrao={!flagprodutosSalvos && !entradaSelecionada} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <ProdutoForm setProdutos={setProdutos} resetProdutos={resetProdutos} flagProdutosSalvos={flagprodutosSalvos} setFlagProdutosSalvos={setFlagProdutosSalvos} entradaSelecionada={entradaSelecionada} operation={"entrada"} />
        </div >
    )
}

interface ITableEntradas {
    entradaSelecionada: any,
    setEntradaSelecionada: any,
    atomFilter: any,
    selector: any,
    setCardPesquisa: any,
    reload: any,
    setReload: any
}

interface ITableEntradasForm {
    fornecedor: any,
    dt_inicial: string,
    dt_final: string
}

const TableEntradas = (props: ITableEntradas) => {

    const [objFilters, setObjFilters] = useState<any>({})

    const columns = [
        {
            disablePadding: false,
            field: 'editar',
            label: 'Editar',
            enableOrder: true,
            align: 'center',
            width: '10%',
            itemSelected: <IconButton sx={{ color: "#f5f5f5", outline: 'none !important;;' }}><CheckBoxIcon /></IconButton>,
            itemNoSelected: <IconButton sx={{ color: "#f5f5f5", outline: 'none !important;;', }}><CheckBoxOutlineBlankIcon /></IconButton>,
            checkField: true
        },
        {
            disablePadding: false,
            field: 'codigo',
            label: 'Codigo',
            enableOrder: true,
            align: "right",
            width: '22.5%'

        },
        {
            disablePadding: false,
            field: 'data',
            label: 'Data',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
        {
            disablePadding: false,
            field: 'descricao',
            label: 'Descricao',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
        {
            disablePadding: false,
            field: 'vlr_total',
            label: 'Valor total',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
    ]

    const { setValue, control, getValues } = useForm<ITableEntradasForm>()

    const onSubmitFiltrar = (data: any) => {
        console.log(data)
        setObjFilters({
            fornecedor: data.fornecedor?._id,
            dt_inicial: data.dt_inicial,
            dt_final: data.dt_final
        })
    }

    return (
        <>
            <form>
                <CardGeneric title="Filtrar">
                    <Grid container direction={'row'} spacing={1.5}>
                        <Grid item xs={12} md={6} lg={6} xl={8} >
                            <GetAutoCompleteForm label={"Fornecedor"} name={"fornecedor"} control={control} selector={fornecedorSelector} optionLabel={"nome"} />
                        </Grid>
                        <Grid item xs={6} md={3} lg={3} xl={2} >
                            <TxtFieldForm name={"dt_inicial"} control={control} label={"Data Inicial"} type={'date'}/>
                        </Grid>
                        <Grid item xs={6} md={3} lg={3} xl={2} >
                            <TxtFieldForm name={"dt_final"} control={control} label={"Data Final"} type={'date'}/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={12} >
                            <ButtonGeneric title={"Filtrar"} fullWidth typeIcon="filtrar" height="55px" type="button" onClick={() => onSubmitFiltrar(getValues())} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={612} xl={12}>
                            {/* <TableGeneric atomPage={vendaPageState} atomRowPerPage={vendaRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="vendas" title='Pesquisar' setItemEdit={props.setVendaSelecionada} itemEdit={props.vendaSelecionada} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={false} enablePagination={false} height={400} enableCustomSearch={true} objFilters={objFilters} /> */}
                            <TableGeneric atomPage={entradaPageState} atomRowPerPage={entradaRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="entradas" title='Pesquisar' setItemEdit={props.setEntradaSelecionada} itemEdit={props.entradaSelecionada} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={false} enableCustomSearch={true} enablePagination={false} height={400} objFilters={objFilters} />
                        </Grid>
                    </Grid>

                </CardGeneric>
            </form>
        </>

    )
}

