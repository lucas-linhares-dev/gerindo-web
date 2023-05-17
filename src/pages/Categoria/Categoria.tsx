
import { Box, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useEffect, useState } from "react";
import { CategoriaActions } from "../../actions/CategoriaActions";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { OpenModalConfirm } from "../../components/helpers/OpenModalConfirm";
import { categoriaPageState, categoriaRowsPerPageState, categoriaSearchAtom, categoriaSelectorNome } from "../../states/CategoriaState";
import { useRecoilState } from "recoil";


interface CategoriaForm {
    nome: string,
    descricao: string
}

export const Categoria = () => {

    const categoriaActions = CategoriaActions()

    // const [hasError, setHasError] = useState<boolean>(false)
    
    const [categoriaSearch, setCategoriaSearch] = useRecoilState(categoriaSearchAtom)
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<any>(null)

    const [reload, setReload] = useState<any>(false)

    const [cardPesquisar, setCardPesquisar] = useState<boolean>(false)

    const initialValues = {
        nome: '',
        descricao: ''
    }

    const validationSchema = yup.object().shape({
        nome: yup.string()
            .required("Campo obrigatório")
            .min(3, 'Mínimo 3 letras'),
    })

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<CategoriaForm>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })


    const onSubmitCategoria = async (data: any) => {
        if(categoriaSelecionada === null){
            const confirm = await OpenModalConfirm("Cadastrar categoria?")
            if(confirm){
                categoriaActions.categoriaInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        OpenModal(`Categoria cadastrada com sucesso!`, () => { })
                        reset({...initialValues})
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else{
            const confirm = await OpenModalConfirm("Alterar categoria?")
            if(confirm){
                categoriaActions.categoriaUpdate(data).then((res: any) => {
                    if(res.status === 200){
                        OpenModal("Categoria alterada com sucesso!", () => {})
                        setCategoriaSelecionada(res.data)
                        setReload(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
    }

    const excluirCategoria = async () => {
        const confirm = await OpenModalConfirm("Excluir categoria?")
        if(confirm){
                const res = await categoriaActions.categoriaExcluir(categoriaSelecionada._id)
                if(res?.status === 200){
                    OpenModal("Categoria excluida com sucesso!", () => {})
                    setReload(true)
                    setCategoriaSelecionada(null)
                }
                else {
                    console.log("ERROS BACK END")
                }
        }
    }

    useEffect(() => {
        if(categoriaSelecionada != null){
            reset(categoriaSelecionada)
        } else {
            reset({ ...initialValues})
        }
    }, [categoriaSelecionada])

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit(onSubmitCategoria)}>
                <Grid container direction={'column'}>

                    <Typography variant="h5" align="center" sx={{ marginTop: 2, marginBottom: 2, fontSize: 30, fontWeight: 'bold', borderBottom: 'solid 1px rgb(148, 148, 148)', color: 'green' }}>
                        Categoria
                    </Typography>

                    {/* {hasError &&
                     <Grid item sx={{ marginBottom: 4 }}>
                        <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                    </Grid>
                    } */}

                    <Box sx={{ margin: 2.5 }}>
                        <Grid container direction={'row'} sx={{  }} >
                            <Grid item xs={12} md={12} lg={4} xl={5}>
                            </Grid>

                            {!cardPesquisar && <Grid item xs={12} md={12} lg={4} xl={2}>
                                <ButtonGeneric fullWidth title='pesquisar' typeIcon="pesquisar" backgroundColor={'#dbdbdb'} color={'black'} backgroundColorHover={'#ffffff'} onClick={() => { setCardPesquisar(true) }} />
                            </Grid>}

                            <Grid item xs={12} md={12} lg={4} xl={5}>
                            </Grid>
                        </Grid>
                    </Box>

                    {cardPesquisar &&
                    <Grid item>

                        <Grid container
                            direction="row" spacing={1.5}>
                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3.0 }}>
                                <TableCategorias categoriaSelecionada={categoriaSelecionada} setCategoriaSelecionada={setCategoriaSelecionada} atomFilter={categoriaSearchAtom} selector={categoriaSelectorNome} setCardPesquisa={setCardPesquisar} reload={reload} setReload={setReload}  />
                            </Grid>
                        </Grid>

                    </Grid>}

                    <Grid item>

                        <Card sx={{ margin: 2.5, backgroundColor: '#ebebeb' }}>
                            <CardContent>

                                <Typography variant="h5" sx={{ marginBottom: 2, fontSize: 22, fontWeight: 'bold', textDecoration: 'underline', color: 'green' }}>
                                    Informações gerais
                                </Typography>

                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={12} lg={5} xl={5}>
                                        <TxtFieldForm name={"nome"} control={control} label={"Nome"} error={errors.nome?.message}  />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={7} xl={7}>
                                        <TxtFieldForm name={"descricao"} control={control} label={"Descrição"} error={errors.descricao?.message}  />
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                        <Grid item>
                            <Box sx={{ margin: 2.5, display: 'flex', justifyContent: 'flex-end'  }}>
                                    {categoriaSelecionada &&
                                        <ButtonGeneric title='excluir' color={'red'}  typeIcon="excluir" backgroundColor={'#fafafa'} backgroundColorHover={'red'} type="button"onClick={excluirCategoria} />
                                    }
                                    <ButtonGeneric title={categoriaSelecionada ? 'alterar' :'cadastrar' } />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

interface ITableFornecedores {
    categoriaSelecionada: any,
    setCategoriaSelecionada: any,
    atomFilter: any,
    selector: any,
    setCardPesquisa: any,
    reload: any,
    setReload: any
}


const TableCategorias = (props: ITableFornecedores) => {

    const columns = [
        {
            disablePadding: false,
            field: 'editar',
            label: 'Editar',
            enableOrder: true,
            align: 'center',
            width: '10%',
            itemSelected: <IconButton sx={{ color: "#2B7C41", outline: 'none !important;;' }}><CheckBoxIcon /></IconButton>,
            itemNoSelected: <IconButton sx={{ color: "#2B7C41", outline: 'none !important;;', }}><CheckBoxOutlineBlankIcon /></IconButton>,
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
            field: 'descricao',
            label: 'Descriçao',
            enableOrder: true,
            align: "left",
            width: '70%'
        },
    ]

    return (
        <TableGeneric atomPage={categoriaPageState} atomRowPerPage={categoriaRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="categorias" title='Pesquisar' setItemEdit={props.setCategoriaSelecionada} itemEdit={props.categoriaSelecionada} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} />
    )
}   