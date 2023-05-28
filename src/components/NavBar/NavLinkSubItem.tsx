    
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom"

interface INavLinkSubItem {
    icon: JSX.Element,
    onClick?: any
    name: any,
    to: any
}

export const NavLinkSubItem = (props: INavLinkSubItem) => {

    const ListItemButtonBoxSubItemChildrenStyle = (props:any) => (
        <Box
            sx={{
                // borderBottom: 'solid 1px #d1d1d1',
                transition: 'all linear .1s',
                color: '#c5c5c5',
                backgroundColor: 'white',
                '&:hover': {
                    color: 'white',
                },
            }}
        >
            {props.children}
        </Box>
    )

    return (
        <NavLink to={props.to} className='nav-link'>
            <ListItemButtonBoxSubItemChildrenStyle>
                <ListItemButton disableTouchRipple sx={{
                    pl: 4,
                    paddingBottom: '3%',
                    paddingTop: '3%',
                    paddingLeft: '70px',
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }} onClick={props.onClick}>
                    <ListItemIcon style={{ minWidth: '40px'}} sx={{backgroundColor: 'transparent'}}>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.name} sx={{
                    '& .MuiTypography-root': {
                        fontSize: '15px', 
                        fontFamily: 'Kanit, sans-serif;',
                        color: '#005416', 
                        fontWeight: 'bold', 
                        transition: 'all 1s linear', 
                        '&:hover': { 
                            textDecoration: 'underline' 
                        }
                    }
                }}/>
                </ListItemButton>
            </ListItemButtonBoxSubItemChildrenStyle>
        </NavLink>
    )
}