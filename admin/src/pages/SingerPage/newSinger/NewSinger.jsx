
import { useSelector, useDispatch } from "react-redux";
import { AsyncCreateSinger, fetchAsyncSingers } from "../../../Redux/Slice/SingerSlice";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import React, { useState, useEffect, createRef } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";



export default function NewSinger() {
   const navigate = useNavigate()
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
   const [isFilePicked, setIsFilePicked] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!info.image) {
         setPreviewImg(undefined);
         return
      }
      const objectURL = URL.createObjectURL(info.image);
      setPreviewImg(objectURL);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectURL);
   }, [info.image])

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
         const newdata = { ...info };
         newdata[e.target.id] = newImage;
         setInfo(newdata);
         setIsFilePicked(true);
         setEdited(true)
      }
   }
   // handle create singer
   const handleCreate = async(e) => {
      e.preventDefault();
      if (info.image) {
         let formData = new FormData();
         formData.append('name', info.name);
         formData.append('information', info.information);
         formData.append('followers', info.followers);
         formData.append('image', info.image);
         try {
            // create singer after then, fetch list again to update changed list
            const actionResult =await dispatch(AsyncCreateSinger(formData));
            dispatch(fetchAsyncSingers());
            const result = unwrapResult(actionResult);
            setResult(true);
            setOpen(true);
            setInfo(()=>(
               {
                  name: '',
                  information: '',
                  followers: 0,
                  image: ''
               }
            ))
         } catch (error) {
            console.log(error.message);
            setError(error.message)
            setResult(true);
            setOpen(true);
         }


      }


   }
   return (
      <Container component={Paper} maxWidth='xl'  sx={{height:'100%',pt:1}}>
         <Typography variant='h6'>
            Add more Singer
         </Typography>

         <Grid container justifyContent="center" sx={{ p: 2 }}
         // alignItems="center"
         >
            <Grid item md={3} align='center'>
               <Avatar src={previewImg} alt='image of singer' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
               <label htmlFor="image">
                  <Input accept="image/*" id="image" multiple type="file" sx={{ display: 'none', }} onChange={handleUpload} />
                  <Button variant="contained" component="span" size='small' sx={{ bgcolor: '#8a8a8a', '&:hover': { bgcolor: '#5c5c5c' } }}>
                     {isFilePicked ? 'Uploaded' : 'Upload'}
                     {/* Upload */}
                  </Button>
                  

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
                  <Button onClick={()=>navigate(-1)} variant='contained' sx={{ m: 0.5, bgcolor: '#176384', '&:hover': { bgcolor: '#1a769d' } }}>
                     Back
                  </Button>
               </form>
            </Grid>
         </Grid>
         {createResult && !error ?
            <Box>
               <Snackbar
                  anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
                  open={openToast}
                  autoHideDuration={6000}
                  onClose={handleCloseToast}
               >
                  <MuiAlert elevation={6} severity="success" variant="filled" >
                     <AlertTitle>Success</AlertTitle>
                     You created successfully.Let's check !
                     
                  </MuiAlert>
               </Snackbar>
            </Box> :
            <Box>
               <Snackbar
                  anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
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
