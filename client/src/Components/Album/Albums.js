import { Container, Grid, Typography,CircularProgress,Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncAlbums, getListAlbums } from '../../Redux/Slices/AlbumSlice';
import CardAlbum from './CardAlbum';


const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}));

const Albums = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const albums = useSelector(getListAlbums);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncAlbums());
        }
        action();
        setLoading(false)
    }, [dispatch])
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <Typography variant="h6" sx={{
                            mb: 1
                        }}>
                            All Albums
                        </Typography>
                        <Grid container spacing={2}>
                            {albums && albums.map((album) => {
                                return (
                                    <Grid item lg={2} md={3} xs={6} key={album._id}>
                                        <CardAlbum album={album} />
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </>
            }

        </Container>
    );
};

export default Albums;