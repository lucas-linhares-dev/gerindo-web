import { Card, CardContent, Grid } from "@mui/material"
import { TxtFieldForm } from "../TextField/TxtFieldForm"
import { TitleCardGeneric } from "../Typographys/TitleCardGeneric"

interface ICardGeneric {
    title: string,
    children: React.ReactNode
}

export const CardGeneric = (props: ICardGeneric) => {
    return(
        <Card sx={{ margin: 3, backgroundColor: '#f8f8f8', boxShadow: '0 1px 8px 0 #9999, 0 2px 2px 0 #9999' }}>
            <CardContent>
                <TitleCardGeneric title={props.title} />

                {props.children}
            </CardContent>
        </Card>
    )
}