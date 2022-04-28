import { Box, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TopSong from '../../components/Ranking/TopSong';
import TopSinger from '../../components/Ranking/TopSinger';
import TopAlbum from '../../components/Ranking/TopAlbum';
import BadSong from '../../components/Ranking/BadSong';

const Home = () => {
    const [statistic, setStatistic] = useState('topsong')

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
                            20
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                            Recent added: + 5
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
                            13
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                            Recent added: + 5
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
                            13
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                            Recent added: + 2
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
                            13
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                            Recent added: + 2
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
                            13
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                            Recent added: + 2
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
                            13
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
                            Recent added: + 2
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