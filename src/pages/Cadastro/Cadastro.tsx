
import { Box, Grid, Typography,} from "@mui/material";
import { useForm } from "react-hook-form";
import { UsuarioActions } from "../../actions/UsuarioActions";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useEffect, useState } from "react";
import LOGO_BRANCA from '../../imgs/logo_branca.png'
import { useAlertDialog } from "../../components/Dialogs/DialogProviderAlert";


interface CadastroForm {
    nome: string,
    email: string,
    cargo: string,
    senha: string,
    senhaConfirm: string
}

export const Cadastro = () => {

    const usuarioActions = UsuarioActions()

    const [hasError, setHasError] = useState<boolean>(false)

    const [cadastrado, setCadastrado] = useState<boolean>(false)

    const showDialogConfirmed = useAlertDialog()

    const validationSchema = yup.object().shape({
        nome: yup.string()
            .required("Campo obrigatório")
            .min(3, 'Mínimo 3 letras'),
        email: yup.string()
            .required("Campo obrigatório")
            .email('E-mail inválido'),
        senha: yup.string()
            .required("Campo obrigatório"),
        senhaConfirm: yup.string()
            .required("Campo obrigatório")
    })

    const { setValue, handleSubmit, formState: { errors }, control } = useForm<CadastroForm>({
        resolver: yupResolver(validationSchema)
    })


    const onSubmitCadastro = async (data: any) => {
        console.log("SUBMIT")
        if (data.senha === data.senhaConfirm) {
            usuarioActions.usuarioInsert(data).then(async (res: any) => {
                if (res.status === 200) {
                    await showDialogConfirmed(`Seja bem vindo ${res.data.nome}!`, "success")
                    setCadastrado(true)
                }
                else {
                    console.log("ERROS BACK END")
                }
            })
        }
        else {
            setHasError(true)
        }
    }

    useEffect(() => {
        if(cadastrado)
        window.location.href = 'http://localhost:3000/'
    }, [cadastrado])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitCadastro)}>
                <Grid container direction='column' alignItems='çenter' justifyItems='center'>
                    <Grid item >
                        <Grid container direction='row'>
                            <Grid item xs={12} md={3.5} lg={3} xl={4}>

                            </Grid>
                            <Grid item xs={12} md={6} lg={5} xl={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 3 }}>
                                    <img src={LOGO_BRANCA} alt="LOGO" style={{ width: '260px', height: '280px' }} />
                                </Box>
                                <Box sx={{ margin: 5, marginBottom: 2, backgroundColor: 'transparent', borderRadius: '10px', }}>
                                    <Grid container direction={'column'} alignContent='center' justifyContent={'center'}>
                                        {hasError && <Grid item sx={{ marginBottom: 4 }}>
                                            <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                                        </Grid>}
                                        <Grid item sx={{ marginBottom: 3, width: '100%' }}>
                                            <TxtFieldForm name={"nome"} control={control} label={"Nome de usuário"} error={errors.nome?.message} />
                                        </Grid>
                                        <Grid item sx={{ marginBottom: 3 }}>
                                            <TxtFieldForm name={"email"} control={control} label={"E-mail"} error={errors.email?.message} />
                                        </Grid>
                                        <Grid item sx={{ marginBottom: 3 }}>
                                            <TxtFieldForm name={"cargo"} control={control} label={"Cargo"} error={errors.cargo?.message} />
                                        </Grid>
                                        <Grid item sx={{ marginBottom: 3 }}>
                                            <TxtFieldForm name={"senha"} control={control} label={"Senha"} type="password" error={errors.senha?.message} />
                                        </Grid>
                                        <Grid item sx={{ marginBottom: 3 }}>
                                            <TxtFieldForm name={"senhaConfirm"} control={control} label={"Confirmação de senha"} type="password" error={errors.senhaConfirm?.message} />
                                        </Grid>
                                        <Grid item sx={{}}>
                                            <ButtonGeneric title={"CADASTRAR-SE"} fullWidth />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography fontFamily={'Kanit, sans-serif;'} fontWeight={'bold'} sx={{ marginBottom: 2 }}>Já se cadastrou?</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                    <ButtonGeneric title={"FAZER LOGIN"} typeIcon="entrar" backgroundColor={"#f5f5f5"} color={"#006666"} backgroundColorHover={'#008584'} colorHover='#f5f5f5' width="300px" onClick={() => { window.location.href = 'http://localhost:3000/' }} type="button" />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3.5} lg={3} xl={4}>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}