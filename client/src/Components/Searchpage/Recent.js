import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import demoSong from "../../Images/demosong.jpg"
const useStyle= makeStyles((theme)=>({
    cardcontent:{
        backgroundColor: '#6A2E2E',
        padding:"5px 5px 10px"
    },
    cardimg:{
        objectFit:'cover',
        objectPosition:'center',
        height:'160px',
        padding:"8px",
        backgroundColor:"#6A2E2E"
    
    },
    nameresult:{
        color:'white',
        fontWeight:500,
        fontSize:"15px",
        lineHeight:"150%"
        
    },
    otherinfo:{
        color:'white',
        fontSize:"15px",
        lineHeight:"150%"
    },
}));

const Recent = () => {
    const classes = useStyle();
    return (
        <div>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.cardimg}
                        image={demoSong}
                        alt="result image"
                    />
                    <CardContent className={classes.cardcontent}>
                        <Typography className={classes.nameresult}>
                            Co hen voi thanh xuan
                        </Typography>
                        <Typography className={classes.otherinfo}>
                            Monstar
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default Recent;