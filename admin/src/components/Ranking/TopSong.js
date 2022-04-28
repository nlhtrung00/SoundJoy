import { Grid } from '@mui/material';
import React from 'react';
import CardSong from '../Card/CardSong';
const TopSong = ({top}) => {
    
    return (
        <Grid container spacing={3}>
            {top && top.map((song) => {
                return (
                    <Grid item md={2.4} key={song._id}>
                        <CardSong song={song}/>
                    </Grid>
                )
            })}
            {/* fetch list top songs and map here, give props (item song) into each card like <CardSong song={itemsong} /> 
            with itemsongs are value of map array */}
            {/* <Grid item md={2.4}>
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
            </Grid> */}
        </Grid>
    );
};

export default TopSong;