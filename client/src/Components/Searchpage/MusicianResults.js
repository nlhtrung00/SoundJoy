import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import demoSong from "../../Images/demosong.jpg"
import { useNavigate } from 'react-router-dom';
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
    name: {
        color: 'white',
        fontWeight: 500,
        fontSize: "16px",
        textAlign: 'center',

    },
}));

const MusicianResult = (props) => {
    const classes = useStyle();
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/musician/${props.musician._id}`)} style={{cursor:'pointer'}}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.cardimg}
                        image={props.musician.image}
                        alt="musician image"
                        sx={{
                            mx: "auto"
                        }}
                    />
                    <CardContent className={classes.cardcontent}>
                        <Typography className={classes.name}>
                            {props.musician.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default MusicianResult;