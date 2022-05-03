import { Grid } from '@mui/material';
import React from 'react';
import CardAlbum from '../Album/CardAlbum';


const AlbumsByGenre = ({albums}) => {
    return (
        <Grid container spacing={2}>
            {albums.map(album => {
                return (
                    <Grid item lg={2.4} md={3} key={album._id}>
                        <CardAlbum album={album} />
                    </Grid>
                )
            })}

        </Grid>
    );
};

export default AlbumsByGenre;