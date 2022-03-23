import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import heroImg from "../../../Images/heroimg.jpg";
import Genres from './genres/genres';
import Singers from './Singer/Singer';
import Musicians from './Musician/Musician';
import LeftBar from '../LeftBar/LeftBar';
const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
    title_text: {
        fontSize: '22px',
        fontWeight: 600,
        borderBottom: '3px solid blue',
        display: 'inline',
        borderRadius: '0 0 2px 2px',

    },
    wrapper_heroimg: {
        marginTop: 20,
        height: '200px',
        borderRadius: '10px'
    },
    heroimg: {
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        objectPosition: '50% 70%',
        borderRadius: '10px',
    },
    catalogtitle: {
        fontSize: "19px",
        fontWeight: 500,
        margin: '10px 0'
    },
}));
const Home = () => {
    const classes = useStyle();
    return (
        <Grid container>
            <Grid item xl={2.5}>
                <LeftBar/>
            </Grid>
            <Grid item xl={9.5} sm={12}>
                <Container disableGutters maxWidth="xl" className={classes.home_container}>
                    <div className={classes.titlepage}>
                        <Typography className={classes.title_text}>
                            Homepage
                        </Typography>
                    </div>
                    <div className={classes.wrapper_heroimg}>
                        <img src={heroImg} className={classes.heroimg} alt="hero image" />
                    </div>
                    <Typography className={classes.catalogtitle}>
                        Genres
                    </Typography>
                    <Genres />
                    <Typography className={classes.catalogtitle}>
                        Singers
                    </Typography>
                    <Singers />
                    <Typography className={classes.catalogtitle}>
                        Musician
                    </Typography>
                    <Musicians />
                </Container>
            </Grid>
        </Grid>
    );
};

export default Home;