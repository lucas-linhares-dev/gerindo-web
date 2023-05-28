import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


const imageInputStyles = {
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '150px',
    height: '150px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  input: {
    display: 'none',
  },
  iconButton: {
    color: '#888',
  },
};

interface IInputImage {
    image: any,
    setImage: any
}

export const InputImage = (props: IInputImage) => {
  const image = props.image
  const setImage = props.setImage
  const [fileInputKey, setFileInputKey] = useState(Date.now());


  const handleImageChange = (event: any) => {
    console.log(image)
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
    { image && 
    <Box sx={{textAlign: 'center'}}>
        <IconButton component="label" htmlFor="image" onClick={() => {setImage(null) ; setFileInputKey(Date.now())}}>
            <Tooltip title={'Excluir foto'}>
                <CloseIcon sx={{color: 'red', }}/>
            </Tooltip>
        </IconButton>
    </Box>
    }
    <div style={imageInputStyles.inputWrapper}>
      {image ? (
        <img src={URL.createObjectURL(image)} alt="Imagem" width="100%" height="100%" />
      ) : (
        <IconButton style={imageInputStyles.iconButton} component="label" htmlFor="image">
            <Tooltip title={'Carregar foto'}>
                <SearchIcon fontSize="large" />
            </Tooltip>
        </IconButton>
      )}
      <input
        accept="image/*"
        key={fileInputKey}
        style={imageInputStyles.input}
        id="image"
        type="file"
        onChange={handleImageChange}
      />
    </div>

    </>
  );
};

