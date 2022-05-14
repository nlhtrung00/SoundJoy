import React, { useEffect, useState } from "react";
import { Avatar, Container, Box, Typography, Button, Paper, Grid, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import background from "../../../assets/images/background_sing.jpg"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GradeIcon from '@mui/icons-material/Grade';
import { fetchAsyncAlbumById, fetchAsyncAlbumsByGenre, getAlbum, getListAlbumsByGenre } from "../../../Redux/Slice/AlbumSlice";
import * as moment from 'moment'
import { fetchAsyncGenreById, fetchAsyncGenres, getGenre, getListGenres } from "../../../Redux/Slice/GenreSlice";
import { fetchAsyncSongByAlbum, fetchAsyncSongByGenre, getListSongs, getSongsByAlbum, getSongsByGenre } from "../../../Redux/Slice/SongSlice";
import Tablistsong from "./Tablistsong";
import { fetchAsyncSingers,getListSingers } from "../../../Redux/Slice/SingerSlice";
import { fetchAsyncMusicians, getListMusicians } from "../../../Redux/Slice/MusicianSlice";
import Tablistalbum from "./Tablistalbums";
const useStyle = makeStyles({

})
const GenreDetail = () => {
    const [valueTab, setValueTab] = useState('1');
    const dispatch = useDispatch();
    const classes = useStyle();
    const { genreId } = useParams();
    const genre = useSelector(getGenre);
    // const genres = useSelector(getListGenres)
    const songsbygenre = useSelector(getSongsByGenre);
    const singers = useSelector(getListSingers);
    const musicians = useSelector(getListMusicians);
    const albumsbygenre = useSelector(getListAlbumsByGenre);
    console.log("12321", albumsbygenre);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const action = async () => {
            setLoading(true);
            // await dispatch(fetchAsyncGenres());
            await dispatch(fetchAsyncSongByGenre(genreId));
            await dispatch(fetchAsyncGenreById(genreId))
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncMusicians());
            await dispatch(fetchAsyncAlbumsByGenre(genreId));

        }
        action();
        setLoading(false)


    }, [])

    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }

    return (
        <Container maxWidth='xl' component={Paper} sx={{ height: '100%', pt: 2 }}>
            {loading ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    {
                        genre && Object.keys(genre).length > 0 &&
                        <>
                            <Box className={classes.info}>
                                <Box>
                                    <Grid container>
                                        <Grid item md={2}>
                                            <Box>
                                                <img src={genre.image} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
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
                                                    {genre.name}
                                                </Typography>
                                                {/* <Typography sx={{ lineHeight: 2 }}>
                                                    <span style={{ fontWeight: 500 }}>Debuted date:</span> {moment(album.debuted_date).format('DD/MM/YYYY')}
                                                </Typography> */}
                                                {/* <Typography sx={{ lineHeight: 2 }}>
                                                    <span style={{ fontWeight: 500 }}>Genres:</span>
                                                    {
                                                        genres && genres.length > 0 ? album.genre.map(item => (
                                                            genres.find(genre => genre._id === item).name
                                                        ))
                                                            : "none"



                                                    }
                                                </Typography> */}
                                                {/* <Typography sx={{ lineHeight: 2 }}>
                                                    <span style={{ fontWeight: 500 }}>Singers:</span>
                                                    {
                                                        album.singer.length > 0 ? album.singer.map(item => (
                                                            singers.find(genre => genre._id === item) ? singers.find(genre => genre._id === item).name : ' none'
                                                        )) : " none"

                                                    }
                                                </Typography> */}
                                                <Typography sx={{ lineHeight: 2 }}>
                                                    <span style={{ fontWeight: 500 }}>Total of songs: </span>
                                                    {
                                                        songsbygenre.length
                                                    }
                                                </Typography>
                                                {/* <Box sx={{ display: 'flex' }}>

                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <GradeIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                                                        <Typography>
                                                            {album.rating ? album.rating : '0/10'}
                                                        </Typography>
                                                    </Box>
                                                </Box> */}

                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className="achievement">

                                    <Box sx={{
                                        borderBottom: 1, borderColor: 'divider'
                                    }}>
                                        <TabContext value={valueTab} >
                                            <TabList onChange={handleChangeTab} aria-label="tab for album">
                                                <Tab label="Songs" value="1" />
                                                <Tab label="Albums" value="2" />
                                            </TabList>
                                            <TabPanel value="1" sx={{
                                                p: 1,
                                                minHeight: 350,
                                                bgcolor: '#eeeeee'
                                            }}>
                                                {songsbygenre && <Tablistsong listSongs={songsbygenre} />}
                                            </TabPanel>
                                            <TabPanel value="2" sx={{
                                                p: 1,
                                                minHeight: 350,
                                                bgcolor: '#eeeeee'
                                            }}>
                                                {albumsbygenre && <Tablistalbum listAlbums={albumsbygenre} />}
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
                                <Link to={`edit/${genre._id}`}>
                                    <Button variant='contained'>
                                        Edit
                                        <EditIcon sx={{ fontSize: '16px', ml: 0.5 }} />
                                    </Button>
                                </Link>


                            </Box>
                        </>
                    }

                </>
            }
        </Container>
    );
};

export default GenreDetail;