
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UsuarioActions } from "../../actions/UsuarioActions";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useState } from "react";
import { AlertError } from "../../components/helpers/AlertError";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import LOGO_AZUL from '../../imgs/logo_azul.png'
import LOGO_BRANCA from '../../imgs/logo_branca.png'



interface ILogin {
    email: string,
    senha: string,
}

export const Login = () => {
    const usuarioActions = UsuarioActions()

    const [hasError, setHasError] = useState<boolean>(false)
    const [msgError, setMsgError] = useState<any>(false)

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required("Campo obrigatório")
            .email('E-mail inválido'),
        senha: yup.string()
            .required("Campo obrigatório"),
    })

    const { register, setValue, handleSubmit, formState: { errors }, control } = useForm<ILogin>({
        resolver: yupResolver(validationSchema)
    })

    const onSubmitLogin = async (data: any) => {
        usuarioActions.usuarioAuth(data).then((res: any) => {
            if (res.status === 200) {
                localStorage.setItem('usuarioLogado', JSON.stringify(res.data));
                OpenModal(`Bom tê-lo de volta ${res.data.nome}!`, () => window.location.href = 'http://localhost:3000/pagina_inicial')
            }
            else {
                setMsgError(res.response.data.msg)
                setHasError(true)
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <Grid container direction='column' alignItems='çenter' justifyItems='center'>
                    <Grid item >
                        <Grid container direction='row'>
                            <Grid item xs={12} md={3.5} lg={3} xl={4}>

                            </Grid>
                            <Grid item xs={12} md={6} lg={5} xl={4}>
                                <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 10}}>
                                    <img src={LOGO_BRANCA} alt="LOGO" style={{width: '260px', height: '280px'}}/>
                                </Box>
                                <Box sx={{ margin: 5, marginTop: 5, marginBottom: 2, backgroundColor: 'transparent', borderRadius: '10px' }}>
                                        {hasError && <Grid item sx={{ marginBottom: 4 }}>
                                            <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError={msgError} />
                                        </Grid>}
                                        <Grid container direction={'column'} alignContent='center' justifyContent={'center'}>
                                            <Grid item sx={{ marginBottom: 3, width: '100%' }}>
                                                <TxtFieldForm name={"email"} control={control} label={"E-mail"} error={errors.email?.message} />
                                            </Grid>
                                            <Grid item sx={{ marginBottom: 3, width: '100%' }}>
                                                <TxtFieldForm name={"senha"} control={control} label={"Senha"} type="password" error={errors.senha?.message} />
                                            </Grid>
                                            <Grid item sx={{}}>
                                                <ButtonGeneric title={"ENTRAR"} typeIcon="entrar" fullWidth />
                                            </Grid>
                                        </Grid>
                                </Box>
                                <Box sx={{textAlign: 'center'}}>
                                    <Typography fontFamily= {'Kanit, sans-serif;'} fontWeight={'bold'} sx={{marginBottom: 2}}>Ainda não se registrou?</Typography>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                    <ButtonGeneric title={"CRIAR CONTA"} typeIcon="entrar" backgroundColor={"#f5f5f5"} color={"#006666"} backgroundColorHover={'#008584'} colorHover='#f5f5f5' width="300px" onClick={() => {window.location.href = 'http://localhost:3000/cadastro'}} type="button"/>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3.5} lg={3} xl={4}>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}