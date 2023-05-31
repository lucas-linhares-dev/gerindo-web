
import { Box, Card, CardContent, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useEffect, useMemo, useState } from "react";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { ProdutoActions } from "../../actions/ProdutoActions";
import { OpenModalConfirm } from "../../components/helpers/OpenModalConfirm";
import { produtoPageState, produtoRowsPerPageState, produtoSearchAtom, produtoSelectorNome } from "../../states/ProdutoState";
import { GetAutoCompleteForm } from "../../components/AutoComplete/GetAutoCompleteForm";
import { fornecedorSelector } from "../../states/FornecedorState";
import { categoriaSelector } from "../../states/CategoriaState";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { InputImage } from "../../components/Input/InputImage";
import { validateEAN13, validateEAN14, validateEAN8 } from "../../components/helpers/validateEAN";

interface ProdutoForm {
    nome: string,
    descricao: string,
    preco_venda: string, // fazer mascara
    preco_custo: string,
    codigo: string
    estoque: number,
    categoria: number, // recoil
    fornecedor: number // recoil
    foto: any
}

export const Produto = () => {

    const produtoActions = ProdutoActions()

    // const [hasError, setHasError] = useState<boolean>(false)

    const [cardPesquisar, setCardPesquisar] = useState<boolean>(false)
    const [reload, setReload] = useState<any>(false)

    const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null)

    const initialValues = useMemo(() => {
        return {
            nome: '',
            descricao: '',
            preco_venda: '0,00', // fazer mascara
            preco_custo: '0,00',
            codigo: '',
            estoque: 0,
            categoria: undefined,
            fornecedor: undefined
        }
    }, [])

    const validationSchema = yup.object().shape({
        nome: yup.string()
            .required("Campo obrigatório")
            .min(3, 'Mínimo 3 letras'),
        preco_venda: yup.string()
            .required("Campo obrigatório"),
        
        codigo: yup.string()
            .max(14, "*Max. 14 caracteres")
            .nullable()
            .test('codigo', 'Código de barras inválido', function (value) {
                if (value === undefined || value === null || value.trim() === '') {
                    return true
                } 
                else if (value.length !== 8 && value.length !== 13 && value.length !== 14) {
                    return false
                } 
                else if(value.length === 8){
                    return validateEAN8(value)
                }
                else if (value.length === 13) {
                    return validateEAN13(value)
                } 
                else if (value.length === 14) {
                    return validateEAN14(value)
                }
    })
})

    const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm<ProdutoForm>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur'
    })


    const onSubmitProduto = async (data: any) => {
        console.log(data)
        if (produtoSelecionado === null) {
            const confirm = await OpenModalConfirm("Cadastrar produto?")
            if (confirm) {
                produtoActions.produtoInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        OpenModal(`Produto cadastrado com sucesso!`, () => { })
                        reset({ ...initialValues })
                        setReload(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else {
            const confirm = await OpenModalConfirm("Alterar produto?")
            if (confirm) {
                console.log(data)
                produtoActions.produtoUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        OpenModal("Produto alterado com sucesso!", () => { })
                        setProdutoSelecionado(res.data)
                        setReload(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
    }

    const excluirProduto = async () => {
        const confirm = await OpenModalConfirm("Excluir produto?")
        if (confirm) {
            const res = await produtoActions.produtoExcluir(produtoSelecionado._id)
            if (res?.status === 200) {
                OpenModal("Produto excluido com sucesso!", () => { })
                setReload(true)
                setProdutoSelecionado(null)
            }
            else {
                console.log("ERROS BACK END")
            }
        }
    }

    useEffect(() => {
        if (produtoSelecionado != null) {
            reset(produtoSelecionado)
            window.scrollTo(0, 1000)
        } else {
            reset({ ...initialValues })
        }
    }, [initialValues, produtoSelecionado, reset])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitProduto)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title="Produtos" />

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


                    <Collapse in={cardPesquisar}>
                        <Grid item sx={{ marginTop: 2 }}>

                            <Grid container
                                direction="row" spacing={1.5}>
                                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3.0 }}>
                                    <SearchTable produtoSelecionado={produtoSelecionado} setProdutoSelecionado={setProdutoSelecionado} atomFilter={produtoSearchAtom} selector={produtoSelectorNome} setCardPesquisa={setCardPesquisar} reload={reload} setReload={setReload} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Collapse>


                    <Grid item>
                        <Grid container direction={'row'}>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <Box sx={{ margin: 2, marginTop: 4, marginBottom: 0 }}>
                                    <CardGeneric title={"Informações gerais"}>
                                        <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                            <Grid item xs={12} md={3} lg={2.3} xl={1.8} sx={{height: '240px'}}>
                                                <InputImage control={control} setValue={setValue} height="230px" width={'100%'} />
                                            </Grid>
                                            <Grid item xs={12} md={9} lg={9.7} xl={10.2} sx={{ marginTop: 1.9, width: '100%'}}>
                                                <Grid container direction={'row'} spacing={1.5}>
                                                    <Grid item xs={12} md={5} lg={3} xl={3}>
                                                        <TxtFieldForm name={"nome"} control={control} label={"Nome"} error={errors.nome?.message} />
                                                    </Grid>
                                                    <Grid item xs={12} md={7} lg={6} xl={6}>
                                                        <TxtFieldForm name={"descricao"} control={control} label={"Descrição"} error={errors.descricao?.message} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} lg={1.5} xl={1.5}>
                                                        <TxtFieldForm name={"preco_venda"} control={control} label={"Preço de venda"} type="decimal" error={errors.preco_venda?.message} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} lg={1.5} xl={1.5}>
                                                        <TxtFieldForm name={"preco_custo"} control={control} label={"Preço de custo"} type="decimal" error={errors.preco_custo?.message} />
                                                    </Grid>
                                                    <Grid item xs={12} md={8} lg={12} xl={12}>
                                                        <TxtFieldForm name={"codigo"} control={control} label={"Codigo EAN"} error={errors.codigo?.message} />
                                                    </Grid>
                                                    <Grid item xs={12} md={5} lg={5} xl={5}>
                                                        <GetAutoCompleteForm label={"Categoria"} name={"categoria"} control={control} selector={categoriaSelector} optionLabel={"nome"} />
                                                    </Grid>
                                                    <Grid item xs={12} md={5} lg={5} xl={5}>
                                                        <GetAutoCompleteForm label={"Fornecedor"} name={"fornecedor"} control={control} selector={fornecedorSelector} optionLabel={"nome"} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} lg={2} xl={2}>
                                                        <TxtFieldForm name={"estoque"} control={control} label={"Estoque"} type="number" error={errors.estoque?.message} />
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                        </Grid>
                                    </CardGeneric>
                                </Box>
                            </Grid>

                        </Grid>


                        <Grid item>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
                                {produtoSelecionado &&
                                    <ButtonGeneric title='excluir' color={'red'} typeIcon="excluir" backgroundColor={'#f5f5f5'} backgroundColorHover={'red'} type="button" onClick={excluirProduto} colorHover="#f5f5f5" />
                                }
                                <ButtonGeneric title={produtoSelecionado ? 'alterar' : 'cadastrar'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div >
    )
}

