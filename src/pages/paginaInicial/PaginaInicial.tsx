import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Header } from "../../components/NavBar/Header"


export const PaginaInicial = () => {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado')
    const usuarioLogado = JSON.parse(usuarioLogadoJSON || '{}')
    console.log(usuarioLogado)
    return (
        <div>
            <Header /> 
            <Card sx={{ width: '60%', margin: '5% auto auto auto', backgroundColor: 'black', borderRadius: '20px' }}>
                <CardContent>
                    <Typography align='center' variant="h3" color='white'>
                        Seja bem vindo ao projeto
                    </Typography>
                    <Typography variant="h2" align='center' color='green'>Gerenciamento de vendas {usuarioLogado && usuarioLogado.nome}!</Typography>
                </CardContent>
            </Card>
        </div>
    )
}