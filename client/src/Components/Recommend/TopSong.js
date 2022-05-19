import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncTopSongs, getTopSongs } from '../../Redux/Slices/SongSlice';
import CardSong from './CardSong';

const TopSong = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const topSongs = useSelector(getTopSongs);
    useEffect(() => {
        const action = async () => {
            setLoading(true)

            await dispatch(fetchAsyncTopSongs())


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
                            topSongs && topSongs.length > 0 ?
                                <Grid container spacing={3}>
                                    {
                                        topSongs.map(song => (
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

export default TopSong;