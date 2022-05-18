import { Box, CircularProgress, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TopSong from '../../components/Ranking/TopSong';
import TopSinger from '../../components/Ranking/TopSinger';
import TopMusician from '../../components/Ranking/TopMusician';
import TopAlbum from '../../components/Ranking/TopAlbum';
import BadSong from '../../components/Ranking/BadSong';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncGenres, fetchAsyncRecentGenres, getListGenres, getRecentGenres } from '../../Redux/Slice/GenreSlice';
import { fetchAsyncAlbums, fetchAsyncRecentAlbums, fetchAsyncTopAlbums, getListAlbums, getRecentAlbums, getTopAlbums } from '../../Redux/Slice/AlbumSlice';
import { fetchAsyncBadSongs, fetchAsyncRecentSongs, fetchAsyncSongs, fetchAsyncTopSongs, getBadSongs, getListSongs, getRecentSongs, getTopSongs } from '../../Redux/Slice/SongSlice';
import { fetchAsyncRecentSingers, fetchAsyncSingers, fetchAsyncTopSingers, getListSingers, getRecentSingers, getTopSingers } from '../../Redux/Slice/SingerSlice';
import { fetchAsyncMusicians, fetchAsyncRecentMusicians, fetchAsyncTopMusicians, getListMusicians, getRecentMusicians, getTopMusicians } from '../../Redux/Slice/MusicianSlice';
import { fetchAsyncRecentUsers, fetchAsyncUsers, getListUsers, getRecentUsers } from '../../Redux/Slice/UserSlice';

const Home = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const songs = useSelector(getListSongs);
    const albums = useSelector(getListAlbums);
    const genres = useSelector(getListGenres);
    const singers = useSelector(getListSingers);
    const musicians = useSelector(getListMusicians);
    const users = useSelector(getListUsers);

    const recentSongs = useSelector(getRecentSongs);
    const recentAlbums = useSelector(getRecentAlbums);
    const recentGenres = useSelector(getRecentGenres);
    const recentSingers = useSelector(getRecentSingers);
    const recentMusicians = useSelector(getRecentMusicians);
    const recentUsers = useSelector(getRecentUsers);

    const topsong = useSelector(getTopSongs);
    const badsong = useSelector(getBadSongs);
    const topAlbums = useSelector(getTopAlbums);
    const topSingers = useSelector(getTopSingers);
    const topMusicians = useSelector(getTopMusicians);
    useEffect(() => {
        
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncSongs());
            await dispatch(fetchAsyncAlbums());
            await dispatch(fetchAsyncGenres());
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncMusicians());
            await dispatch(fetchAsyncUsers());

            await dispatch(fetchAsyncRecentSongs());
            await dispatch(fetchAsyncRecentAlbums());
            await dispatch(fetchAsyncRecentGenres());
            await dispatch(fetchAsyncRecentSingers());
            await dispatch(fetchAsyncRecentMusicians());
            console.log('fetch recent user')
            await dispatch(fetchAsyncRecentUsers());
            console.log('after fetch recent user')
            await dispatch(fetchAsyncTopSongs());
            await dispatch(fetchAsyncBadSongs());
            await dispatch(fetchAsyncTopAlbums());
            await dispatch(fetchAsyncTopSingers());
            await dispatch(fetchAsyncTopMusicians());
        }
        action();
        setLoading(false);
    }, [])
    const [statistic, setStatistic] = useState('topsong');
    const handleChangeChart = (event, newValue) => {
        setStatistic(newValue);
    };
    return (
        <Container maxWidth='xl' sx={{ p: 1 }}>
            {
                loading ?
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
                :
                    <>
                        <Typography sx={{ fontWeight: 500, fontSize: 19, mb: 3 }}>
                            Welcome come, Admin demo<br /><span style={{ fontWeight: 400 }}>Nice to see you again</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: 21, mb: 1 }}>
                            Overview
                        </Typography>
                        <Grid container spacing={0.5}>
                            <Grid item md={4}>
                                <Box sx={{
                                    bgcolor: '#4b4b4b',
                                    borderRadius: '5px',
                                    height: '200px',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                                        Total of Songs
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '60px', textAlign: 'center' }}>
                                        {songs.length}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                                        Recent added: + {recentSongs && recentSongs.length}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box sx={{
                                    bgcolor: '#4b4b4b',
                                    borderRadius: '5px',
                                    height: '200px',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                                        Total of Albums
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '60px', textAlign: 'center' }}>
                                        {albums.length}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                                        Recent added: + {recentAlbums && recentAlbums.length}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box sx={{
                                    bgcolor: '#4b4b4b',
                                    borderRadius: '5px',
                                    height: '200px',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                                        Total of Genres
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '60px', textAlign: 'center' }}>
                                        {genres.length}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                                        Recent added: + {recentGenres && recentGenres.length}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box sx={{
                                    bgcolor: '#1e1e1e',
                                    borderRadius: '5px',
                                    height: '200px',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                                        Total of Singers
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '60px', textAlign: 'center' }}>
                                        {singers.length}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                                        Recent added: + {recentSingers && recentSingers.length}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box sx={{
                                    bgcolor: '#1e1e1e',
                                    borderRadius: '5px',
                                    height: '200px',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                                        Total of Musicians
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '60px', textAlign: 'center' }}>
                                        {musicians.length}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                                        Recent added: + {recentMusicians && recentMusicians.length}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box sx={{
                                    bgcolor: '#1e1e1e',
                                    borderRadius: '5px',
                                    height: '200px',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                                        Total of Users
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '60px', textAlign: 'center' }}>
                                        {users.length}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                                        Recent added: + {recentUsers && recentUsers.length}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ height: 600 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: 21, mt: 2, mb: 1 }}>
                                Ranking statistic
                            </Typography>
                            <Box sx={{ borderColor: 'divider' }}>
                                <TabContext value={statistic}>
                                    <TabList onChange={handleChangeChart} aria-label="tab for ranking" textColor="secondary" indicatorColor="secondary">
                                        <Tab label="Top Songs" value="topsong" />
                                        <Tab label="Top Albums" value="topalbum" />
                                        <Tab label="Top Singers" value="topsinger" />
                                        <Tab label="Top Musicians" value="topmusician" />
                                        <Tab label="Bad Songs" value="badsong" />

                                    </TabList>
                                    <TabPanel value='topsong'>
                                        <TopSong topsong={topsong} />
                                    </TabPanel>
                                    <TabPanel value='topalbum'>
                                        <TopAlbum topAlbums={topAlbums} />
                                    </TabPanel>
                                    <TabPanel value='topsinger'>
                                        <TopSinger topSingers={topSingers} />
                                    </TabPanel>
                                    <TabPanel value='topmusician'>
                                        <TopMusician topMusicians={topMusicians} />
                                    </TabPanel>
                                    <TabPanel value='badsong'>
                                        <BadSong badsong={badsong} />
                                    </TabPanel>

                                </TabContext>
                            </Box>

                        </Box>
                    </>
            }

        </Container>
    );
};

export default Home;