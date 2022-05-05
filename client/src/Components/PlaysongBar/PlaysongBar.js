import { Avatar, Box, Container, IconButton, Paper, Typography } from '@mui/material';
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
    const dispatch = useDispatch();
    const [TotalSeconds, setTotalSeconds] = useState(0);
    const [listened, setListened] = useState(false);
    const [lengthTracks, setLengthTracks] = useState(playlist.length)
    const [indexTrack, setIndexTrack] = useState(0);
    const [currentTrackSrc, setCurrentTrackSrc] = useState(playlist[0])
    useEffect(() => {
        setCurrentTrackSrc(playlist[0]);
    }, [playlist])

    // when change song in playlist
    useEffect(()=>{
        setCurrentTrackSrc(playlist[indexTrack]);
    },[indexTrack])
    const handleLoadMetadata = (meta) => {
        const { duration } = meta.target;
        setTotalSeconds(duration)
    }
    const setListensOfSong = async (seconds) => {
        let time = (seconds / TotalSeconds) * 100
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
        setIndexTrack((prev) =>
            prev + 1 > lengthTracks - 1 ? 0 : prev + 1
        );
    }
    console.log(indexTrack)
    const changePrevSong = () => {
        // setCurrentTrackSrc(newSong);
        // setAudioSrc({
        //     sources: [
        //         {
        //             src: newSong.link_mp3,
        //         }
        //     ]
        // })
    }
    return (
        <React.Fragment>
            {open ?
                <Container className={classes.playsongbar} maxWidth='xl' component={Paper} disableGutters>
                    <Box sx={{ bgcolor: '#5C2F9D' }}>
                        <Box className='audio player' sx={{ marginTop: 0, display: 'flex', alignItems: 'center', p: 1.5, justifyContent: 'space-between', bgcolor: '#3d3982' }}>
                            <Box className='info-song' sx={{ display: 'flex', alignItems: 'center' }}>
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


    );
};

export default React.memo(PlaysongBar);