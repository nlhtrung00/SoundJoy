import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getSingers } from '../../../Redux/Slices/SingerSlice';
import singerImg from "../../../Images/binz.jpeg";
import singerImg2 from "../../../Images/denvau.jpg"
import { Link } from 'react-router-dom';
import AlbumCard from './AlbumCard';


const NewestAlbum = () => {
    return (
        <Grid container spacing={3}>

            <Grid item lg={2} md={3} xs={6}>
                <AlbumCard />
            </Grid>
            <Grid item lg={2} md={3} xs={6}>
                <AlbumCard />
            </Grid>
            <Grid item lg={2} md={3} xs={6}>
                <AlbumCard />
            </Grid>
            <Grid item lg={2} md={3} xs={6}>
                <AlbumCard />
            </Grid>
            <Grid item lg={2} md={3} xs={6}>
                <AlbumCard />
            </Grid>
            <Grid item lg={2} md={3} xs={6}>
                <AlbumCard />
            </Grid>


        </Grid>
    );
};

export default NewestAlbum;