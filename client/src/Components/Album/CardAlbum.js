import React, { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImgAlbumdemo from '../../Images/demoalbum.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncSingers, getSingers } from '../../Redux/Slices/SingerSlice';
import { Link } from 'react-router-dom';
import { fetchAsyncSongs } from '../../Redux/Slices/SongSlice';
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
const CardAlbum = ({ album }) => {
    const classes = useStyle();
    const [option, setOption] = useState(false);
    
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
                        image={album.image}
                        alt="album img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '210px',
                            transitionDuration: '0.6s'
                        }}

                    />
                    {option &&
                        <Box onMouseOver={() => setOption(true)} sx={{ position: 'absolute', top: '45%', width: '100%' }}>
                            <Box className='option' sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>

                                
                                <Link to={`/albums/${album._id}`}>
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

                <CardContent className={classes.cardcontent} sx={{ bgcolor: '#571212', height: 60 }}>
                    <Link to={`/albums/${album._id}`}>
                        <Typography className={classes.nameofsong} sx={{
                            fontWeight: 600, fontSize: 16, color: 'white'
                        }}>
                            {album.name}
                        </Typography>
                    </Link>

                    {/* <Typography variant='body4' sx={{fontSize:15,color:'white'}}>
                        {album.singer.map((item,index)=>{
                            return(
                                singers.find(singer=>singer._id===item).name
                            )
                        })}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardAlbum;