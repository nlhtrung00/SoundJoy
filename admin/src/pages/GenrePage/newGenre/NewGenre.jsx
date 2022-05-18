import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { fetchAsyncGenres, AsyncCreateGenre } from "../../../Redux/Slice/GenreSlice";
import React, { useState, useEffect, createRef } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";

export default function NewGenre() {
   const [edited, setEdited] = useState(false);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [createResult, setResult] = useState(false);
   const [openToast, setOpen] = useState(false);
   const [previewImg, setPreviewImg] = useState();
   const [isFilePicked, setIsFilePicked] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const [info, setInfo] = useState((
      {
         name: '',
         image: ''
      }
   ))
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

   // // after create, let's fetch list genre again to make it new
   // useEffect(() => {
   //    dispatch(fetchAsyncGenres());
   // }, [createResult])

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
   const handleCreate = async (e) => {
      e.preventDefault();

      let formData = new FormData();
      formData.append('name', info.name);
      formData.append('image', info.image);
      try {
         // create singer after then, fetch list again to update changed list
         const actionResult = await dispatch(AsyncCreateGenre(formData));
         // fetch list genre again after add, to make new 
         dispatch(fetchAsyncGenres());
         const result = unwrapResult(actionResult);
         setResult(true);
         setOpen(true);
         setInfo(()=>(
            {
               name: '',
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
   return (
      <Container  elevation={4} sx={{ p: 1,height:'100%' }}>
         <Typography variant='h6'>
            Add more Genre
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
                  {edited && !loading &&
                     <Button type='submit' variant='contained' sx={{ my: 0.5 }}>
                        Create
                     </Button>
                  }
                  {(!edited && !isFilePicked) && !loading &&
                     <Button disabled variant='contained' sx={{ my: 0.5 }}>
                        Create
                     </Button>
                  }
                  {edited && isFilePicked && loading &&
                     <Button disabled variant='contained' sx={{ my: 0.5 }}>
                        Loading..
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
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
