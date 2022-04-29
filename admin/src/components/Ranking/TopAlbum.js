import React from 'react';
import { Grid } from '@mui/material';
import CardAlbum from '../Card/CardAlbum';
const TopAlbum = ({topAlbums}) => {
    return (
        <Grid container spacing={3}>
            {/* fetch list top songs and map here, give props (item song) into each card like <CardSong song={itemsong} /> 
                with itemsongs are value of map array */}
            {topAlbums && topAlbums.map((album) => {
                return (
                    <Grid item md={2.4} key={album._id}>
                        <CardAlbum album={album}/>
                    </Grid>
                )
            })}
            
        </Grid>
    );
};

export default TopAlbum;