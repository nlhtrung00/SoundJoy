import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import CardGenre from './CardGenre';
import { makeStyles } from '@mui/styles';

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
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <Typography variant="h6" sx={{
                mb:1
            }}>
                All genres
            </Typography>
            <Grid container spacing={2}>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardGenre />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Genres;