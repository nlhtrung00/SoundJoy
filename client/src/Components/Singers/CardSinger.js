import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


import singerImg from "../../Images/binz.jpeg";
import singerImg2 from "../../Images/denvau.jpg"
const useStyle= makeStyles((theme)=>({
    card:{
        backgroundColor:"#272727",
    },
    cardimg:{
        objectFit:'cover',
        objectPosition:'center',
        height:'150px',
        
        
    },
    cardcontent:{
        backgroundColor: '#272727',
        '&:hover':{
            backgroundColor:'#434343'
        }
    },
    namegenre:{
        color:'white',
        fontWeight:500,
        fontSize:"16px",
        textAlign:'center',
        
    },
}));
const CardSinger = (props) => {
    const classes = useStyle();
    return (
        <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={props.singer.image}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                {props.singer.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
    );
};

export default CardSinger;