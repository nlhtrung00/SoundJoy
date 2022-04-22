import React, { useState, useEffect, createRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Avatar, FormLabel, CircularProgress, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { unwrapResult } from "@reduxjs/toolkit";
import { AsyncCreateSong, fetchAsyncSongs } from "../../../Redux/Slice/SongSlice";
import DatePicker from 'react-date-picker';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Select from 'react-select';
import { getListMusicians } from "../../../Redux/Slice/MusicianSlice";
import { getListSingers } from "../../../Redux/Slice/SingerSlice";
import { getListGenres } from "../../../Redux/Slice/GenreSlice";
import { getListAlbums } from "../../../Redux/Slice/AlbumSlice";
const useStyles = makeStyles({
   datetimepicker: {
      margin: '5px 10px',

   },
   marginInput: {
      margin: '5px 0'
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
export default function NewSong() {
   const singers = useSelector(getListSingers);
   const musicians = useSelector(getListMusicians);
   const albums = useSelector(getListAlbums);
   const genres = useSelector(getListGenres);
   const [edited, setEdited] = useState(false);
   const [error, setError] = useState('');
   const [errorFileImage, setErrorFileImage] = useState(false);
   const [errorFileMP3, setErrorFileMP3] = useState(false);
   const [createResult, setResult] = useState(false);
   const [openToast, setOpen] = useState(false);
   const [previewImg, setPreviewImg] = useState();
   const [loading, setLoading] = useState(false);
   const [info, setInfo] = useState((
      {
         name: '',
         listens: 0,
         debuted_date: new Date(),
         image: null,
         musician: [],
         singer: [],
         album: '',
         genre: '',
         mp3: null
      }
   ))
   const [isMp3Picked, setIsMp3Picked] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();
   const classes = useStyles();


   const defaultSeclectValue = { label: `Let's choose`, value: 0 }
   const SingerOptions = singers.map((singer) => {
      return (
         { label: singer.name, value: singer._id }
      )
   })
   const MusiciansOptions = musicians.map((musician) => {
      return (
         { label: musician.name, value: musician._id }
      )
   })
   const GenresOptions = genres.map((genre) => {
      return (
         { label: genre.name, value: genre._id }
      )
   })
   const AlbumsOptions = albums.map((album) => {
      return (
         { label: album.name, value: album._id }
      )
   })
   useEffect(() => {
      console.log('upload effect');
      console.log(info.image)
      if (!info.image) {
         setPreviewImg(undefined);
         return
      }
      const objectURL = URL.createObjectURL(info.image);
      setPreviewImg(objectURL);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectURL);
   }, [info.image])

   // fetch list songs again after create song
   useEffect(() => {
      dispatch(fetchAsyncSongs());
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
      setEdited(true)
   }
   const handleChangeSelectSinger = (value) => {
      const newdata = { ...info };
      const array = value.split(",");
      newdata['singer'] = array;
      setInfo(newdata);
   }
   const handleChangeSelectMusician = (value) => {
      const newdata = { ...info };
      const array = value.split(",");
      newdata['musician'] = array;
      setInfo(newdata);

   }
   const handleChangeSelectGenre = (data) => {
      const newdata = { ...info };
      newdata['genre'] = data.value;
      setInfo(newdata);

   }
   const handleChangeSelectAlbum = (data) => {
      const newdata = { ...info };
      newdata['album'] = data.value;
      setInfo(newdata);

   }
   const handleSelectDate = (value) => {
      const newdata = { ...info };
      newdata['debuted_date'] = value;
      setInfo(newdata);

   }
   // handle when upload image and song mp3
   const handleUploadImage = (e) => {
      const filesFormats = ["image/jpeg", "image/png"]
      const newFile = e.target.files[0];
      if(newFile){
         const isRightFormat = filesFormats.includes(newFile.type);
         if (isRightFormat) {
            const newdata = { ...info }
            newdata[e.target.id] = newFile;
            setInfo(newdata);
            setEdited(true);
            setErrorFileImage(false)
         }
         else {
            setErrorFileImage(true)
         }
      }
      
      
   }
   const handleUploadMP3 = (e) => {
      const filesFormats = ["audio/mpeg"]
      const newFile = e.target.files[0];
      if(newFile){
         const isRightFormat = filesFormats.includes(newFile.type);
         if (isRightFormat) {
            const newdata = { ...info }
            newdata[e.target.id] = newFile;
            setInfo(newdata);
            setIsMp3Picked(true);
            setEdited(true);
            setErrorFileMP3(false)
         }
         else {
            setErrorFileMP3(true)
         }
      }
      
   }

   // handle create singer
   const handleCreate = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      var checkright =true;
      let formData = new FormData();
      formData.append('name', info.name);
      formData.append('listens', info.listens);
      formData.append('debuted_date', info.debuted_date);
      formData.append('image', info.image ? info.image : 'https://thumbs.dreamstime.com/b/male-avatar-profile-picture-silhouette-34443055.jpg');
      info.album && formData.append('album', info.album);
      
      formData.append('mp3', info.mp3);
      if(info.musician.length>0 && info.singer.length>0 && info.genre){
         formData.append('genre', info.genre);
         Array.from(info.musician).map((value, index) => {
            formData.append('musician', value);
         })
         Array.from(info.singer).map((value, index) => {
            formData.append('singer', value);
         })
      }
      else{
         checkright=false;
      }
      
      if (checkright) {
         try {
            let actionResult = await dispatch(AsyncCreateSong(formData));
            let result = unwrapResult(actionResult);
            setResult(true);
            setOpen(true);
            setInfo(() => (
               {
                  name: '',
                  listens: 0,
                  debuted_date: new Date(),
                  image: null,
                  musician: [],
                  singer: [],
                  album: '',
                  genre: '',
                  mp3: null
               }
            ))
         } catch (error) {
            console.log(error.message);
            setError(error.message)
            setResult(true);
            setOpen(true);
         }
      }
      else {
         setError('Please fill required field')
         setOpen(true);
      }


      setLoading(false);


   }
   console.log(info)
   return (
      <Container component={Paper} elevation={4} sx={{ p: 1 }}>
         <Typography variant='h6'>
            Add more Song
         </Typography>

         <Grid container justifyContent="center" sx={{ p: 2 }} spacing={1}
         // alignItems="center"
         >
            <Grid item md={3} align='center'>
               <Avatar src={previewImg} alt='image of singer' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
               <label htmlFor="image">
                  <Input accept="image/*" id="image" multiple type="file" sx={{ display: 'none', }} onChange={handleUploadImage} />
                  <Button variant="contained" component="span" size='small' sx={{ bgcolor: '#8a8a8a', '&:hover': { bgcolor: '#5c5c5c' } }}>
                     Upload
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
                  <div>
                     <FormLabel sx={{ fontWeight: 500, color: 'black' }}>
                        Debuted date *:
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
                        Singers *:
                     </FormLabel>
                     <MultiSelect
                        required
                        placeholder='select singer'
                        name='singer'
                        onChange={handleChangeSelectSinger}
                        options={SingerOptions}
                        value={info.singer}
                     />
                  </div>
                  <div className={classes.marginInput}>
                     <FormLabel sx={{ fontWeight: 500, color: 'black' }}>
                        Musicians *:
                     </FormLabel>
                     <MultiSelect
                        required
                        placeholder='select musicians'
                        name='musician'
                        onChange={handleChangeSelectMusician}
                        options={MusiciansOptions}

                     />
                  </div>
                  <div className={classes.marginInput}>
                     <FormLabel sx={{ fontWeight: 500, color: 'black' }}>
                        Genre *:
                     </FormLabel>
                     <Select required styles={customStylesSelect} name='genre' options={GenresOptions} onChange={handleChangeSelectGenre} />
                  </div>
                  <div className={classes.marginInput}>
                     <FormLabel sx={{ fontWeight: 500, color: 'black' }}>
                        Album:
                     </FormLabel>
                     <Select required styles={customStylesSelect} name='album'
                        options={AlbumsOptions} onChange={handleChangeSelectAlbum} />
                  </div>

                  <div className={classes.marginInput}>
                     <label htmlFor="mp3">
                        <Input required accept="mp3/*" id="mp3" multiple type="file" sx={{ display: 'none', }} onChange={handleUploadMP3} />
                        <Button variant="contained" component="span" size='small' sx={{ bgcolor: '#242424', '&:hover': { bgcolor: '#1a1a1a' } }}>
                           Upload
                        </Button>
                        {errorFileMP3 ?
                           <Typography sx={{ color: 'red' }}>
                              Please check your type of file (include '.mp3')
                           </Typography> :
                           <></>
                        }
                        {info.link_mp3 ?
                           <Typography sx={{ display: 'inline', ml: 1 }}>
                              Filename: {info.mp3.name}
                           </Typography> : <>
                           </>
                        }



                     </label>
                  </div>

                  {edited && isMp3Picked && !loading &&
                     <Button type='submit' variant='contained' sx={{ my: 1 }}>
                        Create
                     </Button>
                  }
                  {(!edited || !isMp3Picked) && !loading &&
                     <Button type='submit' disabled variant='contained' sx={{ my: 1 }}>
                        Create
                     </Button>
                  }

                  {loading &&
                     <Button type='submit' disabled variant='contained' sx={{ my: 1 }}>
                        Loading...
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
