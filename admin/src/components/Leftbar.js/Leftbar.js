import React, { useEffect } from 'react';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GroupIcon from '@mui/icons-material/Group';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CategoryIcon from '@mui/icons-material/Category';
import AlbumIcon from '@mui/icons-material/Album';
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from "@mui/styles";
import { Avatar, Box, Container, Typography } from '@mui/material';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import classNames from "classnames"; // join multiple class
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncUserByAccount, getUser } from '../../Redux/Slice/UserSlice';
import { getIsLoggedin, Logout } from '../../Redux/Slice/AccountSlice'
const useStyle = makeStyles({
    container: {
        
        backgroundColor: '#745042',
        height: '100vh',
        padding: '20px 10px',
        color: 'white'
    },
    titlelist: {
        fontSize: '20px',
        fontWeight: 500,
        color: 'white'
    },
    item: {
        display: 'flex',
        alignItems: "center",
        color: 'white',
        cursor: 'pointer',
        margin:'3px 0',
    },
    iconmenu: {
        fontSize: '25px'
    },
    avt_user: {
        alignContent: 'center'
    },
    name_user: {
        fontSize: '20px',
        fontWeight:500,
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
    },
    active: {
        backgroundColor: '#dcdcdc',
        color:'black'
    },
})
const Leftbar = () => {
    const classes = useStyle();
    const location = useLocation()
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    const islogged = useSelector(getIsLoggedin)
    const navigate = useNavigate()
    const listmenu = [
        {
            path: '/',
            icon: <EqualizerIcon className={classes.iconmenu} />,
            title: 'Statistic'
        },
        // {
        //     path: '/statistic',
        //     icon: <EqualizerIcon className={classes.iconmenu} />,
        //     title: 'Statistic'
        // },
        {
            path: '/singers',
            icon: <GroupIcon className={classes.iconmenu} />,
            title: 'Singers'
        },
        {
            path: '/musicians',
            icon: <GroupIcon className={classes.iconmenu} />,
            title: 'Musicians'
        },
        {
            path: '/genres',
            icon: <CategoryIcon className={classes.iconmenu} />,
            title: 'Genres'
        },
        {
            path: '/albums',
            icon: <AlbumIcon className={classes.iconmenu} />,
            title: 'Albums'
        },
        {
            path: '/songs',
            icon: <LibraryMusicIcon className={classes.iconmenu} />,
            title: 'Songs'
        },
        {
            path: '/users',
            icon: <GroupIcon className={classes.iconmenu} />,
            title: 'Users'
        },
        // {
        //     path: '/logout',
        //     icon: <LogoutIcon className={classes.iconmenu} />,
        //     title: 'Logout'
        // },

    ]
    useEffect(()=>{
        dispatch(fetchAsyncUserByAccount(islogged.accountId))
    },[islogged])

    const logoutHandle = (e) => {
        console.log('log out');
        dispatch(Logout());
        return navigate("/");
    }
    console.log(user)
    return (
        <Container disableGutters className={classes.container}>
            <div className={classes.user_section}>
                <Avatar
                    className={classes.avt_user}
                    alt={'alt for avt user'}
                    src={user.image ? user.image : ""}
                    sx={{ width: 100, height: 100, mx: "auto" }}

                />
                <Typography className={classes.name_user}>
                    {user ? user.name : "no name"}
                </Typography>

            </div>
            <div className='menu'>
                {listmenu.map((menuitem, index) => {
                    return (
                        <Link to={`${menuitem.path}`} key={index}>
                            <Box className={classNames(classes.item,menuitem.path === location.pathname ? classes.active : '')} sx={{
                                borderRadius: '20px',
                                '&:hover': {
                                    bgcolor: 'white',
                                    color: 'black',

                                    transition: 'ease-in-out',
                                    transitionDuration: '0.4s'
                                },
                                p: 1.5,
                                transition: 'ease-in-out',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {menuitem.icon}
                                    <Typography className={classes.text} sx={{ ml: 2, fontWeight: 500, fontSize: 17 }}>
                                        {menuitem.title}
                                    </Typography>
                                </Box>

                            </Box>
                        </Link>
                    )

                })}
                <Box className={classes.item} onClick={logoutHandle} sx={{
                    borderRadius: '20px',
                    '&:hover': {
                        bgcolor: 'white',
                        color: 'black',

                        transition: 'ease-in-out',
                        transitionDuration: '0.4s'
                    },
                    p: 1.5,
                    transition: 'ease-in-out',
                }}>
                    <LogoutIcon className={classes.icon} />
                    <Typography className={classes.text} sx={{ ml: 2, fontWeight: 500, fontSize: 17 }}>Logout</Typography>
                </Box>

            </div>
        </Container>
    );
};

export default Leftbar;