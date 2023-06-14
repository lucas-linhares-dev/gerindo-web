import { Box, Card, CardContent, Grid } from "@mui/material"
import { TxtFieldForm } from "../TextField/TxtFieldForm"
import { TitleCardGeneric } from "../Typographys/TitleCardGeneric"

interface ICardGeneric {
    title: string,
    children: React.ReactNode,
    smallCard?: boolean,
    height?: number
}

export const CardGeneric = (props: ICardGeneric) => {
    return(
        <Card sx={{ margin: 3, backgroundColor: '#f8f8f8', boxShadow: '0 1px 8px 0 #9999, 0 2px 2px 0 #9999', height: props.height || undefined }}>
            <CardContent>
                <Box sx={{marginTop: props.smallCard ? 2 : 0}}>
                    <TitleCardGeneric title={props.title} disableBorder={props.smallCard} align={props.smallCard ? 'center' : 'left'} fontSize={props.smallCard ? 35 : undefined} />
                </Box>

                {props.children}
            </CardContent>
        </Card>
    )
}