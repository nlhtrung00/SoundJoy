import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardSinger from './CardSinger';

const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}));

const Singer = () => {
    const classes = useStyle();
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <Typography variant="h6" sx={{
                mb:1
            }}>
                All Singers
            </Typography>
            <Grid container spacing={2}>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardSinger />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Singer;