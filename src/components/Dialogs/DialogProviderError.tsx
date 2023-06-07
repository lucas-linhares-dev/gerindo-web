import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
  } from '@mui/material';
  import { createContext, useContext, useState } from 'react';
import { Typography, styled } from '@mui/material';
import { ButtonGeneric } from '../Button/ButtonGeneric';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

  
  interface DialogOptions {
    title: string | undefined;
    message?: string;
  }
  
  interface PromiseInfo {
    resolve: (value: boolean | PromiseLike<boolean>) => void;
    reject: (reason?: any) => void;
  }
  
  type ShowDialogHandler = (options: DialogOptions) => Promise<boolean>;
  
  // Create the context so we can use it in our App
  const DialogProviderErrorContext = createContext<ShowDialogHandler>(() => {
    throw new Error('Component is not wrapped with a DialogProvider.');
  });
  
  const DialogProviderError: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<DialogOptions>({
      title: '',
    });
    const [promiseInfo, setPromiseInfo] = useState<PromiseInfo>();
    const showDialog: ShowDialogHandler = (options) => {
      // When the dialog is shown, keep the promise info so we can resolve later
      return new Promise<boolean>((resolve, reject) => {
        setPromiseInfo({ resolve, reject });
        setOptions(options);
        setOpen(true);
      });
    };
    const handleConfirm = () => {
      // if the Confirm button gets clicked, resolve with `true`
      setOpen(false);
      promiseInfo?.resolve(true);
      setPromiseInfo(undefined);
    };
    const handleCancel = () => {
      // if the dialog gets canceled, resolve with `false`
      setOpen(false);
      promiseInfo?.resolve(false);
      setPromiseInfo(undefined);
    };
      

    return (
      <>
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth={false}>
          {options.title && <DialogTitle>{options.title}</DialogTitle>}
          <DialogContent style={{overflow: "hidden", width: '100%', height: '230px', backgroundColor: '#6d0000'}}>
            <Grid container>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Keyframes>
                        <ReportGmailerrorredIcon style={{width: 130, height: 130, color: 'white'}} />
                    </Keyframes>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Box sx={{textAlign: 'center', marginTop: 3, marginBottom: 4}}>
                        <Typography variant='h5'  fontSize='25px' fontWeight={'bold'} color={'white'} fontFamily={'verdana'}>{options.message}</Typography>
                    </Box>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", backgroundColor: '#6d0000'}}>
            <Box sx={{marginBottom: 2}}>
                <ButtonGeneric title={"Entendi"} type='button' color={"#6d0000"} backgroundColor={'white'} backgroundColorHover={'white'} fullWidth onClick={handleConfirm} typeIcon='vazio' />
            </Box>
          </DialogActions>
        </Dialog>
        <DialogProviderErrorContext.Provider value={showDialog}>
          {children}
        </DialogProviderErrorContext.Provider>
      </>
    );
  };
  
  // By calling `useDialog()` in a component we will be able to use the `showDialog()` function
  export const useErrorDialog = () => {
    return useContext(DialogProviderErrorContext);
  };

  export const Keyframes = styled("div")({
    textAlign: 'center',
    "@keyframes pulsate": {
        from: {
        opacity: 0.5,
        transform: "scale(1.0)"
        },
        to: {
        opacity: 1,
        transform: "scale(1.2)"
        }
    },
    animation: "pulsate 1s",
    });
  
  export default DialogProviderError;