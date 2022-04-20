import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { AsyncDeleteAlbum, fetchAsyncAlbums } from '../../../Redux/Slice/AlbumSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyle = makeStyles((theme) => ({
    cardcontent: {
        backgroundColor: '#171334',
    },
    cardimg: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '150px',

    },
    namealbum: {
        color: 'white',
        fontWeight: 500,
        fontSize: "16px",
        textAlign: 'center',

    },
}));

const CardAlbum = (props) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState(false);
    const [actionDel, setActionDel] = useState(false);
    const handleDelete = async (id) => {
        setActionDel(false)
        try {
            // dispatch to redux store
            const action = await dispatch(AsyncDeleteAlbum(id));
            // giai ma loi
            const result = unwrapResult(action);
            setActionDel(true)
            // fetch new list album again after change
            dispatch(fetchAsyncAlbums());
        } catch (err) {
            console.log(err);
            setActionDel(true);
        }

    }
    return (
        <Card 
            onMouseOver={() => setShowDel(true)}
            onMouseLeave={() => setShowDel(false)}
        >
            <CardActionArea sx={{ cursor: 'default' }}>
                <CardHeader
                    action={
                        showDel&&
                        <Box sx={{cursor:'pointer'}} onClick={() => handleDelete(props.album._id)}>
                            <DeleteForeverIcon sx={{ alignItems:'center',fontSize: '25px', color: 'white', transition: 'ease-in-out',bgcolor:'black',width:'30px',height:'30px',borderRadius:'50%',p:0.5 }} />
                        </Box>

                    }
                    sx={{
                        position: 'absolute',
                        left: '65%'
                    }}
                    className='cardheader'
                />
                <CardMedia
                    component="img"
                    className={classes.cardimg}
                    image={props.album.image}
                    alt="album image"

                />

                <CardContent className={classes.cardcontent}>
                    <Typography className={classes.namealbum}>
                        {props.album.name}
                    </Typography>
                </CardContent>


            </CardActionArea>
        </Card>
    );
};

export default CardAlbum;