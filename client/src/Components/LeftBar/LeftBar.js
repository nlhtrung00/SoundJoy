import { Avatar, Container, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlbumIcon from '@mui/icons-material/Album';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from "../../Images/avatardemo.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../Redux/Slices/AccountSlice';
import { getUser } from '../../Redux/Slices/UserSlice';
import { useNavigate } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
    container: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#171334',
        height: '100vh',
        padding: '20px 10px'
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
    },
    icon: {
        marginRight: '10px'
    },
    text: {
        fontSize: '19px',
        fontWeight: 500,
    },

    avt_user: {
        alignContent: 'center'
    },
    name_user: {
        fontSize: '20px',
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
    }
}))


const LeftBar = () => {
    let navigate = useNavigate();
    const [active, setActive] = useState(false)
    const classes = useStyle();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const logoutHandle = (e) => {
        console.log('log out');
        dispatch(Logout());
        return navigate("/");
    }
    console.log(user);
    return (
        <Container disableGutters className={classes.container}>
            {user && <div className={classes.user_section}>
                <Avatar
                    className={classes.avt_user}
                    alt="avatar user"
                    src={avatar}
                    sx={{ width: 80, height: 80, mx: "auto" }}

                />
                <Typography className={classes.name_user}>
                    {user.name}
                </Typography>

            </div>}
            <div className='menu'>
                <Typography className={classes.titlelist}>
                    Menu
                </Typography>
                <Link to="/">
                    <Box className={classes.item} sx={{
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
                        <HomeIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Homepage</Typography>
                    </Box>
                </Link>

                <Link to="/search">
                    <Box className={classes.item} sx={{
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
                        <ManageSearchIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Search</Typography>
                    </Box>
                </Link>

                <Link to="/genres">
                    <Box className={classes.item} sx={{
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
                        <CategoryIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Genres</Typography>
                    </Box>
                </Link>

                <Link to="/singers">
                    <Box className={classes.item} sx={{
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
                        <PeopleIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Singers</Typography>
                    </Box>
                </Link>

                <Link to="/musicians">
                    <Box className={classes.item} sx={{
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
                        <PeopleIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Musicians</Typography>
                    </Box>
                </Link>
                <Link to="/albums">
                    <Box className={classes.item} sx={{
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
                        <AlbumIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Albums</Typography>
                    </Box>
                </Link>

            </div>
            <div className='library'>

                <Typography className={classes.titlelist}>
                    Library
                </Typography>
                <Link to="">
                    <Box className={classes.item} sx={{
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
                        <FavoriteBorderIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Favourites</Typography>
                    </Box>
                </Link>

            </div>
            <div className='redirect'>
                <Typography className={classes.titlelist}>
                    Redirect
                </Typography>
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
                    <Typography className={classes.text} variant="p">Logout</Typography>
                </Box>
                <Link to="">
                    <Box className={classes.item} sx={{
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
                        <AccountCircleIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Profile</Typography>
                    </Box>
                </Link>




            </div>
        </Container>
    );
};

export default LeftBar;