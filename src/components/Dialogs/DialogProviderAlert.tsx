import { Box, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Keyframes } from './DialogProviderError';

type ShowAlertDialogHandler = (message: string, severity: AlertColor) => void; 

const DialogAlertContext = createContext<ShowAlertDialogHandler>(() => {
  console.error('Component is not wrapped with a DialogProviderAlert.');
});

const DialogProviderAlert: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  // const [severity, setSeverity] = useState<AlertColor>('success');
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showAlertDialog: ShowAlertDialogHandler = (message, severity) => {
    setMessage(message);
    // setSeverity(severity);
    setOpen(true);
  };

  useEffect(() => {
      setTimeout(function () {
        setOpen(false)
    }, 2500);
  })
  
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
        <DialogContent style={{overflow: "hidden", width: '100%', height: '300px', backgroundColor: 'white'}}>
          <Grid container>
            
              <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Box sx={{textAlign: 'center', marginTop: 2}}>
                  <Keyframes>
                  <CheckIcon style={{width: '170px', height: '170px', color: '#008584'}} />
                  </Keyframes>
                  </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Box sx={{textAlign: 'center', marginTop: 3, marginBottom: 4}}>
                      <Typography variant='h5'  fontSize='27px' fontWeight={'bold'} color={'#008584'} fontFamily={'verdana'}>{message}</Typography>
                  </Box>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" , backgroundColor: 'white'}}>
        </DialogActions>
      </Dialog>
      <DialogAlertContext.Provider value={showAlertDialog}>
        {children}
      </DialogAlertContext.Provider>
    </>
  );
};

export const useAlertDialog = () => {
  return useContext(DialogAlertContext);
};

export default DialogProviderAlert;
