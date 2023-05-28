

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
import { CardGeneric } from "../../components/Card/CardGeneric";
import { TitlePageGeneric } from "../../components/Typographys/TitlePageGeneric";

interface ClienteForm {
    nome: string,
    email: string,
    telefone: string, // mascara
    cpf: string // mascara
}

export const Cliente = () => {

    const clienteActions = ClienteActions()

    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null)

    const [reload, setReload] = useState<any>(false)


    // const [hasError, setHasError] = useState<boolean>(false)

    const [cardPesquisar, setCardPesquisar] = useState<boolean>(false)

    const initialValues = {
        nome: '',
        email: '',
        telefone: '',
        cpf: ''
    }

    const validationSchema = yup.object().shape({
        nome: yup.string()
            .required("Campo obrigatório")
            .min(3, 'Mínimo 3 letras'),
        email: yup.string()
            .email('E-mail inválido'),
    })

    const { setValue, handleSubmit, formState: { errors }, control, reset } = useForm<ClienteForm>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })


    const onSubmitCliente = async (data: any) => {
        if (clienteSelecionado === null) {
            const confirm = await OpenModalConfirm("Cadastrar cliente?")
            if (confirm) {
                clienteActions.clienteInsert(data).then((res: any) => {
                    if (res.status === 200) {
                        OpenModal(`Cliente cadastrado com sucesso!`, () => { })
                        reset({ ...initialValues })
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
        else {
            const confirm = await OpenModalConfirm("Alterar cliente?")
            if (confirm) {
                clienteActions.clienteUpdate(data).then((res: any) => {
                    if (res.status === 200) {
                        OpenModal("Cliente alterado com sucesso!", () => { })
                        setClienteSelecionado(res.data)
                        setReload(true)
                    }
                    else {
                        console.log("ERROS BACK END")
                    }
                })
            }
        }
    }

    const excluirCliente = async () => {
        const confirm = await OpenModalConfirm("Excluir Cliente?")
        if (confirm) {
            const res = await clienteActions.clienteExcluir(clienteSelecionado._id)
            if (res?.status === 200) {
                OpenModal("Cliente excluido com sucesso!", () => { })
                setReload(true)
                setClienteSelecionado(null)
            }
            else {
                console.log("ERROS BACK END")
            }
        }
    }

    useEffect(() => {
        if (clienteSelecionado != null) {
            reset(clienteSelecionado)
        } else {
            reset({ ...initialValues })
        }
    }, [clienteSelecionado])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitCliente)}>
                <Grid container direction={'column'}>

                    <TitlePageGeneric title="Clientes" />


                    <Collapse in={!cardPesquisar}>
                        <Box sx={{ marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center' }}>
                            <ButtonGeneric buttonPesquisar title='Pesquisar' typeIcon="pesquisar" type="button" onClick={() => { setCardPesquisar(true) }} />
                        </Box>
                    </Collapse>

                    {/* {hasError &&
                     <Grid item sx={{ marginBottom: 4 }}>
                        <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                    </Grid>
                    } */}

                    <Collapse in={cardPesquisar}>
                        <Grid item sx={{ marginTop: 2 }}>

                            <Grid container
                                direction="row" spacing={1.5}>
                                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3.0 }}>
                                    <TableFornecedores reload={reload} setReload={setReload} setCardPesquisa={setCardPesquisar} clienteSelecionado={clienteSelecionado} setClienteSelecionado={setClienteSelecionado} atomFilter={clienteSearchAtom} selector={clienteSelectorNome} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Collapse>


                    <Grid item>



                        <Box sx={{ margin: 2, marginTop: 4 }}>
                            <CardGeneric title="Informações gerais">
                                <Grid container direction={'row'} spacing={1.5} sx={{ marginTop: 1 }}>
                                    <Grid item xs={12} md={12} lg={3} xl={3}>
                                        <TxtFieldForm name={"nome"} control={control} label={"Nome"} error={errors.nome?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={6.5} xl={6.5}>
                                        <TxtFieldForm name={"email"} control={control} label={"E-mail"} error={errors.email?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={1.5} xl={1.5}>
                                        <TxtFieldForm name={"telefone"} control={control} label={"Telefone"} error={errors.telefone?.message} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={1} xl={1}>
                                        <TxtFieldForm name={"cpf"} control={control} label={"CPF"} error={errors.cpf?.message} />
                                    </Grid>
                                </Grid>
                            </CardGeneric>
                        </Box>


                        <Grid item>
                            <Box sx={{ margin: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                                {clienteSelecionado &&
                                    <ButtonGeneric title='excluir' color={'red'} typeIcon="excluir" backgroundColor={'#fafafa'} backgroundColorHover={'red'} type="button" onClick={excluirCliente} />
                                }
                                <ButtonGeneric title={clienteSelecionado ? 'alterar' : 'cadastrar'} />
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
    clienteSelecionado: any,
    setClienteSelecionado: any,
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
            field: 'cpf',
            label: 'cpf',
            enableOrder: true,
            align: "left",
            width: '22.5%'
        },
    ]

    return (
        <TableGeneric atomPage={clientePageState} atomRowPerPage={clienteRowsPerPageState} setCardPesquisa={props.setCardPesquisa} reload={props.reload} setReload={props.setReload} tabela="clientes" title='Pesquisar' setItemEdit={props.setClienteSelecionado} itemEdit={props.clienteSelecionado} atomFilter={props.atomFilter} atomSelectorList={props.selector} columns={columns} widthTxtField={"200px"} enableSearch={true} enablePagination={false} height={400} />
    )
}

