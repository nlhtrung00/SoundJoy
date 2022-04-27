import { Avatar, Container, Box, Typography, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchAsyncGenreById, getGenre } from "../../Redux/Slices/GenreSlice";
import CardSong from "../Song/CardSong";
import CardAlbum from "../Album/CardAlbum";

const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
})
const GenreDetail = () => {
    const classes = useStyle();
    const { genreId } = useParams();
    const data = useSelector(getGenre);
    console.log(data)
    const dispatch = useDispatch();
    useEffect(() => {
        const action = dispatch(fetchAsyncGenreById(genreId));
    }, [])
    console.log(data !== undefined);
    return (

        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            {data !== undefined && Object.keys(data).length === 0 ? <div>Loading...</div>
                :
                <>{console.log(data)}
                    <Box className={classes.info}>
                        <Box>
                            <Box className={classes.avatar} sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <Avatar alt="avatar singer" src={data.image ? data.image : ''} sx={{
                                    width: '200px',
                                    height: '200px'
                                }} />

                                <Box sx={{ ml: 2, }}>

                                    <Typography variant='body2' sx={{
                                        fontWeight: 700,
                                        fontSize: '90px',
                                        lineHeight: 1,
                                        mb: 0,
                                        my: 0
                                    }}>
                                        {data.name}
                                    </Typography>


                                </Box>

                            </Box>
                        </Box>


                        <Box className="content">
                            <Box className='hotsong' sx={{my:1}}>
                                <Typography variant="h6">
                                    Hot songs
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardSong />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardSong />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardSong />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardSong />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardSong />
                                    </Grid>
                                </Grid>

                            </Box>
                            <Box className='hotsong' sx={{my:1}}>
                                <Typography variant="h6">
                                    Hot Albums
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardAlbum />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardAlbum />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardAlbum />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardAlbum />
                                    </Grid>
                                    <Grid item lg={2.4} md={4} xs={6}>
                                        <CardAlbum />
                                    </Grid>
                                </Grid>

                            </Box>

                        </Box>

                    </Box>
                </>
            }
        </Container>
    );
};

export default GenreDetail;