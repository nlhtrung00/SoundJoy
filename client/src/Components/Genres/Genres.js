import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardGenre from './CardGenre';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncGenres, getGenres } from '../../Redux/Slices/GenreSlice';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}));
const Genres = () => {
    const classes = useStyle();
    const genres = useSelector(getGenres);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            await dispatch(fetchAsyncGenres());
        }
        action();
        setLoading(false)
    }, [])
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
                            All genres
                        </Typography>
                        <Grid container spacing={2}>
                            {genres && genres.map((genre) => {
                                return (
                                    <Grid item lg={2} md={3} xs={6} key={genre._id}>
                                        <Link to={`/genre/${genre._id}`}>
                                            <CardGenre genre={genre} />
                                        </Link>
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </>
            }

        </Container>
    );
};

export default Genres;