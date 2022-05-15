import { Avatar, Container, Box, Typography, Button, CircularProgress } from "@mui/material";
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
import { asyncUpdateMusicianById, fetchAsyncMusicianById, getMusician } from "../../Redux/Slices/MusicianSlice";
import Tablistsong from "../TabList/Tablistsong";
import { fetchAsyncSongByMusician, fetchAsyncSongs, getListSongs, getSongsByMusician } from "../../Redux/Slices/SongSlice";
import { fetchAsyncAlbumsByMusician, getListAlbumsByMusician } from "../../Redux/Slices/AlbumSlice";
import Tablistalbum from "../TabList/Tablistalbums";
import { asyncEmptyfollowMusician, asyncUnfollowMusician, asyncUpdateUserById, fetchAsyncUserById, getUser } from "../../Redux/Slices/UserSlice";
const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
})
const MusicianDetail = () => {
    const [valueTab, setValueTab] = useState('1');
    const [followAction, setFollowAction] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingFollow, setLoadingFollow] = useState(true);
    const classes = useStyle();
    const { musicianId } = useParams();
    const data = useSelector(getMusician);
    const user = useSelector(getUser)
    const songsbymusician = useSelector(getSongsByMusician);
    const albumsbymusician = useSelector(getListAlbumsByMusician)
    const dispatch = useDispatch();
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncMusicianById(musicianId));
            await dispatch(fetchAsyncSongByMusician(musicianId));
            await dispatch(fetchAsyncAlbumsByMusician(musicianId));

        }
        action();
        setLoading(false)

    }, [musicianId, dispatch])
    
    console.log(user)
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    // follow musician
    const handleFollow = async () => {
        setFollowAction(true);

        let nextFollowers = data.followers + 1;
        const formDataMusician = new FormData();
        const formDataUser = new FormData();
        formDataMusician.append('followers', nextFollowers);
        user.follow_musician.map(item => {
            formDataUser.append('follow_musician', item)
        })
        formDataUser.append('follow_musician', musicianId)
        const musicianUpdate = {
            musicianId: musicianId,
            formData: formDataMusician
        }
        const userUpdate = {
            userId: user._id,
            formData: formDataUser
        }
        console.log(formDataUser.getAll('follow_musician'))

        try {
            let action = await dispatch(asyncUpdateMusicianById(musicianUpdate))

            unwrapResult(action)
            action = await dispatch(asyncUpdateUserById(userUpdate))
            unwrapResult(action)
            dispatch(fetchAsyncMusicianById(musicianId))
            dispatch(fetchAsyncUserById(user._id))
        } catch (err) {
            console.log(err)
        }

        console.log('follow')
        setFollowAction(false);
    }
    const handleUnFollow = async () => {
        setFollowAction(true);
        if (user.follow_musician.length > 0 && user.follow_musician.find(item => item === musicianId)) {
            let nextFollowers = data.followers - 1;
            const formDataMusician = new FormData();
            const formDataUser = new FormData();
            formDataMusician.append('followers', nextFollowers);
            user.follow_musician.map(item => {
                
                if (item !== musicianId) {
                    formDataUser.append('follow_musician', item)
                }

            })
            

            const musicianUpdate = {
                musicianId: musicianId,
                formData: formDataMusician
            }
            const userUpdate = {
                userId: user._id,
                formData: formDataUser
            }
            console.log(formDataUser.getAll('follow_musician'))

            try {
                let action = await dispatch(asyncUpdateMusicianById(musicianUpdate))
                unwrapResult(action);
                if(formDataUser.getAll('follow_musician').length===0){
                    action = await dispatch(asyncEmptyfollowMusician(userUpdate))
                }
                else{
                    action = await dispatch(asyncUpdateUserById(userUpdate))
                }
                
                await dispatch(fetchAsyncMusicianById(musicianId))
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
                                <Avatar alt="avatar singer" src={data.image ? data.image : ''} sx={{
                                    width: '200px',
                                    height: '200px'
                                }} />

                                <Box sx={{ ml: 2, }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                                        Musician
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
                                (user.follow_musician.length > 0 &&
                                    user.follow_musician.find(item => item === musicianId)) ?
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
                                        <Tablistsong listSongs={songsbymusician} />
                                    </TabPanel>
                                    <TabPanel value="2" sx={{
                                        p: 0,
                                        minHeight: 350,
                                        bgcolor: '#eeeeee'
                                    }}>
                                        <Tablistalbum listAlbums={albumsbymusician} />
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