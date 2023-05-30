import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Controller } from 'react-hook-form';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



interface IInputImage {
  control: any,
  setValue: any,
  width?: string,
  height?: string
}

export const InputImage = (props: IInputImage) => {

  const control = props.control
  const setValue = props.setValue
  const width = props.width
  const height = props.height
  
  async function handleImgChange(e: any) {
    getBase64(e)
}

async function getBase64(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setValue('foto', reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, ""))
    }
    reader.onerror = function () {
        setValue('foto', null)
    }
}

  return (
    <>
      <Controller
        name={'foto'}
        control={control}
        render={({ field: { value } }) =>
          value ?
            <Box position={'relative'} sx={{ width: width || '200px', height: height || '200px', marginBottom: 1 }}>
              <Box
                component="img"
                borderRadius="5%"
                display='block'
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: width || '200px',
                  height: height || '200px',
                }}
                alt=""
                src={'data:image/png;base64,' + value} onClick={() => document.getElementById("icon-button-file")?.click()} />
              <input accept="image/*" style={{ visibility: 'hidden' }} id="icon-button-file" type="file" onChange={handleImgChange} />
              <Box position='absolute' top='0' left='0'>

                <Tooltip title="Deletar">
                  <IconButton
                    color="error"
                    style={{
                      transform: 'translate(0%, 0%)'
                    }}
                    onClick={() => {
                      setValue('foto', null);
                    }}>
                    <HighlightOffIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            :
            <Box paddingBottom={'30px'} sx={{ width: width || '200px', height: height || '200px', marginBottom: 1 }} >
              <Box display={"flex"}
                justifyContent="center"
                margin={"auto"}
                alignItems="center"
                borderRadius="5%" sx={{
                  backgroundColor: '#eeeeee',
                  width: width || '200px',
                  height: height || '200px'
                }}>
                <input accept="image/*" style={{ visibility: 'hidden' }} id="icon-button-file" type="file" onChange={handleImgChange} />
                <label htmlFor="icon-button-file"
                  style={{
                    position: 'absolute',
                    transform: 'translate(0%, 0%)'
                  }}>
                  <Tooltip title="Carregar foto">
                    <IconButton
                      onClick={() => document.getElementById("icon-button-file")?.click()}>
                      <FindInPageIcon />
                    </IconButton>
                  </Tooltip>
                </label>
              </Box>
            </Box>
        }
      />
    </>
  );
};

