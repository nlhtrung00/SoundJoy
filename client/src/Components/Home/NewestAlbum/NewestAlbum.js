import React, { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSingers } from '../../../Redux/Slices/SingerSlice';
import singerImg from "../../../Images/binz.jpeg";
import singerImg2 from "../../../Images/denvau.jpg"
import { Link } from 'react-router-dom';
import AlbumCard from './AlbumCard';
import { fetchAsyncAlbums, fetchAsyncNewAlbums, getListAlbums, getListNewAlbums } from '../../../Redux/Slices/AlbumSlice';


const NewestAlbum = () => {
    const dispatch = useDispatch()
    const newestalbum = useSelector(getListNewAlbums);
    const albums = useSelector(getListAlbums);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const actionCall = async () => {
            await dispatch(fetchAsyncNewAlbums());
            await dispatch(fetchAsyncAlbums())
        }
        actionCall()
        setLoading(false)
    }, [dispatch])

    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Grid container spacing={3}>
                        {
                            newestalbum.map(album => (
                                <Grid item lg={2} md={3} xs={6}>
                                    <AlbumCard album={album}/>
                                </Grid>
                            ))
                        }

                    </Grid>
            }
        </>

    );
};

export default NewestAlbum;