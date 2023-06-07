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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Keyframes } from './DialogProviderError';

  
  interface DialogOptions {
    title: string | undefined;
    message?: string;
    secondMessage?: string,
    smallText?: boolean,
    titleButtonConfirm?: string,
    titleButtonCancel?: string
  }
  
  interface PromiseInfo {
    resolve: (value: boolean | PromiseLike<boolean>) => void;
    reject: (reason?: any) => void;
  }
  
  type ShowDialogHandler = (options: DialogOptions) => Promise<boolean>;
  
  // Create the context so we can use it in our App
  const DialogProviderResolveContext = createContext<ShowDialogHandler>(() => {
    throw new Error('Component is not wrapped with a DialogProviderResolveContext.');
  });
  
  const DialogProviderResolve: React.FC<{ children: React.ReactNode }> = ({
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
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth={false} sx={{}}>
          {options.title && <DialogTitle>{options.title}</DialogTitle>}
          <DialogContent style={{overflow: "hidden", width: '100%', height: options.secondMessage !== undefined ? '270px' : '230px', backgroundColor: '#008584'}}>
            <Grid container>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Box sx={{textAlign: 'center'}}>
                    <Keyframes>
                      <QuestionMarkIcon style={{width: '170px', height: '170px', color: 'white'}}/>
                    </Keyframes>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant='h5' sx={{fontWeight: options.secondMessage !== undefined ? 'bold' : 'bold', marginBottom: 1, fontFamily: 'verdana'}}  fontSize={options.smallText ? '23px' : '27px'} color={'white'}>{options.message}</Typography>
                        <Typography variant='h5'  sx={{}}  fontSize={options.smallText ? '23px' : '25px'} fontFamily= 'verdana' color={'white'}>{options.secondMessage}</Typography>
                    </Box>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" , backgroundColor: '#008584'}}>
            <Box sx={{margin: 2, marginBottom: 3, marginTop: 3, marginLeft: 4}}>
              <ButtonGeneric title={options.titleButtonCancel || "Cancelar"} type='button' onClick={handleCancel} typeIcon='vazio' backgroundColorHover={'#ffda48'} backgroundColor={'#FFD525'} color={'black'} />
              <ButtonGeneric title={options.titleButtonConfirm || "Confirmar"} type='button' onClick={handleConfirm} typeIcon='vazio' color={'black'} backgroundColorHover={'white'} backgroundColor={'#00cfcf'}/>
            </Box>
          </DialogActions>
        </Dialog>
        <DialogProviderResolveContext.Provider value={showDialog}>
          {children}
        </DialogProviderResolveContext.Provider>
      </>
    );
  };
  
  // By calling `useDialog()` in a component we will be able to use the `showDialog()` function
  export const useResolveDialog = () => {
    return useContext(DialogProviderResolveContext);
  };
  
  export default DialogProviderResolve;


     // const Keyframes = styled("div")({
    // textAlign: 'center',
    // "@keyframes pulsate": {
    //     from: {
    //     opacity: 0.5,
    //     transform: "scale(1.0)"
    //     },
    //     to: {
    //     opacity: 1,
    //     transform: "scale(1.2)"
    //     }
    // },
    // animation: "pulsate 1s",
    // });