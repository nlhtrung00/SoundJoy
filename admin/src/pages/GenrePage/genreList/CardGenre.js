import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

const CardGenre = (props) => {
    const classes = useStyle();
    return (
        <Card >
            <CardActionArea sx={{ cursor: 'default' }}>
                <CardMedia
                    component="img"
                    className={classes.cardimg}
                    image={props.genre.image}
                    alt="genre image"

                />

                <CardContent className={classes.cardcontent}>
                    <Typography className={classes.namegenre}>
                        {props.genre.name}
                    </Typography>
                </CardContent>


            </CardActionArea>
        </Card>
    );
};

export default CardGenre;