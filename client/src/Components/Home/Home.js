import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import heroImg from "../../Images/heroimg.jpg";
import Genres from './genres/genres';
import Singers from './Singer/Singer';
import Musicians from './Musician/Musician';
import LeftBar from '../LeftBar/LeftBar';
import { fetchAsyncMusicians } from '../../Redux/Slices/MusicianSlice';
import { fetchAsyncSingers } from '../../Redux/Slices/SingerSlice';
import { fetchAsyncGenres } from '../../Redux/Slices/GenreSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NewestAlbum from './NewestAlbum/NewestAlbum';
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
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const action = async () => {
            await dispatch(fetchAsyncMusicians());
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncGenres());
        }
        action()
        setLoading(false);
    }, [])
    return (
        <>
            <Container disableGutters maxWidth="xl" className={classes.home_container}>
                {
                    !loading ?
                        <>
                            <div className={classes.titlepage}>
                                <Typography className={classes.title_text}>
                                    Homepage
                                </Typography>
                            </div>
                            <div className={classes.wrapper_heroimg}>
                                <img src={heroImg} className={classes.heroimg} alt="hero image" />
                            </div>
                            <div>
                                <Typography className={classes.catalogtitle}>
                                    Genres
                                </Typography>
                                <Genres />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Link to='/genres'>
                                        <Button>
                                            See more
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                            <div>
                                <Typography className={classes.catalogtitle}>
                                    Singers
                                </Typography>
                                <Singers />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Link to='/singers'>
                                        <Button>
                                            See more
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                            <div>
                                <Typography className={classes.catalogtitle}>
                                    Musician
                                </Typography>
                                <Musicians />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Link to='/musicians'>
                                        <Button>
                                            See more
                                        </Button>
                                    </Link>

                                </div>

                            </div>
                            <div>
                                <Typography className={classes.catalogtitle}>
                                    Newest Albums
                                </Typography>
                                <NewestAlbum />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Link to='/albums'>
                                        <Button>
                                            See more
                                        </Button>
                                    </Link>

                                </div>

                            </div>
                        </>
                        :
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>


                }

            </Container>
        </>


    );
};

export default Home;