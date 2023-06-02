import { IconButton, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import {InputAdornment} from  '@mui/material'
import { decimalDigitsMask, formatCEPMask, formatCNPJMask, formatCPFMask, formatPhone } from "../helpers/masks";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface ITxtFieldForm {
    name: string,
    control: any,
    error?: any,
    label: string,
    readOnly?: boolean,
    onBlur?: any,
    type?: string,
    borderWidth?: number
    mask?: string,
    textAlign?: any
}

export const TxtFieldForm = ( props : ITxtFieldForm) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value } }) => (
                <>
                    <TextField
                        focused = {props.type === 'date' ? true : this}
                        inputProps={{
                            style: { textAlign: props.textAlign || "left"},    
                        }}
                        InputProps={{ 
                            style: { fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' },
                            endAdornment: (
                                <InputAdornment position="end">

                                  { props.type === 'password' && 
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                  >
                                    {showPassword ? <Visibility sx={{color: "#008584"}} /> : <VisibilityOff sx={{color: "#006666"}} />}
                                  </IconButton>
                                  }

                                </InputAdornment>
                            )
                        
                        }}
                        InputLabelProps={{ style: { color: props.error ? "#df2320" : "#008584", fontSize: '1.2rem', fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' } }} 
                        sx={{
                            width: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor:props.error ? "#e20400" : "#008584",
                                    borderWidth: props.borderWidth || 1,
                                    fontSize: '1.16rem',
                                },
                                '&:hover fieldset': {
                                    borderColor: props.error ? "#e20400" : "#008584",
                                    
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: props.error ? "#e20400" : "#008584",
                                },
                            },
                            '& input[type=number]': {
                                'MozAppearance': 'textfield'
                            },
                            '& input[type=number]::-webkit-outer-spin-button': {
                                'WebkitAppearance': 'none',
                                margin: 0
                            },
                            '& input[type=number]::-webkit-inner-spin-button': {
                                'WebkitAppearance': 'none',
                                margin: 0
                            }
                        }}
                        value={value || ""}
                        type= {props.type === 'password' ? (showPassword ? "text" : "password") : (props.type || 'text')}
                        label={props.label}
                        onChange={(e) => {
                            let value = e.target.value
                        

                            if(props.type === 'decimal'){
                                value = decimalDigitsMask(value, 2)
                            }
                            if(props.mask === 'cpf'){
                                value = formatCPFMask(value)
                                // console.log(value)
                            }
                            if(props.mask === 'cnpj'){
                                value = formatCNPJMask(value)
                            }
                            if(props.mask === 'telefone'){
                                value = formatPhone(value)
                            }
                            if(props.mask === 'cep'){
                                value = formatCEPMask(value)
                            }

                            onChange(value)
                        }}
                        onBlur={props.onBlur || undefined}
                        variant="outlined"
                        disabled={props.readOnly || false} />

                    {props.error ? (
                        <div className="error" style={{}}>
                            <Typography sx={{ color: "#e20400", fontSize: '0.9em' }}>
                                {'*'+props.error}
                            </Typography>
                        </div>
                    ) : null}
                </>
            )}
        />
    )
}
