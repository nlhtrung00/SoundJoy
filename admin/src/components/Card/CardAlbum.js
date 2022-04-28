import React,{useState} from 'react';
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
    nameofalbum: {
        display: 'box',
        lineClamp: 1,
        boxOrient: 'vertical',
        overflow: 'hidden',
    }
})
const CardAlbum = (props) => {
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
                        image='https://vtv1.mediacdn.vn/thumb_w/640/2021/9/21/den-4-16321852520351304653177.jpg'
                        alt="singer img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '220px',
                            transitionDuration: '0.6s'
                        }}

                    />
                </Box>
                <Link to='/albums/123'>
                    <CardContent className={classes.cardcontent} sx={{ bgcolor: '#dfdfdf' }}>
                        <Typography className={classes.nameofalbum} sx={{
                            fontWeight: 600, fontSize: 16,
                        }}>
                            Show cua Den
                        </Typography>
                        <Typography variant='body4' sx={{ fontSize: 15 }}>
                            Album
                        </Typography>
                    </CardContent>
                </Link>

            </CardActionArea>
        </Card>
    );
};

export default CardAlbum;