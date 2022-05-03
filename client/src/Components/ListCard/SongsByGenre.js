import { Grid } from '@mui/material';
import React from 'react';
import CardSong from '../Song/CardSong';

const SongsByGenre = ({ songs }) => {
    return (
        <Grid container spacing={2}>
            {songs.map(song => {
                return (
                    <Grid item lg={2.4} md={3} key={song._id+'genre'}>
                        <CardSong song={song} />
                    </Grid>
                )
            })}

        </Grid>
    );
};

export default SongsByGenre;