import { Grid } from '@mui/material';
import React from 'react';
import CardSong from '../Card/CardSong';
const BadSong = () => {
    
    return (
        <Grid container spacing={3}>
            {/* fetch list top songs and map here, give props (item song) into each card like <CardSong song={itemsong} /> 
            with itemsongs are value of map array */}
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
            <Grid item md={2.4}>
                <CardSong />
            </Grid>
        </Grid>
    );
};

export default BadSong;