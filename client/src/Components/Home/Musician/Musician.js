import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getMusicians } from '../../../Redux/Slices/MusicianSlice';
import singerImg from "../../../Images/binz.jpeg";
import singerImg2 from "../../../Images/denvau.jpg"
const useStyle = makeStyles((theme) => ({
    card: {
        backgroundColor: "#522522",
    },
    cardimg: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '150px',


    },
    cardcontent: {
        backgroundColor: '#522522',
        '&:hover': {
            backgroundColor: '#7f2f2a'
        }
    },
    namegenre: {
        color: 'white',
        fontWeight: 500,
        fontSize: "16px",
        textAlign: 'center',

    },
}));

const Musicians = () => {
    const classes = useStyle();
    const musicians = useSelector(getMusicians);
    const reviewMusicians = musicians.slice(0, 6);
    return (
        <Grid container spacing={3}>
            {reviewMusicians && reviewMusicians.map((musician) => {
                return (
                    <Grid item lg={2} md={3} xs={6} key={musician._id}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    className={classes.cardimg}
                                    image={musician.image}
                                    alt="genre image"
                                    sx={{
                                        mx: "auto"
                                    }}
                                />
                                <CardContent className={classes.cardcontent}>
                                    <Typography className={classes.namegenre}>
                                        {musician.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>
                )
            })}
        </Grid>
    );
};

export default Musicians;