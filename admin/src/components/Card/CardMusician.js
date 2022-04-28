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
    nameofmusician: {
        display: 'box',
        lineClamp: 1,
        boxOrient: 'vertical',
        overflow: 'hidden',
    }
})
const CardMusician = (musician) => {
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
                        image={musician.musician.image}
                        alt="musician img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '220px',
                            transitionDuration: '0.6s'
                        }}

                    />
                </Box>
                <Link to={`/musicians/${musician.musician._id}`}>
                    <CardContent className={classes.cardcontent} sx={{ bgcolor: '#dfdfdf' }}>
                        <Typography className={classes.nameofmusician} sx={{
                            fontWeight: 600, fontSize: 16,
                        }}>
                            {musician.musician.name}
                        </Typography>
                        <Typography variant='body4' sx={{ fontSize: 15 }}>
                            Musician
                        </Typography>
                    </CardContent>
                </Link>

            </CardActionArea>
        </Card>
    );
};

export default CardMusician;