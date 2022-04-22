import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import CardGenre from './CardGenre';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getGenres } from '../../Redux/Slices/GenreSlice';
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
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
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
        </Container>
    );
};

export default Genres;