interface ITableFProdutos {
    produtoSelecionado: any,
    setProdutoSelecionado: any,
    atomFilter: any,
    selector: any,
    setCardPesquisa: any,
    reload: any,
    setReload: any
}


const SearchTable = (props: ITableFProdutos) => {

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
            field: 'nome',
            label: 'Nome',
            enableOrder: true,
            align: "right",
            width: '10%'

        },
        {
            disablePadding: false,
            field: 'fornecedor',
            label: 'Fornecedor',
            enableOrder: true,
            align: "right",
            width: '10%'

        },
        {
            disablePadding: false,
            field: 'categoria',
            label: 'Categoria',
            enableOrder: true,
            align: "right",
            width: '10%'

        },
        {
            disablePadding: false,
            field: 'descricao',
            label: 'Descriçao',
            enableOrder: true,
            align: "left",
            width: '70%'
        },
    ]

    return (
        <TableGeneric reload={props.reload} setReload={props.setReload} tabela="produtos" title='Pesquisar' setItemEdit={props.setProdutoSelecionado} itemEdit={props.produtoSelecionado} atomFilter={props.atomFilter} atomSelectorList={props.selector} atomPage={produtoPageState} columns={columns} atomRowPerPage={produtoRowsPerPageState} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} setCardPesquisa={props.setCardPesquisa} />
    )
}   