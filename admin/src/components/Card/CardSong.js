import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
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
    const [option,setOption] = useState(false)
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
                        image='https://i.ytimg.com/vi/BOyO8sZOaOQ/maxresdefault.jpg'
                        alt="song img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '220px',
                            transitionDuration: '0.6s'
                        }}

                    />
                    
                </Box>
                <Link to='/song/123'>
                    <CardContent className={classes.cardcontent} sx={{ bgcolor: '#dfdfdf' }}>
                        <Typography className={classes.nameofsong} sx={{
                            fontWeight: 600, fontSize: 16,
                        }}>
                            This is what falling in love feels like
                        </Typography>
                        <Typography variant='body4' sx={{ fontSize: 15 }}>
                            JVKE
                        </Typography>
                    </CardContent>
                </Link>

            </CardActionArea>
        </Card>
    );
};

export default CardSong;