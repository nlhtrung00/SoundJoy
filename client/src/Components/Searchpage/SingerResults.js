import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import demoSong from "../../Images/demosong.jpg"
import { useNavigate } from 'react-router-dom';
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

const SingerResult = (props) => {
    const classes = useStyle();
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/singer/${props.singer._id}`)} style={{cursor:'pointer'}}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.cardimg}
                        image={props.singer.image}
                        alt="genre image"
                        sx={{
                            mx: "auto"
                        }}
                    />
                    <CardContent className={classes.cardcontent}>
                        <Typography className={classes.namegenre}>
                            {props.singer.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default SingerResult;