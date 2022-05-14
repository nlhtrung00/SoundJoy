import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import genreImg from "../../../Images/genre.jfif";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncGenres, getGenres } from '../../../Redux/Slices/GenreSlice';
import { Link } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
    cardcontent: {
        backgroundColor: '#171334',
        '&:hover': {
            backgroundColor: '#372d82'
        }
    },
    cardimg: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '150px',

    },
    namegenre: {
        color: 'white',
        fontWeight: 500,
        fontSize: "16px",
        textAlign: 'center',

    },
}));

const Genres = () => {
    const classes = useStyle();
    const genres = useSelector(getGenres);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const reviewGenres = genres.slice(0, 6);
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            await dispatch(fetchAsyncGenres());
        }
        action();
        setLoading(false)
    }, [])
    return (
        <Grid container spacing={3}>
            {!loading && reviewGenres.length>0 && reviewGenres.map(genre => {
                return (
                    <Grid item lg={2} md={3} xs={6} key={genre._id}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    className={classes.cardimg}
                                    image={genre.image}
                                    alt="genre image"

                                />
                                <Link to={`/genre/${genre._id}`}>
                                    <CardContent className={classes.cardcontent}>
                                        <Typography className={classes.namegenre}>
                                            {genre.name}
                                        </Typography>
                                    </CardContent>
                                </Link>

                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })}

        </Grid >
    );
};

export default Genres;