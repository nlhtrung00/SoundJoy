import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncRelevantSongs, fetchAsyncSongByGenre, fetchAsyncSongBySinger, getRelevantSongs } from '../../Redux/Slices/SongSlice';
import CardSong from './CardSong';

const Relevants = ({ song }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const relevantSongs = useSelector(getRelevantSongs).slice(0,6)
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncRelevantSongs(song._id))
        }
        action();
        setLoading(false)
    }, [song._id])

    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Box>
                        {
                            relevantSongs && relevantSongs.length > 0 &&
                            <Grid container spacing={3}>
                                {
                                    relevantSongs.map(song => (
                                        <Grid item key={song._id} xl={2} lg={2.4} md={3} xs={12}>
                                            <CardSong song={song}/>
                                        </Grid>
                                    ))
                                }

                            </Grid>

                        }
                    </Box>
            }
        </>

    );
};

export default Relevants;