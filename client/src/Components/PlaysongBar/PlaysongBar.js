import { Avatar, Box, CircularProgress, Container, IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useMemo, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useDispatch, useSelector } from 'react-redux';
import { CloseBar, getOpenBar } from '../../Redux/Slices/SongBarSlice';
import { asyncUpdateSong, fetchAsyncSongById, getPlaylist } from '../../Redux/Slices/SongSlice';
import { fetchAsyncSingers, getSingers } from '../../Redux/Slices/SingerSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { asyncCreateListen, asyncUpdateListen, fetchAsyncListenBySongAndUser, getListenBySongAndUser } from '../../Redux/Slices/ListenSlice';
import { getUser } from '../../Redux/Slices/UserSlice';
const useStyle = makeStyles({
    playsongbar: {
        position: 'sticky',
        bottom: 0,
        left: 0,

    },
})
const PlaysongBar = () => {
    const classes = useStyle();
    const playlist = useSelector(getPlaylist);
    const open = useSelector(getOpenBar);
    const singers = useSelector(getSingers);
    const user = useSelector(getUser)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const listenedbyuser = useSelector(getListenBySongAndUser)
    const [TotalSeconds, setTotalSeconds] = useState(0);
    const [listened, setListened] = useState(false);
    const [lengthTracks, setLengthTracks] = useState(playlist.length)
    const [indexTrack, setIndexTrack] = useState(0);
    const [currentTrackSrc, setCurrentTrackSrc] = useState()

    console.log(playlist)
    useEffect(() => {
        const action = async () => {
            if (playlist) {
                setLoading(true)
                await setCurrentTrackSrc(playlist[0]);
                await setLengthTracks(playlist.length)
            }
        }
        action()
    }, [playlist])
    useEffect(() => {

        const action = async () => {
            if (currentTrackSrc) {
                setLoading(true);
                const userId = user._id;
                const songId = currentTrackSrc._id
                await dispatch(fetchAsyncListenBySongAndUser({ songId, userId }))
            }
        }
        action();
        setLoading(false);


    }, [currentTrackSrc, user, playlist])

    // when change song in playlist
    useEffect(() => {
        setCurrentTrackSrc(playlist[indexTrack]);
    }, [indexTrack])
    const handleLoadMetadata = (meta) => {
        const { duration } = meta.target;
        setTotalSeconds(duration)
    }
    const setListensOfSong = async (seconds) => {
        const time = (seconds / TotalSeconds) * 100
        if (time >= 60 && !listened) {
            try {
                let formdata = new FormData();
                let listens = currentTrackSrc.listens + 1;
                formdata.append('listens', listens);
                console.log('set listen begin' + listens)
                let songId = currentTrackSrc._id
                const action = await dispatch(asyncUpdateSong({ formdata, songId }))
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
                    let songId = currentTrackSrc._id;
                    let data = {
                        weight: time,
                        user: userId,
                        song: songId
                    }
                    let action = await dispatch(asyncCreateListen(data))
                    unwrapResult(action)
                }
                await dispatch(fetchAsyncSongById(currentTrackSrc._id))
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleCloseBar = async () => {
        await dispatch(CloseBar())
    }
    const changeNextSong = () => {
        console.log(lengthTracks)
        console.log(playlist)
        setIndexTrack((prev) =>
            prev + 1 > lengthTracks - 1 ? 0 : prev + 1
        );
    }
    const changePrevSong = () => {
        setIndexTrack((prev) =>
            prev === 0 ? lengthTracks - 1 : prev - 1
        );
    }
    return (
        <React.Fragment>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <React.Fragment>
                        {open ?
                            <Container className={classes.playsongbar} maxWidth='xl' component={Paper} disableGutters>
                                <Box sx={{ bgcolor: '#5C2F9D' }}>
                                    <Box className='audio player' sx={{ marginTop: 0, display: 'flex', alignItems: 'center', p: 1.5, justifyContent: 'space-between', bgcolor: '#3d3982' }}>
                                        <Box className='info-song' sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
                                            <Avatar src={currentTrackSrc.image}
                                                sx={{ width: 60, height: 60, borderRadius: 3 }} />
                                            <Box sx={{ ml: 1 }}>
                                                <Typography sx={{ fontWeight: 500, color: 'white' }}>
                                                    {currentTrackSrc.name}
                                                </Typography>
                                                {
                                                    currentTrackSrc.singer.length < 2 ?
                                                        <Typography sx={{ fontSize: '15px', color: 'white' }}>
                                                            {singers.find(singer => singer._id === currentTrackSrc.singer[0]).name}
                                                        </Typography>
                                                        :
                                                        <Typography sx={{ fontSize: '15px', color: 'white' }}>
                                                            {singers.find(singer => singer._id === currentTrackSrc.singer[0]).name}
                                                            ...
                                                        </Typography>
                                                }


                                            </Box>

                                        </Box>
                                        <ReactAudioPlayer
                                            src={currentTrackSrc.link_mp3}
                                            autoPlay
                                            controls
                                            style={{ width: '700px' }}
                                            onListen={(seconds) => setListensOfSong(seconds)}
                                            onLoadedMetadata={handleLoadMetadata}

                                        />
                                        <Box className='option' sx={{ width: 150, display: 'flex' }}>
                                            <IconButton onClick={changePrevSong}>
                                                <SkipPreviousIcon

                                                    sx={{ color: 'white', fontSize: 28 }} />
                                            </IconButton>
                                            <IconButton onClick={handleCloseBar}>
                                                <CloseFullscreenIcon sx={{ color: 'white', fontSize: 25, mx: 1 }} />
                                            </IconButton>
                                            <IconButton onClick={changeNextSong}>
                                                <SkipNextIcon

                                                    sx={{ color: 'white', fontSize: 28 }} />
                                            </IconButton>


                                        </Box>
                                    </Box>
                                </Box>
                            </Container>
                            :
                            ""

                        }
                    </React.Fragment>
            }

        </React.Fragment>


    );
};

export default React.memo(PlaysongBar);