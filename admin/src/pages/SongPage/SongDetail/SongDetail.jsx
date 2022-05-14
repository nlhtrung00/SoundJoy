import { Avatar, Box, CircularProgress, Snackbar, AlertTitle, Container, Grid, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GradeIcon from '@mui/icons-material/Grade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//import ReactAudioPlayer from 'react-audio-player';
import moment, { duration } from 'moment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comment from './Comment';
import { fetchAsyncGenres, getListGenres } from '../../../Redux/Slice/GenreSlice';
import { fetchAsyncSingers, getListSingers } from '../../../Redux/Slice/SingerSlice';
import { fetchAsyncMusicians, getListMusicians } from '../../../Redux/Slice/MusicianSlice';
import { fetchAsyncAlbums, getListAlbums } from '../../../Redux/Slice/AlbumSlice';
import { AsyncDeleteSongById, fetchAsyncSongById, fetchAsyncSongs, getSong } from '../../../Redux/Slice/SongSlice';
import { deleteSongInLikelist, fetchAsyncLikelistsBySong, getLikelistsBySong } from '../../../Redux/Slice/LikelistSlice';
import { deleteAsyncRatingSongBySong } from '../../../Redux/Slice/RatingSongSlice';
import { deleteAsyncListensBySong } from '../../../Redux/Slice/ListenSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
   home_container: {
      backgroundColor: 'white',
      minHeight: '100%',
      borderRadius: '20px',
      padding: '15px 20px',
   },

}));
const SongDetail = () => {
   const classes = useStyle();
   const history = useHistory();
   const { songId } = useParams();
   const dispatch = useDispatch();
   const genres = useSelector(getListGenres);
   const singers = useSelector(getListSingers);
   const musicians = useSelector(getListMusicians);
   const albums = useSelector(getListAlbums);
   const likelists = useSelector(getLikelistsBySong)
   const song = useSelector(getSong);
   const [loading, setLoading] = useState(true);
   const [time, setTime] = useState("0")
   const [errorDel, setErrorDel] = useState('');
   const [openToast, setOpenToast] = useState(false);
   const [actionDel, setActionDel] = useState(false);
   const [openDial, setOpenDial] = useState(false);
   useEffect(() => {
      const action = async () => {
         setLoading(true)
         await dispatch(fetchAsyncGenres());
         await dispatch(fetchAsyncSingers());
         await dispatch(fetchAsyncMusicians());
         await dispatch(fetchAsyncAlbums());
         await dispatch(fetchAsyncLikelistsBySong(songId))
         await dispatch(fetchAsyncSongById(songId));

      }
      action();
      setLoading(false)
   }, [songId, dispatch])
   console.log(likelists)
   const handleDeleteSong = async () => {
      console.log('delete song' + songId)
      try {

         // delete song after then, fetch list changed song
         let actionResult = await dispatch(AsyncDeleteSongById(songId));
         unwrapResult(actionResult);




         // set state to display toast message
         setActionDel(true);
         setOpenToast(true);
         // fetch list again
         await dispatch(fetchAsyncSongs());
         // back to previous page
         history.replace('/songs')
      }
      catch (err) {
         // set state to display toast message if error
         setErrorDel(err.message)
         setActionDel(true);
         setOpenToast(true);
      }

   }
   const handleOpenDial = () => {
      setOpenDial(true);
   };
   const handleCloseToast = () => {
      setOpenToast(false);
   }
   const handleCloseDial = () => {
      setOpenDial(false);
   };
   const handleLoadMetadata = (meta) => {
      const { duration } = meta.target;
      console.log(duration);
      const timee = moment.duration(duration, "seconds");
      setTime(timee.minutes() + " min " + (timee.seconds() < 10 ? '0' + timee.seconds() : timee.seconds()) + " sec")
   }
   return (
      <Container disableGutters maxWidth="xl" className={classes.home_container}>
         {
            loading ?
               <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
               :
               <Box className='info'>
                  <Grid container>
                     <Grid item md={2}>
                        <Box>
                           <img src={song.image ? song.image : ""} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                        </Box>
                     </Grid>
                     <Grid item md={9}>
                        <Box sx={{ ml: 2, }}>
                           <Typography sx={{
                              fontWeight: 600,
                              fontSize: '60px',
                              letterSpacing: '6px',
                              lineHeight: 1,
                              my: 0
                           }}>
                              {song.name}
                           </Typography>
                           <Typography sx={{
                              fontWeight: 400,
                              fontSize: '20px',

                              lineHeight: 1.3,
                              my: 0
                           }}>
                              {
                                 song.singer && song.singer.map((item, index) => {
                                    if (index < song.singer.length - 1) return (
                                       singers.find(singer => singer._id === item) ? singers.find(singer => singer._id === item).name + ", " : " none"
                                    )
                                    else return (
                                       singers.find(singer => singer._id === item).name
                                    )
                                 }

                                 )

                              }
                           </Typography>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PlayCircleIcon sx={{ color: 'blue', fontSize: 24, mr: 1 }} />
                              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                                 {time}
                              </Typography>

                           </Box>
                           <Typography sx={{ lineHeight: 2 }}>
                              <span style={{ fontWeight: 500 }}>Genres:</span>
                              {
                                 song.genre && genres && song.genre.map((item, index) => {
                                    if (index < song.genre.length - 1) {
                                       return (
                                          genres.find(genre => genre._id === item) ? genres.find(genre => genre._id === item).name + ", " : "none"
                                       )
                                    }
                                    else return (
                                       genres.find(genre => genre._id === item).name
                                    )
                                 }


                                 )

                              }
                           </Typography>
                           <Box sx={{ display: 'flex' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                 <GradeIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                                 <Typography>
                                    {song.rating >= 0 ? song.rating + "/5" : '0/5'}
                                 </Typography>
                              </Box>
                           </Box>

                        </Box>
                     </Grid>
                     <Grid item md={1}>
                        <Box sx={{ position: 'relative' }}>
                           <SpeedDial
                              ariaLabel="SpeedDial controlled"
                              sx={{ position: 'absolute', top: 0, right: 0 }}
                              icon={<MoreHorizIcon openicon={<MoreHorizIcon />} />}
                              direction='left'
                              onClose={handleCloseDial}
                              onOpen={handleOpenDial}
                              open={openDial}
                           >


                              <SpeedDialAction
                                 icon={<DeleteForeverIcon />}
                                 tooltipTitle="Delete"
                                 onClick={handleDeleteSong}
                              />

                           </SpeedDial>
                        </Box>

                     </Grid>
                  </Grid>
                  <Box className='media'>
                     <audio
                        controls
                        onLoadedMetadata={(e) => handleLoadMetadata(e)}
                        style={{ display: 'none' }}>
                        <source src={song.link_mp3} type="audio/mpeg" />
                     </audio>
                  </Box>
                  <Box>
                     <Typography sx={{ fontWeight: 500, fontSize: 19, my: 1 }}>
                        Comment
                     </Typography>
                     <Comment song={song} />
                  </Box>

                  <Box>
                     {actionDel && !errorDel ?
                        <Box>
                           <Snackbar
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              open={openToast}
                              autoHideDuration={4000}
                              onClose={handleCloseToast}
                           >
                              <MuiAlert elevation={6} severity="success" variant="filled" >
                                 <AlertTitle>Success</AlertTitle>
                                 You removed singer successfully.Let's check !

                              </MuiAlert>
                           </Snackbar>
                        </Box> :
                        <Box>
                           <Snackbar
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              open={openToast}
                              autoHideDuration={4000}
                              onClose={handleCloseToast}
                           >
                              <MuiAlert elevation={6} severity="error" variant="filled" >
                                 <AlertTitle>Error</AlertTitle>
                                 {errorDel}
                              </MuiAlert>
                           </Snackbar>
                        </Box>}
                  </Box>
               </Box>

         }




      </Container>
   );
};

export default SongDetail;