import { Button, Icon } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestoreIcon from '@mui/icons-material/Restore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SearchIcon from '@mui/icons-material/Search';

interface IButtonGeneric {
    title: string
    marginRight?: string,
    marginTop?: string,
    type?: 'submit' | 'button',
    onClick?: any,
    backgroundColor?: any,
    backgroundColorHover?: any;
    color?: any;
    typeIcon?: string,
    fullWidth?: boolean
}

export const ButtonGeneric = (props: IButtonGeneric) => {

    const typeIcon = props.typeIcon

    const getIconFromName = (typeIcon:string) => {
        switch(typeIcon){
            case "gravar": return <SaveOutlinedIcon />;
            case "filtrar": return <FilterListIcon />
            case "liquidar": return <FileDownloadIcon />;
            case "estornar": return <RestoreIcon />;
            case "excluir": return <DeleteIcon />
            case "entrar": return <ExitToAppIcon />
            case "pesquisar": return <SearchIcon />
        }
    }
    
    return (
        <Button 
         sx={{
            width: props.fullWidth ? '100%' : null,
            border: 'none',
            marginRight: props.marginRight ? props.marginRight : '20px',
            backgroundColor: props.backgroundColor ? props.backgroundColor : 'rgb(32, 112, 0)',
            marginTop: props.marginTop && props.marginTop,   
            color: props.color || 'white',
            fontWeight: 'bold', height: '50px',
            transition: 'all .1s linear',
            ':hover': {
                backgroundColor: props.backgroundColorHover ? props.backgroundColorHover : 'rgb(40, 141, 0)',
                border: 'none',
                color: 'white',
                transform: 'translateY(-1px)'
            }
            }} 

            variant='outlined'
            type={props.type ? props.type : 'submit'}
            endIcon={ typeIcon ? getIconFromName(typeIcon) : <SaveOutlinedIcon />}   
            onClick={props.onClick}>

            {props.title}

        </Button>
    )
}