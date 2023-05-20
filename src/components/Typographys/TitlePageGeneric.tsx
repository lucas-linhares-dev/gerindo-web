import { Box, Typography } from "@mui/material"

interface ITitleCardGeneric {
    title: string
}


export const TitlePageGeneric = (props: ITitleCardGeneric) => {

    return(
        <Box sx={{backgroundColor: '#006666', height: '70px'}}>
            <Typography variant="h5" align="center" sx={{ marginTop: 2, marginBottom: 2, fontSize: 30, fontFamily: 'Kanit, sans-serif;' ,fontWeight: '1000', color: '#f5f5f5'}}>
            {props.title}
        </Typography>
        </Box>

    )
}