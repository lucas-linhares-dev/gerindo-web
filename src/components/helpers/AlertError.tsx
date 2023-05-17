import { Alert, AlertTitle, Typography } from "@mui/material"

interface IAlertError {
    title: string,
    objError?: any,
    msgError?: string,
    type: any,
    style: any
}

export const AlertError = (props: IAlertError) => {
    return (
        <Alert severity={props.type} variant={props.style} sx={{backgroundColor: 'orange',"& .MuiAlert-icon": {
            fontSize: 25, color: 'black'
          }}}>
            <AlertTitle sx={{fontWeight: 'bold'}} color="black">{props.title}</AlertTitle>
            {props.msgError && <Typography color="black" sx={{}}>{props.msgError}</Typography>}
            {props.objError && <Typography>{props.objError}</Typography>}
        </Alert>
    )

}