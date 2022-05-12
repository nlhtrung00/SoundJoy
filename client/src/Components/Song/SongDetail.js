import { Avatar, Box, Button, AlertTitle, Container, DialogActions, DialogContent, DialogContentText, Grid, Typography, CircularProgress } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpdateSong, fetchAsyncSongById, getSong, setPlaylist } from '../../Redux/Slices/SongSlice';
import { fetchAsyncGenres, getGenres } from '../../Redux/Slices/GenreSlice';
import { fetchAsyncSingers, getSingers } from '../../Redux/Slices/SingerSlice';
import { fetchAsyncMusicians, getMusicians } from '../../Redux/Slices/MusicianSlice';
import { fetchAsyncAlbums, getListAlbums } from '../../Redux/Slices/AlbumSlice';
import GradeIcon from '@mui/icons-material/Grade';
import ShareIcon from '@mui/icons-material/Share';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ExpandIcon from '@mui/icons-material/Expand';
import { Dialog, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Comment from './Comment';
import { getUser } from '../../Redux/Slices/UserSlice';
import { asyncUpdateLikeList, fetchAsyncLikeListById, fetchAsyncLikeListsByUser, getListLikelists } from '../../Redux/Slices/LikelistSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getOpenBar, OpenBar } from '../../Redux/Slices/SongBarSlice';
import RatingSong from './Rating';
import { fetchAsyncRatingsBySong, getRatingsBySong } from '../../Redux/Slices/RatingSongSlice';
import { asyncCreateListen, asyncUpdateListen, fetchAsyncListenBySongAndUser, getListenBySongAndUser } from '../../Redux/Slices/ListenSlice';

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
    const [openDial, setOpenDial] = useState(false);
    const handleOpenDial = () => setOpenDial(true);
    const handleCloseDial = () => setOpenDial(false);
    const { songId } = useParams();
    const dispatch = useDispatch();
    const genres = useSelector(getGenres);
    const singers = useSelector(getSingers);
    const musicians = useSelector(getMusicians);
    const albums = useSelector(getListAlbums);
    const song = useSelector(getSong);
    const user = useSelector(getUser);
    const likelists = useSelector(getListLikelists);
    const openBarSong = useSelector(getOpenBar);
    const ratingsbysong = useSelector(getRatingsBySong);
    const listenedbyuser = useSelector(getListenBySongAndUser)
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(0)
    const [TotalSeconds, setTotalSeconds] = useState(0);
    const [listened, setListened] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [resultAddtolist, setResultAddtolist] = useState('');
    const [openBar, setOpenBar] = useState(openBarSong);
    const [actionRating, setActionRating] = useState(false);
    const player = useRef();
    useEffect(() => {

        const action = async () => {
            let userId = user._id;
            setLoading(true);
            await dispatch(fetchAsyncSongById(songId));
            await dispatch(fetchAsyncGenres());
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncMusicians());
            await dispatch(fetchAsyncAlbums());
            await dispatch(fetchAsyncLikeListsByUser(user._id))
            await dispatch(fetchAsyncListenBySongAndUser({ songId, userId }))
        }
        action();
        setLoading(false);


    }, [songId, dispatch, user._id])

    useEffect(() => {
        let songs = [song];
        dispatch(setPlaylist(songs));
    }, [song])

    useEffect(() => {
        setOpenBar(openBarSong)
    }, [openBarSong])

    // after rating - update rating song
    useEffect(() => {
        if (actionRating) {
            const updateRating = async () => {
                const formdata = new FormData();

                let sum = ratingsbysong.reduce((accumulator, object) => {
                    return accumulator + object.rating
                }, 0)

                // console.log((sum/ratingsbysong.length).toFixed())
                // console.log(ratingsbysong);
                let avgRating = (sum / ratingsbysong.length).toFixed();
                formdata.append('rating', avgRating)
                try {
                    const action = await dispatch(asyncUpdateSong({ formdata, songId }))
                    unwrapResult(action)
                } catch (err) {
                    console.log(err)
                }

            }
            updateRating();
            setActionRating(false);
        }
    }, [actionRating])

    const handleLoadMetadata = (meta) => {
        const { duration } = meta.target;
        const timee = moment.duration(duration, "seconds");
        setTotalSeconds(duration)
        setTime(timee.minutes() + " min " + (timee.seconds() < 10 ? '0' + timee.seconds() : timee.seconds()) + " sec")
    }

    // chọn likelist để add bai hat vao
    const handleChooseLikelist = async (list) => {
        console.log(list)
        const checkExist = list.songs.find(item => item === song._id);
        if (!checkExist) {
            const formdata = new FormData();
            let arrSongs = list.songs;
            arrSongs = [...arrSongs, song._id]
            arrSongs.map(song => {
                formdata.append('songs', song)
            })

            try {
                const action = await dispatch(asyncUpdateLikeList({ formdata: formdata, id: list._id }))
                await dispatch(fetchAsyncLikeListById(list._id));
                unwrapResult(action)
                setResultAddtolist('success')
                setOpenToast(true);
            } catch (err) {
                setResultAddtolist(`Adding to ${list.name} failure`)
                setOpenToast(true);
            }
        }
        else {
            setResultAddtolist(`Song is exist in ${list.name}`)
            setOpenToast(true);
        }



    }
    const DisplaySongBar = async () => {
        await dispatch(OpenBar())
    }

    // tính lượt nghe
    const setListensOfSong = async (seconds) => {
        const time = (seconds / TotalSeconds) * 100

        if (time >= 60 && !listened) {
            try {
                let formdata = new FormData();
                let listens = song.listens + 1;
                formdata.append('listens', listens);
                console.log('set listen begin' + listens)
                let action = await dispatch(asyncUpdateSong({ formdata, songId }))
                unwrapResult(action);
                setListened(true);
                // cap nhat - tao listens by user
                if (listenedbyuser) {

                    let listenId = listenedbyuser._id
                    let data = {
                        weight: time,
                    }
                    let action = await dispatch(asyncUpdateListen({ data, listenId }))
                    unwrapResult(action)
                } else {
                    let userId = user._id;
                    let songId = song._id;
                    let data = {
                        weight: time,
                        user: userId,
                        song: songId
                    }
                    let action = await dispatch(asyncCreateListen(data))
                    unwrapResult(action)
                }
                await dispatch(fetchAsyncSongById(songId))
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseToast = () => {
        setOpenToast(false);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            {
                loading ?
                    <>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </>
                    :
                    <>
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
                                            fontSize: '20px',

                                            my: 0
                                        }}>
                                            {
                                                song.singer && song.singer.map((item, index) => {
                                                    return (
                                                        ((index < song.singer.length - 1) && (song.singer.length > 1)) ? singers.find(singer => singer._id === item).name + " ," : singers.find(singer => singer._id === item).name

                                                    )


                                                })

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
                                                    {song.rating >= 0 ? song.rating + "/5" : '0/5'}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                                                <HeadphonesIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                                                <Typography>
                                                    {song.listens ? song.listens : '0'}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Grid>


                                <Grid item md={1} sx={{ position: 'relative' }}>

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
                                            icon={<ShareIcon />}
                                            tooltipTitle='Share'
                                        />
                                        <SpeedDialAction
                                            icon={<PlaylistAddIcon />}
                                            tooltipTitle="Add to your Likelist"
                                            onClick={handleClickOpenDialog}
                                        />

                                    </SpeedDial>


                                </Grid>
                            </Grid>
                            {
                                !openBar &&
                                <Box className='audio player' sx={{ my: 2, display: 'flex', alignItems: 'center', p: 1.5, justifyContent: 'space-between', bgcolor: '#3d3982' }}>
                                    <Box className='info-song' sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={song.image} sx={{ width: 60, height: 60, borderRadius: 3 }} />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography sx={{ fontWeight: 500, color: 'white' }}>
                                                {song.name}
                                            </Typography>
                                            {
                                                song.singer && song.singer.length < 2 ?
                                                    <Typography sx={{ fontSize: '15px', color: 'white' }}>
                                                        {singers.find(singer => singer._id === song.singer[0]).name}
                                                    </Typography>
                                                    :
                                                    <Typography sx={{ fontSize: '15px', color: 'white' }}>
                                                        {singers.find(singer => singer._id === song.singer[0]).name}
                                                        <span style={{ fontSize: 13 }}>...</span>
                                                    </Typography>
                                            }
                                        </Box>

                                    </Box>
                                    <ReactAudioPlayer
                                        src={song.link_mp3}
                                        autoPlay
                                        controls
                                        loop
                                        ref={player}
                                        style={{ width: '700px' }}
                                        onListen={(seconds) => setListensOfSong(seconds)}
                                        onLoadedMetadata={handleLoadMetadata}
                                    />

                                    <Box className='option' sx={{ width: 100, display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
                                        <SkipPreviousIcon sx={{ color: 'white', cursor: 'pointer', fontSize: 28 }} />
                                        <ExpandIcon
                                            onClick={DisplaySongBar}
                                            sx={{ color: 'white', cursor: 'pointer', fontSize: 25, mx: 1 }} />
                                        <SkipNextIcon sx={{ color: 'white', cursor: 'pointer', fontSize: 28 }} />

                                    </Box>
                                </Box>
                            }
                            <Typography sx={{ fontWeight: 500, fontSize: 19, my: 1 }}>
                                Rating for Song
                            </Typography>
                            <RatingSong song={song} setActionRating={setActionRating} />

                            <Typography sx={{ fontWeight: 500, fontSize: 19, my: 1 }}>
                                Comment
                            </Typography>
                            <Comment song={song} />

                        </Box>

                        {/* likelist add  to dialog */}

                        <Box className='dialog-likelist'>
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>
                                    Choose Likelist
                                </DialogTitle>
                                <DialogContent sx={{ minWidth: 300 }}>
                                    {likelists.map(list => {
                                        return (
                                            <Typography key={list._id} onClick={(e) => handleChooseLikelist(list)}
                                                sx={{ cursor: 'pointer', p: 1, '&:hover': { bgcolor: '#eeeeee' } }}>
                                                {list.name}
                                            </Typography>

                                        )
                                    })}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>

                        {resultAddtolist === 'success' ?
                            <Box>
                                <Snackbar
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    open={openToast}
                                    autoHideDuration={2000}
                                    onClose={handleCloseToast}
                                >
                                    <MuiAlert elevation={6} severity="success" variant="filled" >
                                        <AlertTitle>Success</AlertTitle>
                                        Adding to likelist successfully
                                    </MuiAlert>
                                </Snackbar>
                            </Box>
                            :
                            <Box>
                                <Snackbar
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    open={openToast}
                                    autoHideDuration={2000}
                                    onClose={handleCloseToast}
                                >
                                    <MuiAlert elevation={6} severity="error" variant="filled" >
                                        <AlertTitle>Error</AlertTitle>
                                        {resultAddtolist}
                                    </MuiAlert>
                                </Snackbar>
                            </Box>

                        }
                    </>
            }



        </Container>
    );
};

export default SongDetail;