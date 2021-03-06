import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getSingers } from '../../../Redux/Slices/SingerSlice';
import singerImg from "../../../Images/binz.jpeg";
import singerImg2 from "../../../Images/denvau.jpg"
import { Link } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
    card: {
        backgroundColor: "#272727",
    },
    cardimg: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '150px',


    },
    cardcontent: {
        backgroundColor: '#272727',
        '&:hover': {
            backgroundColor: '#434343'
        }
    },
    namegenre: {
        color: 'white',
        fontWeight: 500,
        fontSize: "16px",
        textAlign: 'center',

    },
}));

const Singers = () => {
    const classes = useStyle();
    const singers = useSelector(getSingers);
    const reviewSingers = singers.slice(5, 11);
    return (
        <Grid container spacing={3}>
            {reviewSingers && reviewSingers.map(singer => {
                return (
                    <Grid item lg={2} md={3} xs={6} key={singer._id}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    className={classes.cardimg}
                                    image={singer.image}
                                    alt="genre image"
                                    sx={{
                                        mx: "auto"
                                    }}
                                />
                                <Link to={`singer/${singer._id}`}>
                                    <CardContent className={classes.cardcontent}>
                                        <Typography className={classes.namegenre}>
                                            {singer.name}
                                        </Typography>
                                    </CardContent>
                                </Link>

                            </CardActionArea>
                        </Card>

                    </Grid>
                )
            })}
        </Grid>
    );
};

export default Singers;