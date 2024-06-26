
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
import { FornecedorActions } from "../../actions/FornecedorActions";
import { fornecedorPageState, fornecedorRowsPerPageState, fornecedorSearchAtom, fornecedorSelectorNome } from "../../states/FornecedorState";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { useMunicipiosActions } from "../../actions/municipiosAction";
import { useAlertDialog } from "../../components/Dialogs/DialogProviderAlert";
import { useResolveDialog } from "../../components/Dialogs/DialogProviderResolve";

interface FornecedorForm {
    nome: string,
    email: string,
    telefone: string,
    cnpj: string 
    cep: string,
    endereco: string,
    bairro: string,
    numero: number,
    complemento: string,
    municipio: string
}

export const Fornecedor = () => {

    const fornecedorActions = FornecedorActions()

    const [fornecedorSelecionado, setFornecedorSelecionado] = useState<any>(null)

    const [reload, setReload] = useState<any>(false)

    // const [hasError, setHasError] = useState<boolean>(false)

    const [cardPesquisar, setCardPesquisar] = useState<boolean>(false)

    const showDialogResolve = useResolveDialog()
    const showDialogConfirmed = useAlertDialog()

    const initialValues = useMemo(() => {
        return {
            nome: '',
            email: '',
            telefone: '',
            cnpj: ''
        }
    }, [])

    const validationSchema = yup.object().shape({
        nome: yup.string()
            .required("Campo obrigatório")
            .min(3, 'Mínimo 3 letras'),
        email: yup.string()
            .email('E-mail inválido'),
    })

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<FornecedorForm>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })


    const onSubmitFornecedor = async (data: any) => {
        if (fornecedorSelecionado === null) {
            const confirm = await showDialogResolve({title: '', message: 'Cadastrar fornecedor?'})
            if (confirm) {
                fornecedorActions.fornecedorInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Fornecedor cadastrado com sucesso!", "success")
                        setReload(true)
                        reset({ ...initialValues })
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else {
            const confirm = await showDialogResolve({title: '', message: 'Alterar fornecedor?'})
            if (confirm) {
                fornecedorActions.fornecedorUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Fornecedor alterado com sucesso!", "success")
                        setFornecedorSelecionado(res.data)
                        setReload(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
    }

    const excluirFornecedor = async () => {
        const confirm = await showDialogResolve({title: '', message: 'Excluir fornecedor?'})
        if (confirm) {
            const res = await fornecedorActions.fornecedorExcluir(fornecedorSelecionado._id)
            if (res?.status === 200) {
                showDialogConfirmed("Fornecedor excluido com sucesso!", "success")
                setReload(true)
                setFornecedorSelecionado(null)
            }
            else {
                console.log("ERROS BACK END")
            }
        }
    }

    useEffect(() => {
        if (fornecedorSelecionado != null) {
            reset(fornecedorSelecionado)
            window.scrollTo(0, 500)
        } else {
            reset({ ...initialValues })
        }
    }, [fornecedorSelecionado, initialValues, reset])


    const municipiosActions = useMunicipiosActions();

    function onBlurCEP(event: any) {
        let cep = event.target.value
        if (cep !== '' && (cep.length === 9 || cep.length === 8)) {
          municipiosActions.load_endereco(cep).then((data: any) => {
            console.log(data)
            setValue("endereco", data?.logradouro)
            setValue("bairro", data?.bairro)
          })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitFornecedor)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title="Fornecedores" />

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
                                    <TableFornecedores reload={reload} setReload={setReload} setCardPesquisa={setCardPesquisar} fornecedorSelecionado={fornecedorSelecionado} setFornecedorSelecionado={setFornecedorSelecionado} atomFilter={fornecedorSearchAtom} selector={fornecedorSelectorNome} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Collapse>

                    <Grid item>

                        <Box sx={{ margin: 2, marginTop: 4 }}>
                            <CardGeneric title="Informações pessoais">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={6} lg={4.5} xl={5}>
                                        <TxtFieldForm name={"nome"} control={control} label={"Nome"} error={errors.nome?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3} xl={4}>
                                        <TxtFieldForm name={"email"} control={control} label={"E-mail"} error={errors.email?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={2} xl={1.5}>
                                        <TxtFieldForm name={"telefone"} control={control} label={"Telefone"} mask={'telefone'} error={errors.telefone?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={2.5} xl={1.5}>
                                        <TxtFieldForm name={"cnpj"} control={control} label={"CNPJ"} textAlign={'right'} mask="cnpj" error={errors.cnpj?.message} />
                                    </Grid>
                                    
                                </Grid>
                            </CardGeneric>
                        </Box>

                        <Box sx={{ margin: 2, marginTop: 4 }}>
                            <CardGeneric title="Logradouro">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={2.5} lg={1.5} xl={1}>
                                        <TxtFieldForm name={"cep"} control={control} label={"CEP"} mask="cep" onBlur={onBlurCEP} error={errors.cep?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={9.5} lg={3} xl={3}>
                                        <TxtFieldForm name={"endereco"} control={control} label={"Endereço"} error={errors.endereco?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={2.5} xl={2}>
                                        <TxtFieldForm name={"bairro"} control={control} label={"Bairro"} error={errors.bairro?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={1.5} xl={1}>
                                        <TxtFieldForm name={"numero"} control={control} label={"Numero"} error={errors.numero?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3.5} xl={5}>
                                        <TxtFieldForm name={"municipio"} control={control} label={"Municipio"} error={errors.municipio?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <TxtFieldForm name={"complemento"} control={control} label={"Complemento"} error={errors.complemento?.message} />
                                    </Grid>
                                </Grid>
                            </CardGeneric>
                        </Box>
                            


                        <Grid item>
                            <Box sx={{ margin: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                                {fornecedorSelecionado &&
                                    <ButtonGeneric title='excluir' color={'red'} typeIcon="excluir" backgroundColor={'#f5f5f5'} backgroundColorHover={'red'} type="button" onClick={excluirFornecedor} colorHover="#f5f5f5" />
                                }
                                <ButtonGeneric title={fornecedorSelecionado ? 'alterar' : 'cadastrar'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div >
    )
}

{/* <Grid container direction={'row'} sx={{ marginTop: 5 }} columnSpacing={3} >
<Grid item xs={12} md={12} lg={4} xl={8}>
</Grid>

{fornecedorSelecionado && <Grid item xs={12} md={12} lg={4} xl={2}>
    <ButtonGeneric title='excluir' typeIcon="excluir" backgroundColor={'red'} backgroundColorHover={'red'} />
</Grid>}
<Grid item xs={12} md={12} lg={4} xl={2}>
    <ButtonGeneric title={fornecedorSelecionado ? 'alterar' :'cadastrar' } />
</Grid>
</Grid> */}

interface ITableFornecedores {
    fornecedorSelecionado: any,
    setFornecedorSelecionado: any,
    atomFilter: any,
    selector: any,
    setCardPesquisa: any,
    reload: any,
    setReload: any
}

const TableFornecedores = (props: ITableFornecedores) => {


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
            width: '22.5%'

        },
        {
            disablePadding: false,
            field: 'email',
            label: 'E-mail',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
        {
            disablePadding: false,
            field: 'telefone',
            label: 'Telefone',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
        {
            disablePadding: false,
            field: 'cnpj',
            label: 'CNPJ',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
    ]

    return (
        <TableGeneric atomPage={fornecedorPageState} atomRowPerPage={fornecedorRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="fornecedores" title='Pesquisar' setItemEdit={props.setFornecedorSelecionado} itemEdit={props.fornecedorSelecionado} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} />
    )
}

