import { Avatar, Container, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import { unwrapResult } from "@reduxjs/toolkit";
import AddIcon from '@mui/icons-material/Add';
import { fetchAsyncMusicianById, getMusician } from "../../Redux/Slices/MusicianSlice";
const useStyle = makeStyles({

})
const  MusicianDetail = () => {
    const [valueTab, setValueTab] = useState('1');
    const classes = useStyle();
    const { musicianId } = useParams();
    const data = useSelector(getMusician);
    console.log(data)
    const dispatch = useDispatch();
    useEffect(() => {
        const action = dispatch(fetchAsyncMusicianById(musicianId));
    }, [])
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    console.log(data !== undefined);
    return (

        <Container sx={{ p: 1 }}>
            {data!==undefined && Object.keys(data).length === 0 ? <div>Loading...</div>
                :
                <>{console.log(data)}
                    <Box className={classes.info}>
                        <Box>
                            <Box className={classes.avatar} sx={{ display: 'flex',alignItems:'flex-end',mb:2 }}>
                                <Avatar alt="avatar singer" src={data.image ? data.image : ''} sx={{
                                    width: '200px',
                                    height: '200px'
                                }} />

                                <Box sx={{ml:2,}}>
                                    <Typography sx={{fontWeight:500,fontSize:18}}>
                                        Musician
                                    </Typography>
                                    <Typography variant='body2' sx={{
                                        fontWeight: 700,
                                        fontSize: '90px',
                                        lineHeight:1,
                                        mb:0,
                                        my: 0
                                    }}>
                                        {data.name}
                                    </Typography>
                                    <Typography sx={{fontSize:'20px',fontWeight:500}}>
                                        {data.followers} followers
                                    </Typography>

                                </Box>

                            </Box>
                            <Button variant="contained" size="small" sx={{ mb: 1 }}>
                                Follow <AddIcon sx={{color:'white',fontSize:'18px',fontWeight:600}}/>
                            </Button>
                        </Box>
                        <Box className="introduction" sx={{ mb: 1 }}>
                            <Typography variant="h6">
                                Introduction
                            </Typography>
                            <Typography>
                                {data.information}
                            </Typography>
                        </Box>

                        <Box className="achievement">
                            <Typography variant="h6">
                                Achievement
                            </Typography>
                            <Box sx={{
                                borderBottom: 1, borderColor: 'divider'
                            }}>
                                <TabContext value={valueTab}>
                                    <TabList onChange={handleChangeTab} aria-label="tab for login">
                                        <Tab label="Songs" value="1" />
                                        <Tab label="Albums" value="2" />
                                    </TabList>
                                    <TabPanel value="1" sx={{
                                        p: 0
                                    }}>
                                        Songs
                                    </TabPanel>
                                    <TabPanel value="2" sx={{
                                        p: 0
                                    }}>
                                        Album
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

export default MusicianDetail;