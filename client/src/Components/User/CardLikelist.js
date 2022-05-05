import React, { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImgAlbumdemo from '../../Images/demoalbum.jpg';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    actionarea: {
        '&:hover': {
            '& .cardimg': {
                transform: 'scale(1.1)',
                transition: 'ease-in-out',
                transitionDuration: '0.8s'
            }

        }
    },
    text_overflow: {
        display: 'box',
        lineClamp: 1,
        boxOrient: 'vertical',
        overflow: 'hidden',
    }
})
const CardLikelist = ({likelist}) => {
    const classes = useStyle();
    const [option, setOption] = useState(false);
    const dispatch = useDispatch();
    // console.log(likelist)
    return (
        <Card elevation={0} sx={{ borderRadius: '10px' }}>
            <CardActionArea
                className={classes.actionarea}
            >
                <Box onMouseOver={() => setOption(true)}
                    onMouseLeave={() => setOption(false)} sx={{ overflow: 'hidden', position: 'relative' }}>
                    <CardMedia

                        component="img"
                        className='cardimg'
                        image={likelist.image}
                        alt="album img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '180px',
                            transitionDuration: '0.8s'
                        }}

                    />
                    {option &&
                        <Box onMouseOver={() => setOption(true)} sx={{ position: 'absolute', top: '45%', width: '100%' }}>
                            <Box className='option' sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                                <Link to={`/likelist/${likelist._id}`}>
                                    <PlayCircleOutlineIcon sx={{
                                        color: 'white', fontSize: '40px',
                                        '&:hover': {
                                            transform: 'scale(1.15)',
                                            transition: 'ease-in-out',
                                            transitionDuration: '0.4s'
                                        },
                                        transitionDuration: '0.4s'
                                    }} />
                                </Link>
                            </Box>
                        </Box>}

                </Box>

                <CardContent className={classes.cardcontent} sx={{ bgcolor: '#264E4E', height: 75 }}>
                    <Link to={`/likelist/${likelist._id}`}>
                        <Typography className={classes.text_overflow} sx={{
                            fontWeight: 600, fontSize: 16, color: 'white'
                        }}>
                            {likelist.name}
                        </Typography>
                        <Typography className={classes.nameofsong} sx={{
                            fontWeight: 400, fontSize: 15, color: 'white'
                        }}>
                            {likelist.songs.length + likelist.album.length} songs
                        </Typography>
                    </Link>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardLikelist;