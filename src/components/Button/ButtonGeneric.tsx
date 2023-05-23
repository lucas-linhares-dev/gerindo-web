import { Button, Icon } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestoreIcon from '@mui/icons-material/Restore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

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
    fullWidth?: boolean,
    height?: string,
    buttonPesquisar?: boolean,
    disabledPadrao?: boolean,
    disabledConfirm?: boolean,
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
            case "confirmed": return <CheckIcon/>
        }
    }
    
    return (
        <Button 
        disabled = {props.disabledPadrao || props.disabledConfirm || false }
         sx={{
            "&.Mui-disabled": {
                backgroundColor: props.disabledConfirm ? '#00b3b3' : '#c5c5c5',
                color: "#f5f5f5"
            },
            fontFamily: 'Kanit, sans-serif;',
            width: props.fullWidth ? '100%' : null,
            border: 'none',
            paddingLeft: props.buttonPesquisar ? 5 : null,
            paddingRight: props.buttonPesquisar ? 5 : null,
            marginRight: props.marginRight ? props.marginRight : '20px',
            backgroundColor: props.backgroundColor ? props.backgroundColor : '#006666',
            marginTop: props.marginTop && props.marginTop,   
            color: props.color || '#f5f5f5',
            fontWeight: 'bold', height: props.height || '50px',
            transition: 'all .1s linear',
            fontSize: '17px',
            ':hover': {
                backgroundColor: props.backgroundColorHover ? props.backgroundColorHover : '#008584',
                border: 'none',
                transform: 'translateY(-1px)'
            }
            }} 
            disableRipple
            variant='outlined'
            type={props.type ? props.type : 'submit'}
            endIcon={ typeIcon ? getIconFromName(typeIcon) : <SaveOutlinedIcon />}   
            onClick={props.onClick}>

            {props.title}

        </Button>
    )
}