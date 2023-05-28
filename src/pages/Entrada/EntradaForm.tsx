
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
import { useRecoilState, useRecoilValue } from "recoil";
import { ClienteActions } from "../../actions/ClienteActions";
import { clientePageState, clienteRowsPerPageState, clienteSearchAtom, clienteSelectorNome } from "../../states/ClienteState";
import { ProdutoForm } from "./ProdutoForm";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { GetAutoCompleteForm } from "../../components/AutoComplete/GetAutoCompleteForm";
import { getData } from "../../components/helpers/getDataHora";
import { EntradaActions } from "../../actions/EntradaActions";
import { entradaPageState, entradaRowsPerPageState, entradaSearchAtom, entradaSelectorCodigo } from "../../states/EntradaState";

export interface EntradaForm {
    codigo: string,
    data: any,
    fornecedor: number,
    vlr_total: string,
    descricao: string,
    produtos: any
}

export const Entrada = () => {


    const entradaActions = EntradaActions()

    const [produtos, setProdutos] = useState<any>([])

    const dataAtual = getData()

    const [flagprodutosSalvos, setFlagProdutosSalvos] = useState<any>(false)

    const [entradaSelecionada, setEntradaSelecionada] = useState<any>(null)

    const [reload, setReload] = useState<any>(false)

    const [resetProdutos, setResetProdutos] = useState<boolean>(false)


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
            const confirm = await OpenModalConfirm("Cadastrar entrada?")
            if (confirm) {
                data.produtos = produtos.map((produto: any) => { return { cod_ref: produto.cod_ref, quantidade: produto.quantidade, nome: produto.nome } })

                entradaActions.entradaInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        OpenModal(`Entrada cadastrada com sucesso!`, () => { })
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
            const confirm = await OpenModalConfirm("Alterar entrada?")
            if (confirm) {
                entradaActions.entradaUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        OpenModal(`Entrada alterada com sucesso!`, () => { })
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
        setValue('vlr_total', `${vlrTotalEntrada.toString()},00`)
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
                                    <TableEntradas reload={reload} setReload={setReload} setCardPesquisa={setCardPesquisar} entradaSelecionada={entradaSelecionada} setEntradaSelecionada={setEntradaSelecionada} atomFilter={entradaSearchAtom} selector={entradaSelectorCodigo} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Collapse>

                    <Grid item>

                        <Box sx={{ margin: 2, marginTop: 4 }}>
                            <CardGeneric title="Dados da entrada">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={10} lg={4} xl={4} >
                                        <TxtFieldForm name={"codigo"} control={control} label={"Codigo"} error={errors.codigo?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2} xl={2} >
                                        <TxtFieldForm name={"data"} control={control} label={"Data"} error={errors.data?.message} type={'date'} readOnly={entradaSelecionada} />
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={4} xl={4} >
                                        <GetAutoCompleteForm label={"Fornecedor"} name={"fornecedor"} control={control} selector={fornecedorSelector} optionLabel={"nome"} />
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2} xl={2} >
                                        <TxtFieldForm name={"vlr_total"} control={control} label={"Vlr. total"} error={errors.vlr_total?.message} readOnly={entradaSelecionada} />
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

const TableEntradas = (props: ITableEntradas) => {


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

    return (
        <TableGeneric atomPage={entradaPageState} atomRowPerPage={entradaRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="entradas" title='Pesquisar' setItemEdit={props.setEntradaSelecionada} itemEdit={props.entradaSelecionada} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} />
    )
}

