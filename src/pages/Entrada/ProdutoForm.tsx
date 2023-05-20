
import { Box, Button, Card, CardContent, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { OpenModal } from "../../components/helpers/OpenModal";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useEffect, useMemo, useRef, useState } from "react";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { ProdutoActions } from "../../actions/ProdutoActions";
import { OpenModalConfirm } from "../../components/helpers/OpenModalConfirm";
import { produtoPageState, produtoRowsPerPageState, produtoSearchAtom, produtoSelectorNome } from "../../states/ProdutoState";
import { GetAutoCompleteForm } from "../../components/AutoComplete/GetAutoCompleteForm";
import { fornecedorSelector } from "../../states/FornecedorState";
import { categoriaSelector } from "../../states/CategoriaState";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import { executeScroll } from "../../components/helpers/ExecuteScroll";
import { CardGeneric } from "../../components/Card/CardGeneric";


interface ProdutoForm {
    nome: string,
    preco_venda: string, // fazer mascara
    preco_custo: string,
    codigo: string
    estoque: number,
    categoria: number, // recoil
    quantidade: number
}

// interface ProdutoFormProps {

// }

export const ProdutoForm = (props: any) => {

    const produtoActions = ProdutoActions()

    const cardProdutosRef = useRef<any>(null);

    // const [hasError, setHasError] = useState<boolean>(false)

    const [reload, setReload] = useState<any>(false)

    const [cardProdutos, setCardProdutos] = useState<boolean>(false)
    const [produtos, setProdutos] = useState<any>([])
    const [remove, setRemove] = useState<any>(false)

    const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null)

    const initialValues = useMemo(() => {
        return {
            nome: '',
            preco_venda: '', // fazer mascara
            preco_custo: '',
            codigo: '',
            estoque: 0,
            categoria: undefined,
        }
    }, []) 


    const { getValues, formState: { errors }, control, reset } = useForm<ProdutoForm>({
    })


    const insertProduto = () => {
        if (produtoSelecionado !== null) {
            setProdutos((prev: any) => {
                return [
                    ...prev,
                    getValues()
                ]
            })
        } else console.log("Nao enviou")
    }

    useEffect(() => {
        if (produtoSelecionado != null) {
            reset(produtoSelecionado)
            window.scrollTo(0, 1000)
        } else {
            reset({ ...initialValues })
        }
    }, [initialValues, produtoSelecionado, reset])


    const newProdutos = produtos

    const removerProduto = (i: any) => {
        newProdutos.splice(i, 1)
        setRemove((prev: any) => !prev)
    }

    useEffect(() => {
        if(remove){
            setProdutos(newProdutos)
        }
    }, [newProdutos, remove])


    return (
        <Box sx={{margin: 4, marginTop: 10}}>
            <CardGeneric title="Produtos">

                    <Collapse in={produtos.length !== 0}>
                        <Card sx={{ backgroundColor: 'black', width: '300px' }}>
                            <CardContent>
                                {produtos.map((produto: any, i: any) => {
                                    return (
                                        <>
                                            <Grid container direction={'row'} sx={{ marginBottom: '5px' }}>
                                                <Grid item xs={12} md={12} lg={12} xl={1.5} sx={{ marginRight: 1 }}>
                                                    <Box sx={{ display: 'inline-block' }}>
                                                        <IconButton onClick={() => removerProduto(i)}><RemoveCircleOutlineIcon sx={{ color: 'red', fontSize: '20px' }} /></IconButton>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={12} lg={12} xl={8.5}>

                                                    <Box sx={{ display: 'inline-block', marginTop: '1px' }}>
                                                        <Typography sx={{ color: 'white' }} variant="h5">{produto.nome}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={12} lg={12} xl={1}>

                                                    <Box sx={{ display: 'inline-block', marginTop: '2px' }}>
                                                        <Typography sx={{ color: 'yellow' }} variant="h6">{produto.quantidade}</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </Collapse>
                    

                    <Collapse in={!cardProdutos}>
                        <Box sx={{ margin: 2.5 }}>
                            <Grid container direction={'row'} sx={{}} >
                                <Grid item xs={12} md={12} lg={4} xl={5}>
                                </Grid>

                                <Grid item xs={12} md={12} lg={4} xl={2}>
                                    <ButtonGeneric fullWidth title='Adicionar produtos' typeIcon="pesquisar" onClick={() => { setCardProdutos(true) }} />
                                </Grid>

                                <Grid item xs={12} md={12} lg={4} xl={5}>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse> 
                    

                    <Collapse in={cardProdutos}>
                        <Grid item ref={cardProdutosRef}>
                            <form>
                                <Grid container direction={'column'}>

                                    <Grid item>

                                        <Grid container
                                            direction="row" spacing={1.5} >
                                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3.0 }}>
                                                <SearchTable produtoSelecionado={produtoSelecionado} setProdutoSelecionado={setProdutoSelecionado} atomFilter={produtoSearchAtom} selector={produtoSelectorNome} setCardPesquisa={setCardProdutos} reload={reload} setReload={setReload} />
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <Grid item>
                                                <Grid container direction={'row'} spacing={1.5} sx={{padding: 10,paddingTop: 5, paddingBottom: 0 }}>
                                                    <Grid item xs={12} md={12} lg={3} xl={3}>
                                                        <TxtFieldForm name={"nome"} control={control} label={"Nome"} error={errors.nome?.message} readOnly />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={12} lg={6} xl={6}>
                                        <TxtFieldForm name={"descricao"} control={control} label={"Descrição"} error={errors.descricao?.message}  />
                                    </Grid> */}
                                                    <Grid item xs={12} md={12} lg={1.5} xl={1}>
                                                        <TxtFieldForm name={"preco_venda"} control={control} label={"Preço de venda"} error={errors.preco_venda?.message} readOnly />
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={1.5} xl={1}>
                                                        <TxtFieldForm name={"preco_custo"} control={control} label={"Preço de custo"} error={errors.preco_custo?.message} readOnly />
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={3} xl={3}>
                                                        <TxtFieldForm name={"codigo"} control={control} label={"Codigo de barras"} error={errors.codigo?.message} readOnly />
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={4} xl={3}>
                                                        <GetAutoCompleteForm label={"Categoria"} name={"categoria"} control={control} selector={categoriaSelector} optionLabel={"nome"} readonly />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={12} lg={4} xl={4}>
                                        <GetAutoCompleteForm label={"Fornecedor"} name={"fornecedor"} control={control} selector={fornecedorSelector} optionLabel={"nome"} readOnly />
                                    </Grid> */}
                                                    <Grid item xs={12} md={12} lg={1} xl={1}>
                                                        <TxtFieldForm name={"estoque"} control={control} label={"Estoque Inic."} error={errors.estoque?.message} readOnly />
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={1} xl={4.6} >
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={1} xl={1} marginTop={5}>
                                                        <TxtFieldForm name={"quantidade"} control={control} label={"Quantidade"} error={errors.quantidade?.message} borderWidth={2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={1} xl={2} marginTop={5}>
                                                    <Box sx={{}}>
                                                        <ButtonGeneric title={'INSERIR PRODUTO'} type="button" height="55px" onClick={insertProduto} />
                                                    </Box>
                                                    </Grid>
                                                </Grid> 
                                        <Grid item>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Collapse>

                </CardGeneric>
        </Box>
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
            field: 'selecionar',
            label: 'Selecionar',
            enableOrder: true,
            align: 'center',
            width: '15%',
            itemSelected: <IconButton sx={{ color: "#f5f5f5", outline: 'none !important;;' }}><CheckBoxIcon /></IconButton>,
            itemNoSelected: <IconButton sx={{ color: "#f5f5f5", outline: 'none !important;;', }}><CheckBoxOutlineBlankIcon /></IconButton>,
            checkField: true
        },
        {
            disablePadding: false,
            field: 'nome',
            label: 'Nome',
            enableOrder: true,
            align: "left",
            width: '15%'

        },
        {
            disablePadding: false,
            field: 'fornecedor',
            label: 'Fornecedor',
            enableOrder: true,
            align: "left",
            width: '15%'

        },
        {
            disablePadding: false,
            field: 'categoria',
            label: 'Categoria',
            enableOrder: true,
            align: "left",
            width: '15%'

        },
        {
            disablePadding: false,
            field: 'descricao',
            label: 'Descriçao',
            enableOrder: true,
            align: "left",
            width: '40%'
        },
    ]

    return (
        <TableGeneric reload={props.reload} setReload={props.setReload} tabela="produtos" title='Pesquisar' setItemEdit={props.setProdutoSelecionado} itemEdit={props.produtoSelecionado} atomFilter={props.atomFilter} atomSelectorList={props.selector} atomPage={produtoPageState} columns={columns} atomRowPerPage={produtoRowsPerPageState} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} setCardPesquisa={props.setCardPesquisa} />
    )
}     