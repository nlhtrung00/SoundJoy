import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
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
    nameofsinger: {
        display: 'box',
        lineClamp: 1,
        boxOrient: 'vertical',
        overflow: 'hidden',
    }
})
const CardSinger = (props) => {
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
                        image='https://vcdn1-giaitri.vnecdn.net/2019/07/03/Ariana-Grande-1-1561978756-r-680x0.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=YhfYfzle9ie6IkjBb6iouQ'
                        alt="singer img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '220px',
                            transitionDuration: '0.6s'
                        }}

                    />
                </Box>
                <Link to='/singers/123'>
                    <CardContent className={classes.cardcontent} sx={{ bgcolor: '#dfdfdf' }}>
                        <Typography className={classes.nameofsinger} sx={{
                            fontWeight: 600, fontSize: 16,
                        }}>
                            Ariana Grande
                        </Typography>
                        <Typography variant='body4' sx={{ fontSize: 15 }}>
                            Singer
                        </Typography>
                    </CardContent>
                </Link>

            </CardActionArea>
        </Card>
    );
};

export default CardSinger;