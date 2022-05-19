
import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardSong from './CardSong';
import { fetchAsyncNewestSongs, getNewestSongs } from '../../Redux/Slices/SongSlice';
const NewestSong = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const newSongs = useSelector(getNewestSongs);
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            await dispatch(fetchAsyncNewestSongs())
        }
        action();
        setLoading(false)
    }, [])
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
                            newSongs && newSongs.length > 0 ?
                                <Grid container spacing={3}>
                                    {
                                        newSongs.map(song => (
                                            <Grid item key={song._id} xl={2} lg={2.4} md={3} xs={6}>
                                                <CardSong song={song} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                :
                                <Box>

                                </Box>
                        }
                    </Box>
            }
        </>
    );
};

export default NewestSong;