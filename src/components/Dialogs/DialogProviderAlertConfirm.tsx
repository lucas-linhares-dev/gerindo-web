import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
  } from '@mui/material';
  import { createContext, useContext, useState } from 'react';
import { Typography } from '@mui/material';
import { ButtonGeneric } from '../Button/ButtonGeneric';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

  interface DialogOptions {
    title: string | undefined;
    message?: string;
    smallText?: boolean
  }
  
  interface PromiseInfo {
    resolve: (value: boolean | PromiseLike<boolean>) => void;
    reject: (reason?: any) => void;
  }
  
  type ShowDialogHandler = (options: DialogOptions) => Promise<boolean>;
  
  // Create the context so we can use it in our App
  const DialogProviderAlertConfirmContext = createContext<ShowDialogHandler>(() => {
    throw new Error('Component is not wrapped with a DialogProviderAlertConfirm.');
  });
  
  const DialogProviderAlertConfirm: React.FC<{ children: React.ReactNode }> = ({
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
          <DialogContent style={{overflow: "hidden", width: '100%', height: '230px', backgroundColor: '#FFD525', }}>
            <Grid container>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Box sx={{textAlign: 'center'}}>
                    {/* <img alt="AlertGifVerde" src={AlertGifVerde} style={{width: '170px', height: '170px'}} /> */}
                    {/* <QuestionMarkIcon style={{width: '170px', height: '170px'}} /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Box sx={{textAlign: 'center', marginBottom: 4}}>
                        <Typography variant='h5'  fontSize={options.smallText ? '23px' : '27px'} fontFamily={'verdana'} fontWeight={'bold'} color={'#00664C'}>{options.message}</Typography>
                    </Box>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" , backgroundColor: '#FFD525'}}>
            <Box sx={{ marginBottom: 3, marginTop: 3}}>
              <ButtonGeneric fullWidth title={"Entendi"} type='button' onClick={handleConfirm} typeIcon='vazio' backgroundColor={'#00664C'} colorHover='#00664C' backgroundColorHover={'white'}/>
            </Box>
          </DialogActions>
        </Dialog>
        <DialogProviderAlertConfirmContext.Provider value={showDialog}>
          {children}
        </DialogProviderAlertConfirmContext.Provider>
      </>
    );
  };
  
  // By calling `useDialog()` in a component we will be able to use the `showDialog()` function
  export const useAlertConfirmDialog = () => {
    return useContext(DialogProviderAlertConfirmContext);
  };
  
  export default DialogProviderAlertConfirm;