
import { Card, CardContent, Grid, Typography, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { UsuarioActions } from "../../actions/UsuarioActions";
import { OpenModal } from "../../components/helpers/OpenModal";
import { Header } from "../../components/NavBar/Header";
import { TxtFieldForm } from "../../components/TextField/TxtFieldForm";
import { ButtonGeneric } from "../../components/Button/ButtonGeneric";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from  'yup'
import { AlertError } from "../../components/helpers/AlertError";
import { useState } from "react";
import { TitleCardGeneric } from "../../components/Typographys/TitleCardGeneric";


interface CadastroForm {
    nome: string,
    email: string,
    senha: string,
    senhaConfirm: string
}

export const Cadastro = () => {

    const usuarioActions = UsuarioActions()

    const [hasError, setHasError] = useState<boolean>(false)

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
        if(data.senha === data.senhaConfirm){
            usuarioActions.usuarioInsert(data).then((res: any) => {
                if(res.status === 200){
                    OpenModal(`Seja bem vindo ${res.data.nome}!`, () => window.location.href = 'http://localhost:3000')
                }
                else{
                    console.log("ERROS BACK END")
                }
            })
        }
        else{
            setHasError(true)
        }
    }

    return (
        <div>  
            <Header />
            <form onSubmit={handleSubmit(onSubmitCadastro)}>
                <Grid container direction='column' alignItems='çenter' justifyItems='center'>
                    <Grid item >
                        <Grid container direction='row'>
                            <Grid item xs={12} md={3.5} lg={3} xl={4}>

                            </Grid>
                            <Grid item xs={12} md={6} lg={5} xl={4}>
                                <Card sx={{margin: 5, marginTop: 15, backgroundColor: 'transparent', borderRadius: '10px', }}>
                                    <CardContent>
                                        <TitleCardGeneric title="Crie seu perfil" align="center" />
                                        <Grid container direction={'column'} alignContent='center' justifyContent={'center'}>
                                            { hasError && <Grid item sx={{marginBottom: 4}}>
                                                <AlertError title={"Atenção"} type={'warning'} style={'filled'} msgError="As senhas informadas não condizem!" />
                                            </Grid>}
                                            <Grid item sx={{marginBottom: 3, width: '100%'}}>
                                                <TxtFieldForm name={"nome"} control={control} label={"Nome de usuário"}  error={errors.nome?.message}  />
                                            </Grid>
                                            <Grid item sx={{marginBottom: 3}}>
                                                <TxtFieldForm name={"email"} control={control} label={"E-mail"} error={errors.email?.message} />
                                            </Grid>
                                            <Grid item sx={{marginBottom: 3}}>
                                                <TxtFieldForm name={"senha"} control={control} label={"Senha"} type="password"  error={errors.senha?.message} />
                                            </Grid>
                                            <Grid item sx={{marginBottom: 3}}>
                                                <TxtFieldForm name={"senhaConfirm"} control={control} label={"Confirmação de senha"} type="password"  error={errors.senhaConfirm?.message} />
                                            </Grid>
                                            <Grid item sx={{}}>
                                                <ButtonGeneric title={"CADASTRAR-SE"} fullWidth />
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