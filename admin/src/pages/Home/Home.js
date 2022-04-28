import { Box, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
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
import { fetchAsyncAlbums, fetchAsyncRecentAlbums, getListAlbums, getRecentAlbums } from '../../Redux/Slice/AlbumSlice';
import { fetchAsyncRecentSongs, fetchAsyncSongs, getListSongs, getRecentSongs } from '../../Redux/Slice/SongSlice';
import { fetchAsyncRecentSingers, fetchAsyncSingers, getListSingers, getRecentSingers } from '../../Redux/Slice/SingerSlice';
import { fetchAsyncMusicians, fetchAsyncRecentMusicians, getListMusicians, getRecentMusicians } from '../../Redux/Slice/MusicianSlice';
import { fetchAsyncRecentUsers, fetchAsyncUsers, getListUsers, getRecentUsers } from '../../Redux/Slice/UserSlice';

const Home = () => {
    const dispatch = useDispatch();
  
    useEffect(()=>{
        dispatch(fetchAsyncSongs());
        dispatch(fetchAsyncAlbums());
        dispatch(fetchAsyncGenres());
        dispatch(fetchAsyncSingers());
        dispatch(fetchAsyncMusicians());
        dispatch(fetchAsyncUsers());

        dispatch(fetchAsyncRecentSongs());
        dispatch(fetchAsyncRecentAlbums());
        dispatch(fetchAsyncRecentGenres());
        dispatch(fetchAsyncRecentSingers());
        dispatch(fetchAsyncRecentMusicians());
        dispatch(fetchAsyncRecentUsers());
    },[])
    
    const [statistic, setStatistic] = useState('topsong');

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

    const handleChangeChart = (event, newValue) => {
        setStatistic(newValue);
      };
    return (
        <Container maxWidth='xl' sx={{ p: 1 }}>
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
                            Recent added: + {recentSongs.length}
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
                            Recent added: + {recentAlbums.length}
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
                            Recent added: + {recentGenres.length}
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
                            Recent added: + {recentSingers.length}
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
                            Recent added: + {recentMusicians.length}
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
                            Recent added: + {recentUsers.length}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{height:600}}>
                <Typography sx={{ fontWeight: 600, fontSize: 21, mt: 2,mb:1 }}>
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
                            <TopSong />
                        </TabPanel>
                        <TabPanel value='topalbum'>
                            <TopAlbum />
                        </TabPanel>
                        <TabPanel value='topsinger'>
                            <TopSinger />
                        </TabPanel>
                        <TabPanel value='topmusician'>
                            <TopMusician />
                        </TabPanel>
                        <TabPanel value='badsong'>
                            <BadSong />
                        </TabPanel>

                    </TabContext>
                </Box>

            </Box>
        </Container>
    );
};

export default Home;