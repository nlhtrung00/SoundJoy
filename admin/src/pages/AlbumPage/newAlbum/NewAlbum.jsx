import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle, FormLabel } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AsyncCreateAlbum, fetchAsyncAlbums } from "../../../Redux/Slice/AlbumSlice";
import React, { useState, useEffect } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";
import { getListGenres } from "../../../Redux/Slice/GenreSlice";
import DatePicker from "react-date-picker";
import Select from 'react-select';

const useStyles = makeStyles({
   datetimepicker: {
      margin: '5px 10px',

   },
   marginInput: {
      margin: '0 0 5px 0'
   }
})

const customStylesSelect = {
   menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
   }),


   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
   }
}

export default function NewAlbum() {
   const genres = useSelector(getListGenres);
   const [edited, setEdited] = useState(false);
   const [error, setError] = useState('');
   const [errorFileImage, setErrorFileImage] = useState(false);
   const [loading, setLoading] = useState(false);
   const [createResult, setResult] = useState(false);
   const [openToast, setOpen] = useState(false);
   const [previewImg, setPreviewImg] = useState();
   const [isFilePicked, setIsFilePicked] = useState(false);
   const history = useHistory();
   const [info, setInfo] = useState((
      {
         name: '',
         image: '',
         reactions: 0,
         debuted_date: new Date(),
         genre: ''
      }
   ))
   const dispatch = useDispatch();
   const classes = useStyles();

   const GenresOptions = genres.map((genre) => {
      return (
         { label: genre.name, value: genre._id }
      )
   })

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

   // // after create, let's fetch list album again to make it new
   useEffect(() => {
      dispatch(fetchAsyncAlbums());
      console.log(GenresOptions);
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

   const handleChangeSelectGenre = (data) => {
      const newdata = { ...info };
      newdata['genre'] = data.value;
      setInfo(newdata);
   }

   const handleSelectDate = (value) => {
      const newdata = { ...info };
      newdata['debuted_date'] = value;
      setInfo(newdata);

   }
   // handle when upload image
   const handleUpload = (e) => {
      const filesFormats = ["image/jpeg", "image/png"]
      const newImage = e.target.files[0];
      const isRightFormat = filesFormats.includes(newImage.type);
      if (isRightFormat) {
         const newdata = { ...info };
         newdata[e.target.id] = newImage;
         setInfo(newdata);
         setIsFilePicked(true);
         setEdited(true);
         setErrorFileImage(false);
      }
      else{
         setErrorFileImage(true);
      }
   }
   // handle create singer
   const handleCreate = async (e) => {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      formData.append('name', info.name);
      formData.append('image', info.image);
      formData.append('reactions', info.reactions);
      formData.append('debuted_date', info.debuted_date);
      formData.append('genre', info.genre);
      try {
         // create singer after then, fetch list again to update changed list
         const actionResult = await dispatch(AsyncCreateAlbum(formData));
         // fetch list album again after add, to make new 
         dispatch(fetchAsyncAlbums());
         const result = unwrapResult(actionResult);
         setResult(true);
         setOpen(true);
         setInfo(()=>(
            {
               name: '',
               image: '',
               reactions: 0,
               debuted_date: new Date(),
               genre: null
            }
         ))
      } catch (error) {
         console.log(error.message);
         setError(error.message)
         setResult(true);
         setOpen(true);
      }
      setLoading(false);
   }
   return (
      <Container component={Paper} elevation={4} sx={{ p: 1 }}>
         <Typography variant='h6'>
            Add more Album
         </Typography>

         <Grid container justifyContent="center" sx={{ p: 2 }} spacing={1}
         // alignItems="center"
         >
            <Grid item md={3} align='center'>
               <Avatar src={previewImg} alt='image of album' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
               <label htmlFor="image">
                  <Input accept="image/*" id="image" multiple type="file" sx={{ display: 'none', }} onChange={handleUpload} />
                  <Button variant="contained" component="span" size='small' sx={{ bgcolor: '#8a8a8a', '&:hover': { bgcolor: '#5c5c5c' } }}>
                     {isFilePicked ? 'Uploaded' : 'Upload'}
                     {/* Upload */}
                  </Button>
                  {errorFileImage ? <Typography sx={{ color: 'red' }}>
                     Please check your type of file (include '.jpg','.png','.JPGE')
                  </Typography> : <></>}

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
                     size='small'
                  />
                  <div >
                     <FormLabel sx={{ fontWeight: 500, color: 'black' }}>
                        Debuted date:
                     </FormLabel>
                     <DatePicker
                        required
                        format="dd/MM/y"
                        id='debuted_Date'
                        value={info.debuted_date}
                        onChange={handleSelectDate}
                        className={classes.datetimepicker}
                     />
                  </div>

                  <div className={classes.marginInput}>
                     <FormLabel sx={{ fontWeight: 500, color: 'black' }}>
                        Genre:
                     </FormLabel>
                     <Select required  styles={customStylesSelect} name='genre' options={GenresOptions} onChange={handleChangeSelectGenre} />
                  </div>
                  {edited && !loading && isFilePicked &&
                     <Button type='submit' variant='contained' sx={{ my: 1 }}>
                        Create
                     </Button>
                  }
                  {(!edited && !isFilePicked) && !loading &&
                     <Button disabled variant='contained' sx={{ my: 1 }}>
                        Create
                     </Button>
                  }
                  {edited && isFilePicked && loading &&
                     <Button disabled variant='contained' sx={{ my: 1 }}>
                        Loading..
                     </Button>
                  }

                  <Button onClick={history.goBack} variant='contained' sx={{ m: 1, bgcolor: '#176384', '&:hover': { bgcolor: '#1a769d' } }}>
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
                     You created successfully.
                     <Button onClick={history.goBack} size='small' variant='text' sx={{ color: 'white' }}>
                        Let's check !
                     </Button>
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
