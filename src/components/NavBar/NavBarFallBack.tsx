import { Fragment } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography} from '@mui/material';
import { useRecoilValue } from 'recoil';
// import logo from '../../assets/imgs/logo.png';
import MenuIcon from '@mui/icons-material/Menu';

function NavbarFallBack() {

    // const usuario = useRecoilValue(authAtom);

    return (
                <Fragment key='left'>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="static" sx={{ bgcolor: '#2B7C41', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <Toolbar>
                                <Box display='flex' flexGrow={150}>
                                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                                    {/* {usuario?.apelido} */}
                                </Typography>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}></Typography>
                                <IconButton edge="end" color="inherit" aria-label="menu" >
                                    {/* <img src={logo} alt="logo" width={50} height={50} /> */}
                                </IconButton>

                            </Toolbar>
                        </AppBar>
                    </Box>
                </Fragment>
    );
};

export default NavbarFallBack