import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import singerImg from "../../Images/binz.jpeg";
import singerImg2 from "../../Images/denvau.jpg";

const useStyle= makeStyles((theme)=>({
    card:{
        backgroundColor:"#522522",
    },
    cardimg:{
        objectFit:'cover',
        objectPosition:'center',
        height:'150px',
        
        
    },
    cardcontent:{
        backgroundColor: '#522522',
        '&:hover':{
            backgroundColor:'#7f2f2a'
        }
    },
    namegenre:{
        color:'white',
        fontWeight:500,
        fontSize:"16px",
        textAlign:'center',
        
    },
}));
const CardMusician = () => {
    const classes = useStyle();
    return (
        <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Binz
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
    );
};

export default CardMusician;