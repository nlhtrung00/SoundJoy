import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, CircularProgress, Container, Grid, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncRecentSongs, fetchAsyncRecommendSongs, getRecommendSongs } from '../../Redux/Slices/SongSlice';
import { getUser } from '../../Redux/Slices/UserSlice';
import CardSong from './CardSong';
import NewestSong from './NewestSong';
import TopSong from './TopSong';

const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100vh',
        borderRadius: '20px',
        padding: '15px 20px',
    },

});
const Recommend = () => {
    const classes = useStyle();
    const [valueTab, setValueTab] = useState('1');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const recommendSongs = useSelector(getRecommendSongs)

    const user = useSelector(getUser);
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            if (user) {
                console.log("fetch reccomend")
                await dispatch(fetchAsyncRecommendSongs(user._id))
            }

        }
        action();
        setLoading(false)
    }, [])
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    console.log(recommendSongs);
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Box>
                        <Typography sx={{ fontWeight: 500, fontSize: 22, mb: 2 }}>
                            Recommendations
                        </Typography>
                        <Box sx={{
                            borderBottom: 1, borderColor: 'divider'
                        }}>
                            <TabContext value={valueTab} >
                                <TabList onChange={handleChangeTab} aria-label="tab for recommend">
                                    <Tab label="based you listend" value="1" />
                                    <Tab label="Top Songs" value="2" />
                                    <Tab label="Newest Songs" value="3" />
                                </TabList>
                                
                                <TabPanel value="1" sx={{
                                    p: 1.5,
                                    minHeight: 350,
                                    bgcolor: '#eeeeee'
                                }}>
                                    {
                                        recommendSongs && recommendSongs.length > 0 ?
                                            <Grid container spacing={3}>
                                                {
                                                    recommendSongs.map(song => (
                                                        <Grid item key={song._id} xl={2} lg={2.4} md={3} xs={6}>
                                                            <CardSong song={song} />
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                            :
                                            <Box>

                                            </Box>
                                    }
                                </TabPanel>
                                <TabPanel value="2" sx={{
                                    p: 1.5,
                                    minHeight: 350,
                                    bgcolor: '#eeeeee'
                                }}>
                                    <TopSong />
                                </TabPanel>
                                <TabPanel value="3" sx={{
                                    p: 1.5,
                                    minHeight: 350,
                                    bgcolor: '#eeeeee'
                                }}>
                                    <NewestSong />
                                </TabPanel>
                            </TabContext>

                        </Box>

                    </Box>
            }
        </Container>
    );
};

export default Recommend;