import { Avatar, Container, Box, Typography, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinger, fetchAsyncSingerById, fetchAsyncSingers, asyncUpdateSingerById } from "../../Redux/Slices/SingerSlice";
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import { unwrapResult } from "@reduxjs/toolkit";
import AddIcon from '@mui/icons-material/Add';
import { fetchAsyncSongBySinger, getSongsBySinger } from "../../Redux/Slices/SongSlice";
import Tablistsong from "../TabList/Tablistsong";
import Tablistalbum from "../TabList/Tablistalbums";
import { fetchAsyncAlbumsBySinger, getListAlbumsBySinger } from "../../Redux/Slices/AlbumSlice";
import { asyncEmptyfollowSinger,  asyncUpdateUserById, fetchAsyncUserById, getUser } from "../../Redux/Slices/UserSlice";
const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
})
const SingerDetail = () => {
    const [valueTab, setValueTab] = useState('1');
    const classes = useStyle();
    const { singerId } = useParams();
    const data = useSelector(getSinger);
    const user = useSelector(getUser)
    const [followAction, setFollowAction] = useState(false);
    const songsbysinger = useSelector(getSongsBySinger);
    const albumsbysinger = useSelector(getListAlbumsBySinger)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncSingerById(singerId));
            await dispatch(fetchAsyncSongBySinger(singerId));
            await dispatch(fetchAsyncAlbumsBySinger(singerId));
        }
        action();
        setLoading(false);
    }, [singerId, dispatch])
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    
    // follow musician
    const handleFollow = async () => {
        setFollowAction(true);

        let nextFollowers = data.followers + 1;
        const formDataSinger = new FormData();
        const formDataUser = new FormData();
        formDataSinger.append('followers', 1);
        user.follow_singer.map(item => {
            formDataUser.append('follow_singer', item)
            console.log(item)
        })
        formDataUser.append('follow_singer', singerId)
        const singerUpdate = {
            singerId: singerId,
            formData: formDataSinger
        }
        const userUpdate = {
            userId: user._id,
            formData: formDataUser
        }
        console.log(formDataUser.getAll('follow_singer'))
        try {
            let action = await dispatch(asyncUpdateSingerById(singerUpdate))
            unwrapResult(action);
            action = await dispatch(asyncUpdateUserById(userUpdate))
            await dispatch(fetchAsyncSingerById(singerId))
            await dispatch(fetchAsyncUserById(user._id))
            unwrapResult(action)
        } catch (err) {
            console.log(err)
        }

        console.log('follow')
        setFollowAction(false);
    }
    const handleUnFollow = async () => {
        setFollowAction(true);
        if (user.follow_singer.length > 0 && user.follow_singer.find(item => item === singerId)) {
            let nextFollowers = data.followers - 1;
            const formDataSinger = new FormData();
            const formDataUser = new FormData();
            formDataSinger.append('followers', nextFollowers);
            user.follow_singer.map(item => {
                
                if (item !== singerId) {
                    formDataUser.append('follow_singer', item)
                }

            })
            

            const singerUpdate = {
                singerId: singerId,
                formData: formDataSinger
            }
            const userUpdate = {
                userId: user._id,
                formData: formDataUser
            }
            console.log(formDataUser.getAll('follow_singer'))

            try {
                let action = await dispatch(asyncUpdateSingerById(singerUpdate))
                unwrapResult(action);
                if(formDataUser.getAll('follow_singer').length === 0){
                    action = await dispatch(asyncEmptyfollowSinger(userUpdate))
                }
                else{
                    action = await dispatch(asyncUpdateUserById(userUpdate))
                }
                
                await dispatch(fetchAsyncSingerById(singerId))
                await dispatch(fetchAsyncUserById(user._id))
                unwrapResult(action)
            } catch (err) {
                console.log(err)
            }

            console.log('unfollow')
        }

        setFollowAction(false);
    }
    
    return (

        <Container sx={{ p: 1 }} className={classes.home_container}>
            {loading ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    <Box className={classes.info}>
                        <Box>
                            <Box className={classes.avatar} sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <Avatar alt="avatar singer" src={data.image} sx={{
                                    width: '200px',
                                    height: '200px'
                                }} />

                                <Box sx={{ ml: 2, }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                                        Artist
                                    </Typography>
                                    <Typography variant='body2' sx={{
                                        fontWeight: 700,
                                        fontSize: '90px',
                                        lineHeight: 1,
                                        mb: 0,
                                        my: 0
                                    }}>
                                        {data.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
                                        {data.followers} followers
                                    </Typography>

                                </Box>

                            </Box>
                            {
                                (user.follow_singer.length > 0 &&
                                    user.follow_singer.find(item => item === singerId)) ?
                                    <Button variant="contained" size="small" sx={{ mb: 1 }} onClick={handleUnFollow}>
                                        Followed <AddIcon sx={{ color: 'white', fontSize: '18px', fontWeight: 600 }} />
                                    </Button> :
                                    <>

                                        {followAction && <Button variant="contained" size="small" sx={{ mb: 1 }}>
                                            Follow <AddIcon sx={{ color: 'white', fontSize: '18px', fontWeight: 600 }} />
                                        </Button>}
                                        {!followAction && <Button variant="contained" size="small" sx={{ mb: 1 }} onClick={handleFollow}>
                                            Follow <AddIcon sx={{ color: 'white', fontSize: '18px', fontWeight: 600 }} />
                                        </Button>}
                                    </>

                            }
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
                                        p: 0,
                                        minHeight: 350,
                                        bgcolor: '#eeeeee'
                                    }}>
                                        {songsbysinger && <Tablistsong listSongs={songsbysinger} />}
                                    </TabPanel>
                                    <TabPanel value="2" sx={{
                                        p: 0,
                                        minHeight: 350,
                                        bgcolor: '#eeeeee'
                                    }}>
                                        {songsbysinger && <Tablistalbum listAlbums={albumsbysinger} />}
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

export default SingerDetail;