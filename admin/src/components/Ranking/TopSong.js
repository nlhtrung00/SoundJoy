import { Grid } from '@mui/material';
import React from 'react';
import CardSong from '../Card/CardSong';
const TopSong = ({topsong}) => {
    
    return (
        <Grid container spacing={3}>
            {topsong&& topsong.map((song,index) => {
                return (
                    <Grid item md={2.4} key={song._id+1}>
                        <CardSong song={song}/>
                    </Grid>
                )
            })}
            
        </Grid>
    );
};

export default TopSong;