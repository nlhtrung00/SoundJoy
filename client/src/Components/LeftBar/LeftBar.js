import { Avatar, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from "../../Images/avatardemo.jpg";
const useStyle = makeStyles((theme) => ({
    container: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#171334',
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
        margin: '20px 0px 20px 15px'
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
    const [active, setActive] = useState(false)
    const classes = useStyle();

    return (
        <Container disableGutters className={classes.container}>
            <div className={classes.user_section}>
                <Avatar
                    className={classes.avt_user}
                    alt="avatar user"
                    src={avatar}
                    sx={{ width: 80, height: 80, mx: "auto" }}

                />
                <Typography className={classes.name_user}>
                    Nguyen Hoai Tan
                </Typography>

            </div>
            <div className='menu'>
                <Typography className={classes.titlelist}>
                    Menu
                </Typography>
                <Link to="/">
                    <div className={classes.item}>
                        <HomeIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Homepage</Typography>
                    </div>
                </Link>

                <Link to="/search">
                    <div className={classes.item}>
                        <ManageSearchIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Search</Typography>
                    </div>
                </Link>

                <Link to="/genres">
                    <div className={classes.item}>
                        <CategoryIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Genres</Typography>
                    </div>
                </Link>

                <Link to="/singers">
                    <div className={classes.item}>
                        <PeopleIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Singers</Typography>
                    </div>
                </Link>

                <Link to="/musicians">
                    <div className={classes.item}>
                        <PeopleIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Musician</Typography>
                    </div>
                </Link>

            </div>
            <div className='library'>

                <Typography className={classes.titlelist}>
                    Library
                </Typography>
                <Link to="">
                    <div className={classes.item}>
                        <FavoriteBorderIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Favourites</Typography>
                    </div>
                </Link>

            </div>
            <div className='redirect'>
                <Typography className={classes.titlelist}>
                    Redirect
                </Typography>
                <Link to="">
                    <div className={classes.item}>
                        <LogoutIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Logout</Typography>
                    </div>
                </Link>
                <Link to="">
                    <div className={classes.item}>
                        <AccountCircleIcon className={classes.icon} />
                        <Typography className={classes.text} variant="p">Profile</Typography>
                    </div>
                </Link>




            </div>
        </Container>
    );
};

export default LeftBar;