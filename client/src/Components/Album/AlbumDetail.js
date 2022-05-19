import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Paper, Grid, CircularProgress, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GradeIcon from '@mui/icons-material/Grade';
import * as moment from 'moment'
import { asyncUpdateAlbum, fetchAsyncAlbumById, getAlbum } from "../../Redux/Slices/AlbumSlice";
import { fetchAsyncGenres, getGenres } from "../../Redux/Slices/GenreSlice";
import { fetchAsyncSongByAlbum, fetchAsyncSongs, getListSongs, getSongsByAlbum, setPlaylist } from "../../Redux/Slices/SongSlice";
import Tablistsong from "../TabList/Tablistsong";
import { fetchAsyncSingers, getSingers } from "../../Redux/Slices/SingerSlice";
import RatingAlbum from "./Rating";
import { fetchAsyncRatingsByAlbum, getRatingsByAlbum } from "../../Redux/Slices/RatingAlbumSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { CloseBar, OpenBar } from "../../Redux/Slices/SongBarSlice";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
})
const AlbumDetail = () => {
    const [valueTab, setValueTab] = useState('1');
    const dispatch = useDispatch();
    const classes = useStyle();
    const { albumId } = useParams();
    const album = useSelector(getAlbum);
    const genres = useSelector(getGenres);
    const singers = useSelector(getSingers)
    const songsbyalbum = useSelector(getSongsByAlbum);
    const [loading, setLoading] = useState(true);
    const [actionRating, setActionRating] = useState(false);
    const ratingbyalbum = useSelector(getRatingsByAlbum)
    const [selectedSong, setSelectedSong] = useState();
    const songs = useSelector(getListSongs);
    useEffect(() => {
        setLoading(true);
        const action = async () => {
            dispatch(fetchAsyncRatingsByAlbum(albumId))
            await dispatch(fetchAsyncSongByAlbum(albumId));
            await dispatch(fetchAsyncAlbumById(albumId))
            await dispatch(fetchAsyncGenres());
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncSongs());
        }
        action();
        setLoading(false);
    }, [albumId, dispatch])
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }

    console.log(songsbyalbum)

    const PlayListSong = async () => {
        let playlist = [];
        setSelectedSong();
        if (songsbyalbum) {
            songsbyalbum.map((item) => {
                playlist = [...playlist, songs.find(song => song._id === item._id)]
            })
            console.log(songsbyalbum)
            console.log(playlist)
            await dispatch(setPlaylist(playlist));
            await dispatch(CloseBar())
            await dispatch(OpenBar())
        }

    }

    // rating of album
    useEffect(() => {
        if (actionRating) {
            const updateRating = async () => {
                const formdata = new FormData();

                let sum = ratingbyalbum.reduce((accumulator, object) => {
                    return accumulator + object.rating
                }, 0)
                let avgRating = (sum / ratingbyalbum.length);

                formdata.append('rating', avgRating)
                try {
                    const action = await dispatch(asyncUpdateAlbum({ formdata, albumId }))
                    unwrapResult(action)
                    dispatch(fetchAsyncAlbumById(albumId))
                } catch (err) {
                    console.log(err)
                }
            }
            updateRating();
            setActionRating(false)
        }
    }, [actionRating])
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            {loading ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    <Box className={classes.info}>
                        <Box>
                            <Grid container>
                                <Grid item md={2}>
                                    <Box>
                                        <img src={album.image} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                    </Box>

                                </Grid>
                                <Grid item md={10}>
                                    <Box sx={{ ml: 2, }}>
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: '30px',
                                            letterSpacing: '8px',
                                            my: 0
                                        }}>
                                            {album.name}
                                        </Typography>
                                        <Typography sx={{ lineHeight: 2 }}>
                                            <span style={{ fontWeight: 500 }}>Debuted date:</span> {moment(album.debuted_date).format('DD/MM/YYYY')}
                                        </Typography>
                                        <Typography sx={{ lineHeight: 2 }}>
                                            <span style={{ fontWeight: 500 }}>Genres:</span>
                                            {
                                                genres.length > 0 && album.genre.map((item, index) => {
                                                    if (index < album.genre.length - 1) {
                                                        return (
                                                            genres.find(genre => genre._id === item) ? genres.find(genre => genre._id === item).name + ", " : "none"
                                                        )
                                                    } else {
                                                        return genres.find(genre => genre._id === item) ? genres.find(genre => genre._id === item).name : "none"
                                                    }


                                                })

                                            }
                                        </Typography>
                                        <Typography sx={{ lineHeight: 2 }}>
                                            <span style={{ fontWeight: 500 }}>Singers:</span>
                                            {
                                                album.singer.length > 0 ? album.singer.map((item, index) => (
                                                    (singers.length > 0 && singers.find(genre => genre._id === item)) ?
                                                        (index < album.singer.length - 1 ? singers.find(genre => genre._id === item).name + ", " : singers.find(genre => genre._id === item).name)
                                                        : ' none'

                                                )) : " none"

                                            }
                                        </Typography>
                                        <Typography sx={{ lineHeight: 2 }}>
                                            <span style={{ fontWeight: 500 }}>Total of songs:</span>
                                            {
                                                songsbyalbum.length
                                            }
                                        </Typography>

                                        <Box sx={{ display: 'flex' }}>

                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <GradeIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                                                <Typography>
                                                    {album.rating >= 0 ? album.rating + "/5" : '0/5'}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* rating of user */}
                        <Box sx={{display:'flex',alignItems:'flex-end'}}>
                            <Box>
                                <Typography sx={{ fontWeight: 500, fontSize: 19, my: 1 }}>
                                    Your rating
                                </Typography>
                                <RatingAlbum album={album} setActionRating={setActionRating} />
                            </Box>
                            <Box sx={{ml:2}}>
                                <Button
                                    variant="contained"
                                    onClick={() => PlayListSong()}
                                    sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PlayCircleOutlineIcon
                                        sx={{
                                            mx: 1, fontSize: 25, color: 'black', '&:hover': {
                                                transform: 'scale(1.05)',
                                                transition: 'ease-in-out',
                                                transitionDuration: '0.4s'
                                            }
                                            , transitionDuration: '0.8s'
                                        }} />
                                    <Typography sx={{ color: 'black', fontWeight: 500, fontSize: 14 }}>Play</Typography>
                                </Button>
                            </Box>
                        </Box>

                        <Box className="achievement">
                            {/* <Typography variant="h6">
                                Song
                            </Typography> */}
                            <Box sx={{
                                borderBottom: 1, borderColor: 'divider'
                            }}>
                                <TabContext value={valueTab} >
                                    <TabList onChange={handleChangeTab} aria-label="tab for album">
                                        <Tab label="Songs" value="1" />
                                    </TabList>
                                    <TabPanel value="1" sx={{
                                        p: 1,
                                        minHeight: 350,
                                        bgcolor: '#eeeeee'
                                    }}>
                                        <Tablistsong listSongs={songsbyalbum} />
                                    </TabPanel>
                                </TabContext>

                            </Box>
                        </Box>

                    </Box>
                    <Box className="edit_info" sx={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30
                    }}>
                        <Link to={`edit/${album._id}`}>
                            <Button variant='contained'>
                                Edit
                                <EditIcon sx={{ fontSize: '16px', ml: 0.5 }} />
                            </Button>
                        </Link>


                    </Box>
                </>
            }
        </Container>
    );
};

export default AlbumDetail;