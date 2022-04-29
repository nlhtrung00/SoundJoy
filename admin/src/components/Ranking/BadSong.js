import { Grid } from '@mui/material';
import React from 'react';
import CardSong from '../Card/CardSong';
const BadSong = ({bad}) => {
    
    return (
        <Grid container spacing={3}>
            {/* fetch list top songs and map here, give props (item song) into each card like <CardSong song={itemsong} /> 
            with itemsongs are value of map array */}
            {bad && bad.map((song) => {
                return (
                    <Grid item md={2.4} key={song._id}>
                        <CardSong song={song}/>
                    </Grid>
                )
            })}
            
        </Grid>
    );
};

export default BadSong;