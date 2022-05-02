import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GradeIcon from '@mui/icons-material/Grade';
//import ReactAudioPlayer from 'react-audio-player';
import moment, { duration } from 'moment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comment from './Comment';
import { fetchAsyncMusicians, getListMusicians } from '../../../Redux/Slice/MusicianSlice';
import { fetchAsyncAlbums, getListAlbums } from '../../../Redux/Slice/AlbumSlice';
import { fetchAsyncSongById, getSong } from '../../../Redux/Slice/SongSlice';
import { fetchAsyncGenres, getListGenres } from '../../../Redux/Slice/GenreSlice';
import { fetchAsyncSingers, getListSingers } from '../../../Redux/Slice/SingerSlice';

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
   const { songId } = useParams();
   const dispatch = useDispatch();
   const genres = useSelector(getListGenres);
   const singers = useSelector(getListSingers);
   const musicians = useSelector(getListMusicians);
   const albums = useSelector(getListAlbums);
   const song = useSelector(getSong);
   console.log(song)
   const [time, setTime] = useState(0)
   useEffect(() => {
      dispatch(fetchAsyncSongById(songId));
      dispatch(fetchAsyncGenres());
      dispatch(fetchAsyncSingers());
      dispatch(fetchAsyncMusicians());
      dispatch(fetchAsyncAlbums());
   }, [songId, dispatch])
   // const handleLoadMetadata = (meta) => {
   //    const { duration } = meta.target;
   //    console.log(duration);
   //    const timee = moment.duration(duration, "seconds");
   //    setTime(timee.minutes() + " min " + (timee.seconds() < 10 ? '0' + timee.seconds() : timee.seconds()) + " sec")
   // }
   return (
      <Container disableGutters maxWidth="xl" className={classes.home_container}>

         <Box className='head-info'>
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
                        fontSize: '30px',
                        letterSpacing: '8px',
                        lineHeight: 1.3,
                        my: 0
                     }}>
                        {
                           song.singer && song.singer.map(item => (
                              singers.find(singer => singer._id === item).name
                           ))

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
                           song.genre && song.genre.map(item => (
                              genres.find(genre => genre._id === item).name
                           ))

                        }
                     </Typography>
                     <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <GradeIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                           <Typography>
                              {song.rating ? song.rating : '0/10'}
                           </Typography>
                        </Box>
                     </Box>

                  </Box>
               </Grid>
               <Grid item md={1}>
                  <Box>
                     <MoreHorizIcon sx={{ fontSize: 30 }} />
                  </Box>

               </Grid>
            </Grid>
            {/* <Box className='audio player' sx={{ my: 2, display: 'flex', alignItems: 'center', p: 1.5, justifyContent: 'space-between', bgcolor: '#3d3982' }}>
               <Box className='info-song' sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={song.image} sx={{ width: 60, height: 60, borderRadius: 3 }} />
                  <Box sx={{ ml: 1 }}>
                     <Typography sx={{ fontWeight: 500, color: 'white' }}>
                        {song.name}
                     </Typography>
                     <Typography sx={{ fontSize: '15px', color: 'white' }}>
                        {
                           song.singer && song.singer.map(item => (
                              singers.find(singer => singer._id === item).name
                           ))

                        }
                     </Typography>
                  </Box>

               </Box>
               {/* <ReactAudioPlayer
            src={song.link_mp3}
            autoPlay
            controls
            style={{ width: '700px' }}
            onLoadedMetadata={handleLoadMetadata}
          />
          <Box className='option' sx={{ width: 100 }}>
            <SkipPreviousIcon sx={{ color: 'white', fontSize: 28, mr: 2 }} />
            <SkipNextIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box> 
            </Box> */}
            <Typography sx={{ fontWeight: 500, fontSize: 19, my: 1 }}>
               Comment
            </Typography>
            <Comment song={song} />

         </Box>



      </Container>
   );
};

export default SongDetail;