
import { Box, Collapse, Grid, IconButton,} from "@mui/material";
import { useForm } from "react-hook-form";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useEffect, useState } from "react";
import { CategoriaActions } from "../../actions/CategoriaActions";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { categoriaPageState, categoriaRowsPerPageState, categoriaSearchAtom, categoriaSelectorNome } from "../../states/CategoriaState";
import { useRecoilState } from "recoil";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { useAlertDialog } from "../../components/Dialogs/DialogProviderAlert";
import { useResolveDialog } from "../../components/Dialogs/DialogProviderResolve";


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

    const showDialogResolve = useResolveDialog()
    const showDialogConfirmed = useAlertDialog()

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
        if (categoriaSelecionada === null) {
            const confirm = await showDialogResolve({title: '', message: 'Cadastrar categoria?'})
            if (confirm) {
                categoriaActions.categoriaInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Categoria cadastrada com sucesso!", "success")
                        reset({ ...initialValues })
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else {
            const confirm = await showDialogResolve({title: '', message: 'Alterar categoria?'})
            if (confirm) {
                categoriaActions.categoriaUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Categoria alterada com sucesso!", "success")
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
        const confirm = await showDialogResolve({title: '', message: 'Excluir categoria?'})
        if (confirm) {
            const res = await categoriaActions.categoriaExcluir(categoriaSelecionada._id)
            if (res?.status === 200) {
                showDialogConfirmed("Categoria excluida com sucesso!", "success")
                setReload(true)
                setCategoriaSelecionada(null)
            }
            else {
                console.log("ERROS BACK END")
            }
        }
    }

    useEffect(() => {
        if (categoriaSelecionada != null) {
            reset(categoriaSelecionada)
            window.scrollTo(0, 500)
        } else {
            reset({ ...initialValues })
        }
    }, [categoriaSelecionada])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitCategoria)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title="Categorias" />

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
                                    <TableCategorias categoriaSelecionada={categoriaSelecionada} setCategoriaSelecionada={setCategoriaSelecionada} atomFilter={categoriaSearchAtom} selector={categoriaSelectorNome} setCardPesquisa={setCardPesquisar} reload={reload} setReload={setReload} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Collapse>

                    <Grid item>
                        <Box sx={{ margin: 2, marginTop: 4 }}>
                            <CardGeneric title="Informações gerais">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={5} lg={5} xl={5}>
                                        <TxtFieldForm name={"nome"} control={control} label={"Nome"} error={errors.nome?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={7} xl={7}>
                                        <TxtFieldForm name={"descricao"} control={control} label={"Descrição"} error={errors.descricao?.message} />
                                    </Grid>
                                </Grid>
                            </CardGeneric>
                        </Box>
                        <Grid item>
                            <Box sx={{ margin: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                                {categoriaSelecionada &&
                                    <ButtonGeneric title='excluir' color={'red'} typeIcon="excluir" backgroundColor={'#f5f5f5'} backgroundColorHover={'red'} type="button" onClick={excluirCategoria} colorHover="#f5f5f5" />
                                }
                                <ButtonGeneric title={categoriaSelecionada ? 'alterar' : 'cadastrar'} />
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