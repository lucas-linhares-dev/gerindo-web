
import { Box, Card, CardContent, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useEffect, useState } from "react";
import TableGeneric from "../../components/Table/TableGeneric";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { OpenModalConfirm } from "../../components/helpers/OpenModalConfirm";
import { useRecoilState } from "recoil";
import { FormaPagamentoActions } from "../../actions/FormaPagamentoActions";
import { formaPagamentoPageState, formaPagamentoRowsPerPageState, formaPagamentoSearchAtom, formaPagamentoSelectorNome } from "../../states/FormaPagamentoState";
import { CardGeneric } from "../../components/Card/CardGeneric";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";
import { useAlertDialog } from "../../components/Dialogs/DialogProviderAlert";
import { useResolveDialog } from "../../components/Dialogs/DialogProviderResolve";

interface FormasPagamentoForm {
    nome: string,
    descricao: string
}

export const FormaPagamento = () => {

    const formaPagamentoActions = FormaPagamentoActions()

    // const [hasError, setHasError] = useState<boolean>(false)

    const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState<any>(null)

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

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<FormasPagamentoForm>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })


    const onSubmitFormaPagamento = async (data: any) => {
        if (formaPagamentoSelecionada === null) {
            const confirm = await showDialogResolve({title: '', message: 'Cadastrar forma de pagamento?'})
            if (confirm) {
                formaPagamentoActions.formaPagamentoInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Forma de pagamento cadastrada com sucesso!", "success")
                        reset({ ...initialValues })
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else {
            const confirm = await showDialogResolve({title: '', message: 'Alterar forma de pagamento?'})
            if (confirm) {
                formaPagamentoActions.formaPagamentoUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        showDialogConfirmed("Forma de pagamento alterada com sucesso!", "success")
                        setFormaPagamentoSelecionada(res.data)
                        setReload(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
    }

    const excluirFormaPagamento = async () => {
        const confirm = await showDialogResolve({title: '', message: 'Excluir forma de pagamento?'})
        if (confirm) {
            const res = await formaPagamentoActions.formaPagamentoExcluir(formaPagamentoSelecionada._id)
            if (res?.status === 200) {
                showDialogConfirmed("Forma de pagamento excluida com sucesso!", "success")
                setReload(true)
                setFormaPagamentoSelecionada(null)
            }
            else {
                console.log("ERROS BACK END")
            }
        }
    }

    useEffect(() => {
        if (formaPagamentoSelecionada != null) {
            reset(formaPagamentoSelecionada)
            window.scrollTo(0, 500)
        } else {
            reset({ ...initialValues })
        }
    }, [formaPagamentoSelecionada])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitFormaPagamento)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title="Formas de pagamento" />

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
                                    <TableFormasPagamento formaPagamentoSelecionada={formaPagamentoSelecionada} setFormaPagamentoSelecionada={setFormaPagamentoSelecionada} atomFilter={formaPagamentoSearchAtom} selector={formaPagamentoSelectorNome} setCardPesquisa={setCardPesquisar} reload={reload} setReload={setReload} />
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
                                {formaPagamentoSelecionada &&
                                    <ButtonGeneric title='excluir' color={'red'} typeIcon="excluir" backgroundColor={'#f5f5f5'} backgroundColorHover={'red'} type="button" onClick={excluirFormaPagamento} colorHover="#f5f5f5" />
                                }
                                <ButtonGeneric title={formaPagamentoSelecionada ? 'alterar' : 'cadastrar'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

interface ITableFormasPagamento {
    formaPagamentoSelecionada: any,
    setFormaPagamentoSelecionada: any,
    atomFilter: any,
    selector: any,
    setCardPesquisa: any,
    reload: any,
    setReload: any
}


const TableFormasPagamento = (props: ITableFormasPagamento) => {

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
        <TableGeneric atomPage={formaPagamentoPageState} atomRowPerPage={formaPagamentoRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="formasPagamento" title='Pesquisar' setItemEdit={props.setFormaPagamentoSelecionada} itemEdit={props.formaPagamentoSelecionada} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} />
    )
}   