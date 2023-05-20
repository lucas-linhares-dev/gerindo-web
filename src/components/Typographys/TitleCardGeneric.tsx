import { Typography } from "@mui/material"

interface ITitleCardGeneric {
    title: string
}


export const TitleCardGeneric = (props: ITitleCardGeneric) => {

    return(
        <Typography variant="h5" sx={{ marginBottom: 2, fontSize: 30, fontFamily: 'Kanit, sans-serif;' ,fontWeight: '1000', borderBottom: 'solid 1px #008585', color: '#008584', }}>
            {props.title}
        </Typography>
    )
}