
import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography, createTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { UsuarioActions } from "../../actions/UsuarioActions";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useEffect, useMemo, useState } from "react";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { OpenModalConfirm } from "../../components/helpers/OpenModalConfirm";
import { InputImage } from "../../components/Input/InputImage";



interface IConfigurarUsuario {
    _id: string,
    nome: string,
    email: string,
    cargo: string,
    foto: any,
    senha: string,
}

export const ConfigurarUsuario = () => {

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '')

    const usuarioActions = UsuarioActions()

    const [hasError, setHasError] = useState<boolean>(false)

    const initialValues = useMemo(() => {
        return {
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo || '',
            foto: usuario.foto || undefined,
            senha: usuario.senha
        }
    }, [usuario])

    const validationSchema = yup.object().shape({
        email: yup.string()
            .email('E-mail inválido'),
    })

    const { setValue, handleSubmit, formState: { errors }, control, watch } = useForm<IConfigurarUsuario>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues
    })


    const onSubmitCadastro = async (data: any) => {
        console.log(data)
        const confirm = await OpenModalConfirm("Salvar alterações?")
        if(confirm){
            usuarioActions.usuarioUpdate(data).then((res: any) => {
                if (res.status === 200) {
                    localStorage.setItem('usuarioLogado', JSON.stringify(res.data));
                    OpenModal(`Usuário atualizado com sucesso!`, () => window.location.href = 'http://localhost:3000/pagina_inicial')
                }
                else {
                    console.log("ERROS BACK END")
                }
            })
        }
    }

    async function handleImgChange(e: any) {
        getBase64(e)
    }

    async function getBase64(event: any) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setValue('foto', reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, ""))
        };
        reader.onerror = function () {
            setValue('foto', null)
        };
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
                                <Card sx={{ margin: 5, marginTop: 15, marginBottom: 2, backgroundColor: 'transparent', borderRadius: '10px' }}>
                                    <CardContent>
                                        <TitleCardGeneric title="Configure seu perfil" align="center" />
                                        <Grid container direction={'column'} alignContent='center' justifyContent={'center'}>
                                            {hasError && <Grid item sx={{ marginBottom: 4 }}>
                                                <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                                            </Grid>}
                                            <Grid item sx={{ width: '100%', display: 'flex', alignItens: 'center', justifyContent: 'center'}}>
                                                <InputImage control={control} setValue={setValue}/>
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