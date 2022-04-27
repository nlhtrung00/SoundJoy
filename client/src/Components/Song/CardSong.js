import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImgSongdemo from '../../Images/demosong.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const useStyle = makeStyles({
    actionarea: {
        '&:hover': {
            '& .cardimg': {
                transform: 'scale(1.1)',
                transition: 'ease-in-out',
                transitionDuration: '0.7s'
            }

        }
    },
    nameofsong: {
        display: 'box',
        lineClamp: 1,
        boxOrient: 'vertical',  
        overflow: 'hidden',
      }
})
const CardSong = (props) => {
    const classes = useStyle();
    const [option, setOption] = useState(false)
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
                        image={ImgSongdemo}
                        alt="song img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '250px',
                            transitionDuration: '0.6s'
                        }}

                    />
                    {option &&
                        <Box onMouseOver={() => setOption(true)} sx={{ position: 'absolute', top: '45%', width: '100%' }}>
                            <Box className='option' sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>

                                <FavoriteBorderIcon sx={{
                                    color: 'white', fontSize: '40px',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        transition: 'ease-in-out',
                                        transitionDuration: '0.4s'
                                    },
                                    transitionDuration: '0.4s'
                                }} />
                                <PlayCircleOutlineIcon sx={{
                                    color: 'white', fontSize: '40px',
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                        transition: 'ease-in-out',
                                        transitionDuration: '0.4s'
                                    },
                                    transitionDuration: '0.4s'
                                }} />

                                <FileDownloadIcon sx={{
                                    color: 'white', fontSize: '40px',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        transition: 'ease-in-out',
                                        transitionDuration: '0.4s'
                                    },
                                    transitionDuration: '0.4s'
                                }} />
                            </Box>
                        </Box>}

                </Box>

                <CardContent className={classes.cardcontent} sx={{ bgcolor: '#dfdfdf' }}>
                    <Typography className={classes.nameofsong}  sx={{
                        fontWeight: 600, fontSize: 16,
                    }}>
                        Co hen voi thanh xuan
                    </Typography>
                    <Typography variant='body4' sx={{fontSize:15}}>
                        Monstar
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardSong;