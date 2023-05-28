
import { Box, Button, Card, CardContent, Grid, TextField, Typography, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { UsuarioActions } from "../../actions/UsuarioActions";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useState } from "react";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import SearchIcon from '@mui/icons-material/Search';
import { InputImage } from "../../components/Input/InputImage";



interface IConfigurarUsuario {
    foto: string,
    nome: string,
    email: string,
    cargo: string,
    senha: string,
}

export const ConfigurarUsuario = () => {

    const usuarioActions = UsuarioActions()

    const [hasError, setHasError] = useState<boolean>(false)
    const [image, setImage] = useState(null);

    console.log(image)


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

    const { setValue, handleSubmit, formState: { errors }, control } = useForm<IConfigurarUsuario>({
        resolver: yupResolver(validationSchema)
    })


    const onSubmitCadastro = async (data: any) => {
        console.log("SUBMIT")
        if (data.senha === data.senhaConfirm) {
            usuarioActions.usuarioInsert(data).then((res: any) => {
                if (res.status === 200) {
                    OpenModal(`Seja bem vindo ${res.data.nome}!`, () => window.location.href = 'http://localhost:3000/')
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

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitCadastro)}>
                <Grid container direction='column' alignItems='çenter' justifyItems='center'>
                    <Grid item >
                        <Grid container direction='row'>
                            <Grid item xs={12} md={3.5} lg={3} xl={4}>

                            </Grid>
                            <Grid item xs={12} md={6} lg={5} xl={4}>
                                <Card sx={{ margin: 5, marginTop: 15, marginBottom: 2, backgroundColor: 'transparent', borderRadius: '10px', }}>
                                    <CardContent>
                                        <TitleCardGeneric title="Configure seu perfil" align="center" />
                                        <Grid container direction={'column'} alignContent='center' justifyContent={'center'}>
                                            {hasError && <Grid item sx={{ marginBottom: 4 }}>
                                                <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                                            </Grid>}
                                            <Grid item sx={{ marginBottom: 3, width: '100%' }}>
                                                <InputImage image={image} setImage={setImage}/>
                                            </Grid>
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
                                            <Grid item sx={{}}>
                                                <ButtonGeneric title={"SALVAR"} fullWidth />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
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