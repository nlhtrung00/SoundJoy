import React, { useEffect, useState } from "react";
import { Avatar, Container, Box, Typography, Button, Paper, Grid } from "@mui/material";
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
import { fetchAsyncAlbumById, getAlbum } from "../../../Redux/Slice/AlbumSlice";
import * as moment from 'moment'
import { fetchAsyncGenres, getListGenres } from "../../../Redux/Slice/GenreSlice";
import { fetchAsyncSongByAlbum, getListSongs } from "../../../Redux/Slice/SongSlice";
import Tablistsong from "./Tablistsong";
import { fetchAsyncSingers } from "../../../Redux/Slice/SingerSlice";
const useStyle = makeStyles({

})
const AlbumDetail = () => {
    const [valueTab, setValueTab] = useState('1');
    const dispatch = useDispatch();
    const classes = useStyle();
    const { albumId } = useParams();
    const album = useSelector(getAlbum);
    const genres = useSelector(getListGenres)
    const songsbyalbum = useSelector(getListSongs);
    console.log(songsbyalbum);
    useEffect(() => {
        dispatch(fetchAsyncSongByAlbum(albumId));
        dispatch(fetchAsyncAlbumById(albumId))
        dispatch(fetchAsyncGenres());
        

    }, [albumId, dispatch])
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    return (
        <Container maxWidth='xl' component={Paper} sx={{ height: '100%', pt: 2 }}>
            {album && Object.keys(album).length === 0 ? <div>Loading...</div>
                :
                <>
                    <Box className={classes.info}>
                        <Box>
                            <Grid container>
                                <Grid item md={2}>
                                    <Box>
                                        <img src={album.image} style={{ width: '100%', objectFit: 'cover' }} />
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
                                                album.genre.map(item => (
                                                    genres.find(genre => genre._id === item).name
                                                ))

                                            }
                                        </Typography>
                                        <Typography sx={{ lineHeight: 2 }}>
                                            <span style={{ fontWeight: 500 }}>Total of songs:</span> 5
                                        </Typography>
                                        <Box sx={{display:'flex'}}>
                                            <Box sx={{ display: 'flex', alignItems: 'center',mr:2 }}>
                                                <ThumbUpIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                                                <Typography>
                                                    {album.reactions}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <GradeIcon sx={{ mr: 1, color: '#3e6f9f', fontSize: '22px' }} />
                                                <Typography>
                                                    {album.rating ? album.rating : '0/10'}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Grid>
                            </Grid>
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
                                        p: 1
                                    }}>
                                        <Tablistsong listSongs={songsbyalbum}/>
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