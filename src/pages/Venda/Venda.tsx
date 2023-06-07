

import { Box, Card, CardContent, Collapse, Grid, Icon, IconButton, Typography } from "@mui/material";
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ClienteActions } from "../../actions/ClienteActions";
import { clientePageState, clienteRowsPerPageState, clienteSearchAtom, clienteSelector, clienteSelectorNome } from "../../states/ClienteState";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { GetAutoCompleteForm } from "../../components/AutoComplete/GetAutoCompleteForm";
import { getData } from "../../components/helpers/getDataHora";
import { EntradaActions } from "../../actions/EntradaActions";
import { entradaPageState, entradaRowsPerPageState, entradaSearchAtom, entradaSelectorCodigo } from "../../states/EntradaState";
import { formaPagamentoSelector } from "../../states/FormaPagamentoState";
import { ProdutoForm } from "../Entrada/ProdutoForm";
import { vendaFilterAtom, vendaPageState, vendaRowsPerPageState, vendaSearchAtom, vendaSelectorCodigo, vendaSelectorFilter } from "../../states/VendaState";
import { VendaActions } from "../../actions/VendaActions";
import { decimalDigitsMask } from "../../components/helpers/masks";
import { useAlertDialog } from "../../components/Dialogs/DialogProviderAlert";
import { useResolveDialog } from "../../components/Dialogs/DialogProviderResolve";


export interface IVenda {
    codigo: string,
    data: any,
    cliente: any,
    forma_pag: any,
    vlr_total: string,
    descricao: string,
    produtos: any
}

const dataAtual = getData()


