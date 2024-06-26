import { Typography } from "@mui/material"

interface ITitleCardGeneric {
    title: string,
    align?: string,
    disableBorder?: boolean,
    fontSize?: number
}


export const TitleCardGeneric = (props: ITitleCardGeneric) => {

    return(
        <Typography variant="h5" sx={{ marginBottom: 2, fontSize: props.fontSize || 30, fontFamily: 'Kanit, sans-serif;' ,fontWeight: '1000', textAlign: props.align || 'left' ,borderBottom: !props.disableBorder ? 'solid 1px #008585' : 'none', color: '#008584', }}>
            {props.title}
        </Typography>
    )
}