
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, ListItemIcon, ListItemText, Collapse, List } from "@mui/material"
import { ListItemButtonStyled } from "./NavLinkItem"

interface IItemSubList {
    name: any,
    onClick: any,
    stateAninhada: any,
    icon: JSX.Element,
    children: React.ReactNode,
}

export const ItemSubList = (props: IItemSubList) => {

    const ListItemButtonBoxSubItemStyled = (props:any) => (
        <Box
            sx={{
                // borderBottom: 'solid 1px #d1d1d1',
                transition: 'all linear .1s',
                color: '#f5f5f5',
                backgroundColor: '#008584',
                '&:hover': {
                    color: 'white',
                },
            }}
        >
            {props.children}
        </Box>
    )

    const SubListDivChildrenStyled = (props:any) => (
        <List
            sx={{
                backgroundColor: 'transparent',
            }}
        >
            {props.children}
        </List>
    )

    
    return (
        <ListItemButtonBoxSubItemStyled>
            <ListItemButtonStyled disableTouchRipple onClick={props.onClick}>
                <ListItemIcon style={{ minWidth: '40px' }} sx={{backgroundColor: 'transparent',}} >
                    {props.icon}
                </ListItemIcon>
                <ListItemText className="list_item_text_itemsublist" primary={props.name} sx={{
                    '& .MuiTypography-root': {
                        fontSize: '16px', 
                        fontFamily: 'Kanit, sans-serif;',
                        color: 'white', 
                        // fontWeight: 'bold' ,
                        transition: 'all .1s linear', 
                    }
                }} />
                {props.stateAninhada ? <ExpandLess className="icon_aninhada_sublist" sx={{color: 'white'}} /> : <ExpandMore className="icon_aninhada_sublist" sx={{color: 'white'}} />}
            </ListItemButtonStyled>

            <Collapse in={props.stateAninhada} timeout="auto" unmountOnExit>
                <SubListDivChildrenStyled component="div" disablePadding>
                    {props.children}
                </SubListDivChildrenStyled>
            </Collapse>
        </ListItemButtonBoxSubItemStyled>
    )
}