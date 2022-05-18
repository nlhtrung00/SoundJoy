import { Avatar, Container, Box, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { fetchAsyncUserById, getUser } from "../../Redux/Slices/UserSlice";
import TabOption from "./Tab";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CardUpdateInfo from './CardUpdateInfo'
const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
    },
})
const Profile = () => {

    const classes = useStyle();
    const { userId } = useParams();
    const user = useSelector(getUser)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            await dispatch(fetchAsyncUserById(userId))
        }
        action();
        setLoading(false)
    }, [dispatch,update])

    const handleCloseUpdate = (setImgErr,setPreviewImg,setInfo)=>{
        setUpdate(false)
        setImgErr('')
        setPreviewImg('')
        setInfo({name:user.name,image:user.image})
    }
    

    return (
        <Container disableGutters className={classes.home_container}>
            {!loading && user !== undefined && Object.keys(user).length !== 0 ?

                <>
                    <Box className={classes.info}>
                        <Box sx={{
                            background: 'linear-gradient(90deg, rgba(177,19,89,1) 0%, rgba(83,14,108,1) 100%)',
                            p: 1, borderRadius: '20px 20px 0 0',
                        }}>
                            <Box className={classes.avatar} sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <Avatar alt="avatar singer" src={user.image} sx={{
                                    width: '200px',
                                    height: '200px'
                                }} />

                                <Box sx={{ ml: 2, }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 25 }}>
                                        Profile
                                    </Typography>
                                    <Box sx={{display:'flex',alignItems:'flex-start'}}>
                                        <Typography variant='body2' sx={{
                                            fontWeight: 700,
                                            fontSize: '70px',
                                            lineHeight: 1,
                                            mb: 0,
                                            my: 0
                                        }}>
                                            {user.name}
                                        </Typography>
                                        <IconButton onClick={()=>setUpdate(true)}>
                                            <ModeEditOutlineIcon sx={{ color: 'white', fontSize: 25 }} />
                                        </IconButton>

                                    </Box>

                                </Box>

                            </Box>

                        </Box>
                        <Box sx={{ p: 2 }}>
                            <TabOption />
                        </Box>
                        <Box className="update dialog">
                            <CardUpdateInfo user={user} update={update} handleCloseUpdate={handleCloseUpdate} />
                        </Box>

                    </Box>
                </>
                :
                <div>
                    Loading...
                </div>

            }
        </Container >
    );
};

export default Profile;