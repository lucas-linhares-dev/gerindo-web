import { Card, CardContent, Grid } from "@mui/material"
import { TxtFieldForm } from "../TextField/TxtFieldForm"
import { TitleCardGeneric } from "../Typographys/TitleCardGeneric"

interface ICardGeneric {
    title: string,
    children: React.ReactNode
}

export const CardGeneric = (props: ICardGeneric) => {
    return(
        <Card sx={{ margin: 3, backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <TitleCardGeneric title={props.title} />

                {props.children}
            </CardContent>
        </Card>
    )
}