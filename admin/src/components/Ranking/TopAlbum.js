import React from 'react';
import { Grid } from '@mui/material';
import CardAlbum from '../Card/CardAlbum';
const TopAlbum = () => {
    return (
        <Grid container spacing={3}>
            {/* fetch list top songs and map here, give props (item song) into each card like <CardSong song={itemsong} /> 
                with itemsongs are value of map array */}
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            <Grid item md={2.4}>
                <CardAlbum />
            </Grid>
            
        </Grid>
    );
};

export default TopAlbum;