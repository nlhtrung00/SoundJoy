import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia,  Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import genreImg from "../../Images/genre.jfif";

const useStyle= makeStyles((theme)=>({
    cardcontent:{
        backgroundColor: '#171334',
        '&:hover':{
            backgroundColor:'#372d82'
        }
    },
    cardimg:{
        objectFit:'cover',
        objectPosition:'center',
        height:'150px',
    
    },
    namegenre:{
        color:'white',
        fontWeight:500,
        fontSize:"16px",
        textAlign:'center',
        
    },
}));

const CardGenre = () => {
    const classes = useStyle();
    return (
        <Card>
        <CardActionArea>
            <CardMedia
                component="img"
                className={classes.cardimg}
                image={genreImg}
                alt="genre image"
                
            />
            <CardContent className={classes.cardcontent}>
                <Typography className={classes.namegenre}>
                    Love Genres
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    );
};

export default CardGenre;