export const Venda = () => {

    const vendaActions = VendaActions()

    const [produtos, setProdutos] = useState<any>([])

    const [flagprodutosSalvos, setFlagProdutosSalvos] = useState<any>(false)

    const [vendaSelecionada, setVendaSelecionada] = useState<any>(null)

    const [reload, setReload] = useState<any>(false)

    const [resetProdutos, setResetProdutos] = useState<boolean>(false)


    // const [hasError, setHasError] = useState<boolean>(false)

    const [cardPesquisar, setCardPesquisar] = useState<boolean>(false)

    const showDialogResolve = useResolveDialog()
    const showDialogConfirmed = useAlertDialog()

    const initialValues = useMemo(() => {
        return {
            codigo: '',
            descricao: '',
            data: dataAtual,
            vlr_total: '',
            cliente: undefined,
            forma_pag: undefined,
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

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<IVenda>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })

    const onSubmitVenda = async (data: any) => {
        if (!vendaSelecionada) {
            const confirm = await showDialogResolve({title: '', message: 'Cadastrar venda?'})
            if (confirm) {
                data.produtos = produtos.map((produto: any) => { return { cod_ref: produto.cod_ref, quantidade: produto.quantidade, nome: produto.nome } })

                vendaActions.vendaInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Venda cadastrada com sucesso!", "success")
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
            const confirm = await showDialogResolve({title: '', message: 'Alterar venda?'})
            if (confirm) {
                vendaActions.vendaUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Venda alterada com sucesso!", "success")
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
        if (vendaSelecionada != null) {
            reset(vendaSelecionada)
            window.scrollTo(0, 1000)
        } else {
            reset({ ...initialValues })
        }
    }, [vendaSelecionada, initialValues, reset])


    useEffect(() => {
        let vlrTotalVenda = 0
        produtos.forEach((produto: any) => {
            let preco_venda_format = produto.preco_venda.slice(0, produto.preco_venda.length - 3);
            preco_venda_format = Number(preco_venda_format)
            let vlrTotalProduto = preco_venda_format * produto.quantidade
            vlrTotalVenda += vlrTotalProduto
        });
        console.log(vlrTotalVenda)
        setValue('vlr_total', decimalDigitsMask((vlrTotalVenda * 100).toString(), 2))
    }, [produtos, setValue])


    return (
        <div>
            <Grid container direction={'column'}>

                <TitlePageGeneric title={'Vendas'} />


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
                                <TableVendas reload={reload} setReload={setReload} setCardPesquisa={setCardPesquisar} vendaSelecionada={vendaSelecionada} setVendaSelecionada={setVendaSelecionada} atomFilter={vendaFilterAtom} selector={vendaSelectorFilter} />
                            </Grid>
                        </Grid>

                    </Grid>
                </Collapse>

                <Grid item>

                    <Box sx={{ margin: 2, marginTop: 4 }}>
                        <CardGeneric title="Dados da venda">
                            <form onSubmit={handleSubmit(onSubmitVenda)}>

                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={9} lg={10} xl={3} >
                                        <TxtFieldForm name={"codigo"} control={control} label={"Codigo"} error={errors.codigo?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={2} xl={1.5} >
                                        <TxtFieldForm name={"data"} control={control} label={"Data"} error={errors.data?.message} type={'date'} readOnly={vendaSelecionada} />
                                    </Grid>
                                    <Grid item xs={12} md={5} lg={5} xl={3} >
                                        <GetAutoCompleteForm label={"Cliente"} name={"cliente"} control={control} selector={clienteSelector} optionLabel={"nome"} />
                                    </Grid>
                                    <Grid item xs={12} md={5} lg={5} xl={2.5} >
                                        <GetAutoCompleteForm label={"Forma pag."} name={"forma_pag"} control={control} selector={formaPagamentoSelector} optionLabel={"nome"} />
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2} xl={2} >
                                        <TxtFieldForm name={"vlr_total"} control={control} label={"Vlr. total"} type="decimal" error={errors.vlr_total?.message} readOnly={vendaSelecionada} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12} >
                                        <TxtFieldForm name={"descricao"} control={control} label={"Descricao"} error={errors.descricao?.message} />
                                    </Grid>
                                </Grid>
                            </form>
                        </CardGeneric>
                    </Box>

                    <Grid item>
                        <Box sx={{ margin: 2, marginRight: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                            <ButtonGeneric title={!vendaSelecionada ? 'cadastrar' : 'alterar'} disabledPadrao={!flagprodutosSalvos && !vendaSelecionada} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <ProdutoForm setProdutos={setProdutos} resetProdutos={resetProdutos} flagProdutosSalvos={flagprodutosSalvos} setFlagProdutosSalvos={setFlagProdutosSalvos} entradaSelecionada={vendaSelecionada} operation={"venda"} />
        </div >
    )
}

interface ITableVendas {
    vendaSelecionada: any,
    setVendaSelecionada: any,
    atomFilter: any,
    selector: any,
    setCardPesquisa: any,
    reload: any,
    setReload: any
}


interface ITableVendasForm {
    cliente: any,
    forma_pag: any,
    dt_inicial: string,
    dt_final: string
}

const TableVendas = (props: ITableVendas) => {

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

    const { setValue, control, getValues } = useForm<ITableVendasForm>({
        defaultValues: {
            dt_inicial: dataAtual,
            dt_final: dataAtual
        }
    })

    const onSubmitFiltrar = (data: any) => {
        console.log(data)
        setObjFilters({
            cliente: data.cliente?._id,
            forma_pag: data.forma_pag?._id,
            dt_inicial: data.dt_inicial,
            dt_final: data.dt_final
        })
    }

    return (
        <>
            <form>
                <CardGeneric title="Filtrar">
                    <Grid container direction={'row'} spacing={1.5}>
                        <Grid item xs={12} md={6} lg={4} xl={4} >
                            <GetAutoCompleteForm label={"Cliente"} name={"cliente"} control={control} selector={clienteSelector} optionLabel={"nome"} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} xl={4} >
                            <GetAutoCompleteForm label={"Forma pag."} name={"forma_pag"} control={control} selector={formaPagamentoSelector} optionLabel={"nome"} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2} xl={2} >
                            <TxtFieldForm name={"dt_inicial"} control={control} label={"Data Inicial"} type={'date'}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={2} xl={2} >
                            <TxtFieldForm name={"dt_final"} control={control} label={"Data Final"} type={'date'}/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={12} >
                            <ButtonGeneric title={"Filtrar"} fullWidth typeIcon="filtrar" height="55px" type="button" onClick={() => onSubmitFiltrar(getValues())} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={612} xl={12}>
                            <TableGeneric atomPage={vendaPageState} atomRowPerPage={vendaRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="vendas" title='Pesquisar' setItemEdit={props.setVendaSelecionada} itemEdit={props.vendaSelecionada} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={false} enablePagination={false} height={400} enableCustomSearch={true} objFilters={objFilters} />
                        </Grid>
                    </Grid>

                </CardGeneric>
            </form>
        </>
    )


}

