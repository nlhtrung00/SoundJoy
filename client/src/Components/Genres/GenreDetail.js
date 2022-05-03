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
import { fetchAsyncSongByGenre, getSongsByGenre } from "../../Redux/Slices/SongSlice";
import { fetchAsyncAlbumsByGenre, getListAlbumsByGenre } from "../../Redux/Slices/AlbumSlice";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SongsByGenre from "../ListCard/SongsByGenre";
import AlbumsByGenre from "../ListCard/AlbumsByGenre";

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
    const [valueTab, setValueTab] = useState('1');
    const { genreId } = useParams();
    const genre = useSelector(getGenre);
    const songs = useSelector(getSongsByGenre);
    const albums = useSelector(getListAlbumsByGenre);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncGenreById(genreId));
        dispatch(fetchAsyncSongByGenre(genreId));
        dispatch(fetchAsyncAlbumsByGenre(genreId));
    }, [genreId, dispatch])

    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    return (

        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            {genre !== undefined && Object.keys(genre).length === 0 ? <div>Loading...</div>
                :
                <>
                    <Box className={classes.info}>
                        <Box>
                            <Box className={classes.avatar} sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <Avatar alt="avatar genre" src={genre.image ? genre.image : ''} sx={{
                                    width: '200px',
                                    height: '200px'
                                }} />

                                <Box sx={{ ml: 2, }}>
                                    <Typography sx={{
                                        fontSize:30,
                                        fontWeight:500
                                    }}>
                                        Genre
                                    </Typography>
                                    <Typography variant='body2' sx={{
                                        fontWeight: 700,
                                        fontSize: '90px',
                                        lineHeight: 1,
                                        mb: 0,
                                        my: 0
                                    }}>
                                        {genre.name}
                                    </Typography>


                                </Box>

                            </Box>
                        </Box>

                        <Box className="content">
                            <Box sx={{
                                borderBottom: 1, borderColor: 'divider'
                            }}>
                                <TabContext value={valueTab}>
                                    <TabList onChange={handleChangeTab} aria-label="tab for content">
                                        <Tab label="Songs by genre" value="1" />
                                        <Tab label="Albums by genre" value="2" />
                                    </TabList>
                                    <TabPanel value="1" sx={{
                                        p: 1,
                                        minHeight: 450,
                                        bgcolor: '#eeeeee',
                                        overflow:'auto',

                                    }}>
                                        <SongsByGenre songs={songs}/>
                                    </TabPanel>
                                    <TabPanel value="2" sx={{
                                        p: 1,
                                        minHeight: 450,
                                        bgcolor: '#eeeeee',
                                        
                                    }}>
                                        <AlbumsByGenre albums={albums}/>
                                    </TabPanel>
                                </TabContext>

                            </Box>
                        </Box>
                    </Box>
                </>
            }
        </Container>
    );
};

export default GenreDetail;