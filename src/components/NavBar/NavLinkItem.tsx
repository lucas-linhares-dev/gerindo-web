
import { Box, ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material"
import { NavLink } from "react-router-dom"
import styled from "@emotion/styled"

interface INavLinkItem {
    icon?: JSX.Element,
    onClick?: any
    name?: any,
    to?: any,
    sx?: SxProps<Theme>
}

interface IListItemButtonStyled {
    colorhover?: string
}

export const ListItemButtonStyled = styled(ListItemButton)((props: IListItemButtonStyled) => ({
    pl: 4,
    paddingBottom: '4%',
    paddingTop: '4%',
    paddingLeft: '45px',
    '&:hover .icon_navlink':{
        color: '#008584'
    },
    '&:hover .list_item_text_itemsublist':{
        '& .MuiTypography-root': {
            color: '#008584', 
        }
    },
    '&:hover':{
        backgroundColor: '#f5f5f5'
    },
    '&:hover .icon_aninhada_sublist':{
        color: '#008584'
    }
}));

export const NavLinkItem = (props: INavLinkItem) => {

    const ListItemButtonBoxSubItemStyle = (props:any) => (
        <Box
            sx={{
                transition: 'all linear .1s',
                color: '#f5f5f5',
                backgroundColor: '#008584',
                '&:hover': {
                    color: 'transparent',
                },
            }}
        >
            {props.children}
        </Box>
    )

    return (
        <NavLink to={props.to} style={{textDecoration: 'none'}}>
            <ListItemButtonBoxSubItemStyle>
                <ListItemButtonStyled disableTouchRipple onClick={props.onClick}>
                    <ListItemIcon className="list_item_icon" style={{ minWidth: '40px'}} sx={{backgroundColor: 'transparent'}}>
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText className="list_item_text_itemsublist" primary={props.name} sx={{
                    '& .MuiTypography-root': {
                        fontSize: '16px', 
                        fontFamily: 'Kanit, sans-serif;',
                        color: 'white', 
                        // fontWeight: 'bold',  
                        transition: 'all .1s linear', 
                        // '&:hover': {
                        //     backgroundColor: '#FFFF99'
                        // }
                    }
                }}/>
                </ListItemButtonStyled>
            </ListItemButtonBoxSubItemStyle>
        </NavLink>
    )
}