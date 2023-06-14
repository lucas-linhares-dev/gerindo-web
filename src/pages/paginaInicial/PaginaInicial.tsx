import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Header } from "../../components/NavBar/Header"
import { Box, CardActionArea, Grid, IconButton } from "@mui/material"
import LOGO_BRANCA from '../../imgs/logo_branca.png'
import { CardGeneric } from "../../components/Card/CardGeneric"
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import PaidIcon from '@mui/icons-material/Paid';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StorageIcon from '@mui/icons-material/Storage';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';



const StyledCardActionArea = styled(Card)(({ theme }) => ({
    background: 'transparent',
    boxShadow: 'none',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      background: 'transparent',
      boxShadow: 'none',
    },
  }));

export const PaginaInicial = () => {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado')
    const usuarioLogado = JSON.parse(usuarioLogadoJSON || '{}')
    console.log(usuarioLogado)
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 5 }}>
                <img src={LOGO_BRANCA} alt="LOGO" style={{ width: '260px', height: '280px' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 2 }}>
                <Typography align="center" variant="h1" fontWeight={'bold'} fontFamily={'Kanit, sans-serif;'} fontSize={'80px'} color='#008584'>GERINDO+</Typography>
            </Box>
            <Grid item xs={12} md={12} lg={12} xl={12} >
                    <Typography align="center" variant="h1" fontWeight={'bold'} fontFamily={'Kanit, sans-serif;'} fontSize={'30px'} color='#008584'>Gerindo seu estoque e suas vendas de forma prática, moderna e confiável. </Typography>
            </Grid>
            <Grid container direction='row' marginTop={10} marginBottom={3}>
                <Grid item xs={6} md={6} lg={3} xl={3}>
                <Link to='/entrada' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Entradas"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <ShoppingCartOutlinedIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/fornecedor' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Fornecedores"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <GroupsIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/venda' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Vendas"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <PointOfSaleIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/cliente' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Clientes"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <ContactsIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/produto' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Produtos"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <InventoryIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/categoria' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Categorias"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <ListAltIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/formaPagamento' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Formas pag"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <PaidIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
                <Grid item xs={6} md={6} lg={3} xl={3} >
                <Link to='/configurar_usuario' style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCardActionArea>
                        <CardGeneric title={"Usuário"} smallCard height={180}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <AccountCircleIcon sx={{fontSize: 50, color: '#008584'}} />
                            </Box>
                        </CardGeneric>
                </StyledCardActionArea>
                </Link>
                </Grid>
            </Grid>

        </div>
    )
}