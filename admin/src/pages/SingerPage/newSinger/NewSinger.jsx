import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AsyncCreateSinger, fetchAsyncSingers } from "../../../Redux/Slice/SingerSlice";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import React, { useState, useEffect, createRef } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";



export default function NewSinger() {
   const [edited, setEdited] = useState(false);
   const [error, setError] = useState('');
   const [createResult, setResult] = useState(false);
   const [openToast, setOpen] = useState(false);
   const [previewImg, setPreviewImg] = useState();
   const [info, setInfo] = useState((
      {
         name: '',
         information: '',
         followers: 0,
         image: ''
      }
   ))
   const [image, setImage] = useState(null);
   const [isFilePicked, setIsFilePicked] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();
   useEffect(() => {
      if (!image) {
         setPreviewImg(undefined);
         return
      }
      const objectURL = URL.createObjectURL(image);
      setPreviewImg(objectURL);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectURL);
   }, [image])

   // fetch list singer again after add singer
   useEffect(() => {
      dispatch(fetchAsyncSingers());
   }, [createResult])
   // close toast message
   const handleCloseToast = () => {
      setOpen(false);
   }
   // change value when input
   const handleInput = (e) => {
      setEdited(true);
      const newdata = { ...info };
      newdata[e.target.id] = e.target.value;
      setInfo(newdata);
   }
   // handle when upload image
   const handleUpload = (e) => {
      const newImage = e.target.files[0];
      if (newImage) {
         setImage(newImage);
         setIsFilePicked(true);
         setEdited(true)
      }
   }
   // handle create singer
   const handleCreate = async (e) => {
      e.preventDefault();
      if (image) {
         let formData = new FormData();
         formData.append('name', info.name);
         formData.append('information', info.information);
         formData.append('followers', info.followers);
         formData.append('image', image);
         try {
            const actionResult = await dispatch(AsyncCreateSinger(formData));
            const result = unwrapResult(actionResult);
            setResult(true);
            setOpen(true);
         } catch (error) {
            console.log(error.message);
            setError(error.message)
            setResult(true);
            setOpen(true);
         }


      }


   }
   return (
      <Container component={Paper} elevation={4} sx={{ p: 1 }}>
         <Typography variant='h6'>
            Add more Singer
         </Typography>

         <Grid container justifyContent="center" sx={{ p: 2 }}
         // alignItems="center"
         >
            <Grid item md={3} align='center'>
               <Avatar src={previewImg} alt='image of singer' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
               <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" sx={{ display: 'none', }} onChange={handleUpload} />
                  <Button variant="contained" component="span" size='small' sx={{ bgcolor: '#8a8a8a', '&:hover': { bgcolor: '#5c5c5c' } }}>
                     {isFilePicked ? 'Uploaded' : 'Upload'}
                     {/* Upload */}
                  </Button>
                  {image ?
                     <Typography>
                        Filename: {image.name}
                     </Typography> :
                     <></>
                  }

               </label>
            </Grid>
            <Grid item md={9}>
               <form onSubmit={handleCreate} encType="multipart/form-data">
                  <TextField
                     id='name'
                     label='Name'
                     type='text'
                     value={info.name}
                     fullWidth
                     sx={{ my: 0.5 }}
                     onChange={handleInput}
                     required
                  />
                  <TextField
                     id='information'
                     label='Information'
                     type='text'
                     fullWidth
                     multiline
                     minRows={4}
                     maxRows={5}
                     value={info.information}
                     sx={{ my: 0.5 }}
                     onChange={handleInput}
                     required
                  />
                  {edited && isFilePicked ?
                     <Button type='submit' variant='contained' sx={{ my: 0.5 }}>
                        Create
                     </Button>
                     : <Button type='submit' disabled variant='contained' sx={{ my: 0.5 }}>
                        Create
                     </Button>

                  }
                  <Button onClick={history.goBack} variant='contained' sx={{ m: 0.5, bgcolor: '#176384', '&:hover': { bgcolor: '#1a769d' } }}>
                     Back
                  </Button>
               </form>
            </Grid>
         </Grid>
         {createResult && !error ?
            <Box>
               <Snackbar
                  open={openToast}
                  autoHideDuration={6000}
                  onClose={handleCloseToast}
               >
                  <MuiAlert elevation={6} severity="success" variant="filled" >
                     <AlertTitle>Success</AlertTitle>
                     You created successfully.
                     <Button onClick={history.goBack} variant='text' sx={{ color: 'white' }}>
                        Let's check !
                     </Button>
                  </MuiAlert>
               </Snackbar>
            </Box> :
            <Box>
               <Snackbar
                  open={openToast}
                  autoHideDuration={6000}
                  onClose={handleCloseToast}
               >
                  <MuiAlert elevation={6} severity="error" variant="filled" >
                     <AlertTitle>Error</AlertTitle>
                     {error}
                  </MuiAlert>
               </Snackbar>
            </Box>}
      </Container>
   );
}
