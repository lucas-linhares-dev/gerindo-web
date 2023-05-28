import React, { Fragment, useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemIcon, Tooltip, Avatar, Divider, Menu, MenuItem, Grid } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StorageIcon from '@mui/icons-material/Storage';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import HailIcon from '@mui/icons-material/Hail';
import { Scrollbars } from "react-custom-scrollbars";
import { NavLinkItem } from './NavLinkItem';
import { NavLinkSubItem } from './NavLinkSubItem';
import { ItemSubList } from './ItemSubList';
import { ItemList } from './ItemList';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { itemListIconStyle, navLinkItemIconStyle, navLinkSubItemIconStyle } from '../NavBar/NavbarStyles';
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

function Navbar() {

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '')

    const [drawerOpen, setDrawerOpen] = useState(false);

    // const usuario = useRecoilValue(authAtom);

    const navigate = useNavigate()

    const [openAninhadaParametros, setOpenAninhadaParametros] = useState(false);
    // const [openAninhadaUsuario, setOpenAninhadaUsuario] = useState(false);
    const [openAninhadaEstoque, setOpenAninhadaEstoque] = useState(false)
    const [openAninhadaProdutos, setOpenAninhadaProdutos] = useState(false);
    const [openAninhadaVendas, setOpenAninhadaVendas] = useState(false);


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setDrawerOpen(open);
            };


    const handleClickEstoque = () => {
        setOpenAninhadaEstoque(!openAninhadaEstoque)
    }

    // const handleClickUsuario = () => {
    //     setOpenAninhadaUsuario(!openAninhadaUsuario);
    // };

    const handleClickParametros = () => {
        setOpenAninhadaParametros(!openAninhadaParametros)
    }

    const handleClickVendas = () => {
        setOpenAninhadaVendas(!openAninhadaVendas)
    }

    const handleClickProdutos= () => {
        setOpenAninhadaProdutos(!openAninhadaProdutos)
    }

    // const handleBtnDeslogarClick = () => {
    //     authActions.logout()
    //     navigate('/login')
    // }



    // const listItemUsuario = () => {

    //     return (
    //         <ItemList name='Usuários' onClick={handleClickUsuario} stateAninhada={openAninhadaUsuario} icon={<PeopleIcon className='icon_itemlist' sx={itemListIconStyle} />}  >
    //             <NavLinkItem to='/usuarios' name='Formulário' icon={<FormatListBulletedIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
    //         </ItemList>
    //     )
    // }

    const listItemVendas = () => {

        return (
            <ItemList name='Vendas' onClick={handleClickVendas} stateAninhada={openAninhadaVendas} icon={<PointOfSaleIcon className='icon_itemlist' sx={itemListIconStyle} />}  >
                <NavLinkItem to='/venda' name='Formulário' icon={<ContentPasteSearchIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
                <NavLinkItem name='Clientes' to='/cliente' icon={<ContactsIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
            </ItemList>
        )
    }
    

    const listItemEstoque = () => {

        return (

            <ItemList name='Estoque' onClick={handleClickEstoque} stateAninhada={openAninhadaEstoque} icon={<StorageIcon className='icon_itemlist' sx={itemListIconStyle} />}>
                <NavLinkItem to='/entrada' name='Entradas' icon={<ShoppingCartOutlinedIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
                <NavLinkItem to='/fornecedor' name='Fornecedores' icon={<GroupsIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
            </ItemList>

        )
    }

    const listItemParametros = () => {

        return (
            <ItemList name='Parâmetros' onClick={handleClickParametros} stateAninhada={openAninhadaParametros} icon={<SettingsIcon className='icon_itemlist' sx={itemListIconStyle} />} >
                <NavLinkItem name='Formas de pagamento' to='/formaPagamento' icon={<PaidIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
                <NavLinkItem name='Categorias' to='/categoria' icon={<ListAltIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
            </ItemList>
        )
    }

    const listItemProdutos = () => {

        return (
            <ItemList name='Produtos' onClick={handleClickProdutos} stateAninhada={openAninhadaProdutos} icon={<InventoryIcon className='icon_itemlist' sx={itemListIconStyle} />} >
                <NavLinkItem to='/produto' name='Formulário' icon={<ContentPasteSearchIcon className='icon_navlink' sx={navLinkItemIconStyle} />} />
            </ItemList>
        )
    }

    const ListMenuModulos = () => {

        return (
            <Box>
                <List>
                    {listItemVendas()}
                    {listItemEstoque()}
                </List>
            </Box>
        );
    }

    const ListMenuDependencias = () => {

        return (
            <Box>
                <List>
                    {listItemParametros()}
                    {listItemProdutos()}
                </List>
            </Box>
        );
    }


    const MenuUsuario = () => {
        return (
            <Box sx={{ padding: '15px 16px', borderTop: '1px solid white' }}>
                <Grid container direction={'row'} sx={{}}>
                    <Box sx={{ width: '22%', backgroundColor: 'transparent', marginRight: 3, marginLeft: 1 , borderRadius: '50%'}}>
                     {/* <img src={FOTO_CAIO_3} alt="perfil" width={65} height={65} style={{borderRadius: '50%'}}/> */}
                    </Box>
                    <Box sx={{ width: '65%', paddingTop: 1 }}>
                        <Typography sx={{
                            fontFamily: 'Kanit, sans-serif;',
                            fontWeight: 'bold',
                        }} color={'#FFD525'}>
                            {usuario?.nome} 
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'Kanit, sans-serif;', fontSize: '13px', marginTop: '1px'
                        }} color={'white'}>
                            {usuario?.cargo}
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        )
    }

    return (
        <Fragment key='left'>
            <Box sx={{ display: 'flex'}}>
                <CssBaseline />
                <AppBar position="static" sx={{ bgcolor: '#006666', width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Box display='flex' flexGrow={150}>
                            <IconButton sx={{outline: 'none !important;;', mr: 2}} edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(!drawerOpen)}>
                                <MenuIcon/>
                            </IconButton>
                        </Box>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            {usuario?.nome} 
                        </Typography>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}></Typography>
                        <Tooltip title="Account settings"><IconButton sx={{outline: 'none !important;;'}} edge="end" color="inherit" aria-label="menu" onClick={handleClick}>
                            {/* <img src={logo} alt="logo" width={50} height={50} /> */}
                        </IconButton></Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={() => {window.location.href = 'http://localhost:3000/sair'}}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: "red" }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor='left'
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    sx={{
                        flexShrink: 1,
                        [`& .MuiDrawer-paper`]: {
                            boxSizing: 'border-box',
                            backgroundColor: '#006666',
                            marginTop: '0',
                            width: {
                                xs: 260,
                                md: 300,
                                lg: 325,
                                xl: 350
                            }
                        },
                    }}
                >
                    <Toolbar />
                    <Scrollbars renderThumbVertical={({ style, ...props }) =>
                        <Box {...props}
                            style={{
                                ...style,
                                backgroundColor: 'black',
                                width: '6px',
                                opacity: '0.3',
                                borderRadius: '50px'
                            }} />
                    }>
                        <Box sx={{ paddingLeft: 2, paddingTop: 3, paddingBottom: 2 }}>
                            <Grid container direction={'row'}>
                                <Grid item xs={9.5} md={10} lg={10} xl={10}>
                                    <Box sx={{display: 'inline-block', marginRight: 1.5}}>
                                        {/* <img src={logo} alt="logo" width={40} height={40} /> */}
                                    </Box>
                                    <Box sx={{display: 'inline-block'}}>
                                        <Typography sx={{fontFamily: 'Kanit, sans-serif;', fontWeight: 'bold', fontSize: '18px'}} color={'white'}>
                                            GERINDO+
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Box>
                                        <IconButton  sx={{outline: 'none !important;;'}} onClick={() => {setDrawerOpen(false)}}>
                                            <ArrowForwardIcon sx={{color: 'white'}} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        {MenuUsuario()}

                        <Box sx={{ paddingLeft: 2, paddingTop: 2, borderTop: '1px solid white' }}>
                            <Typography sx={{
                                fontFamily: 'Kanit, sans-serif;',
                                fontWeight: 'bold'
                            }} color={'white'}>Módulos</Typography>
                        </Box>
                        {ListMenuModulos()}
                        <Box sx={{ paddingLeft: 2, paddingTop: 2, borderTop: '1px solid white' }}>
                            <Typography sx={{
                                fontFamily: 'Kanit, sans-serif;',
                                fontWeight: 'bold'
                            }} color={'white'}>Dependencias</Typography>
                        </Box>
                        {ListMenuDependencias()}
                    </Scrollbars>
                    <Box sx={{backgroundColor: '#00b6b6', height: '55px', paddingTop: '5px'}}>
                        <Grid container direction={'row'}>
                            <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
                            </Grid>
                            <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
                                <IconButton  sx={{}} onClick={() => {}}>
                                    <NotificationsIcon sx={{color: '#006666'}} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
                                <IconButton  sx={{}} onClick={() => {}}>
                                    <EmailIcon sx={{color: '#006666'}} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
                                <IconButton  sx={{}} onClick={() => {window.location.href = 'http://localhost:3000/configurar_usuario'}}>
                                    <AccountCircleIcon sx={{color: '#006666'}} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} xl={2}>
                                <IconButton  sx={{  }} onClick={() => {window.location.href = 'http://localhost:3000/sair'}}>
                                    <LogoutIcon sx={{color: '#c1272d'}} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Drawer>
            </Box>
        </Fragment>
    );
};

export default Navbar