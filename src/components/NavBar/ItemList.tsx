
import styled from "@emotion/styled"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material"


interface IItemList {
    name: any,
    onClick: any,
    stateAninhada: any
    icon: JSX.Element,
    children: React.ReactNode,
}

export const ItemList = (props: IItemList) => {

    interface IListItemButtonStyled {
        colorhover?: string
    }
    
    const ListItemButtonStyled = styled(ListItemButton)((props: IListItemButtonStyled) => ({
        paddingBottom: '4%', 
        paddingTop: '4%', 
        '&:hover': { 
            background: 'transparent', 
            backgroundColor: 'transparent' 
        },
        '&:hover .list_item_text_itemlist': { 
            '& .MuiTypography-root': {
                color: 'white', 
            }
        },
        '&:hover .icon_itemlist':{
            color: 'white'
        },
        '&:hover .icon_aninhada_itemlist':{
            color: 'white'
        },
    }));


    const ListItemButtonBoxStyled = (props: any) => (
        <Box
            sx={{
                transition: 'all linear .1s',
                color: '#d7d7d7',
            }}
        >
            {props.children}
        </Box>
    );


    return (
        <ListItemButtonBoxStyled>
            <ListItemButtonStyled disableTouchRipple onClick={props.onClick}>
                <ListItemIcon style={{ minWidth: '40px' }} sx={{backgroundColor: 'transparent', padding: 1.5, marginRight: 1.5 }} >
                    {props.icon}
                </ListItemIcon>
                <ListItemText className="list_item_text_itemlist" sx={{
                    '& .MuiTypography-root': {
                        fontSize: '17px', 
                        fontFamily: 'Kanit, sans-serif;' ,
                        color: '#d7d7d7', 
                        fontWeight: 'bold' ,
                        transition: 'all .1s linear', 
                    }
                }}
                    primary={props.name} />
                {props.stateAninhada ? <ExpandLess className="icon_aninhada_itemlist" /> : <ExpandMore className="icon_aninhada_itemlist" />}
            </ListItemButtonStyled>
            <Collapse in={props.stateAninhada} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.children}
                </List>
            </Collapse>
        </ListItemButtonBoxStyled>
    )
}