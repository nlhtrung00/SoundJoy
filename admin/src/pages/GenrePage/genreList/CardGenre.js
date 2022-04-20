import React, {useState } from 'react';
import { Box, Card ,CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { AsyncDeleteGenre, fetchAsyncGenres } from '../../../Redux/Slice/GenreSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";

const useStyle = makeStyles((theme) => ({
    cardcontent: {
        backgroundColor: '#171334',
    },

    cardimg: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '150px',

    },
    namegenre: {
        color: 'white',
        fontWeight: 500,
        fontSize: "16px",
        textAlign: 'center',

    },
}));

const CardGenre = (props) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [showDel, setShowDel] = useState(false);
    const [actionDel, setActionDel] = useState(false);
    const [delaction, setDelAction] = useState(false);
    const handleDelete = async (id) => {
        setActionDel(false)
        console.log(id);
        try {
            // dispatch to redux store
            const action = await dispatch(AsyncDeleteGenre(id));
            // giai ma loi
            const result = unwrapResult(action);
            setActionDel(true)
            // fetch new list genre again after change
            dispatch(fetchAsyncGenres());
        } catch (err) {
            console.log(err);
            setActionDel(true);
        }

    }



    return (
        <>
            <Card
                onMouseOver={() => setShowDel(true)}
                onMouseLeave={() => setShowDel(false)}
            >
                <CardActionArea sx={{ cursor: 'default' }}>
                    <CardHeader
                        action={
                            showDel &&
                            <>
                                <Box sx={{ cursor: 'pointer' }} onClick={() => handleDelete(props.genre._id)}>
                                    <DeleteForeverIcon sx={{ alignItems: 'center', fontSize: '25px', color: 'white', transition: 'ease-in-out', bgcolor: 'black', width: '30px', height: '30px', borderRadius: '50%', p: 0.5 }} />
                                </Box>
                                <Link to={`genres/edit/${props.genre._id}`}>
                                    <Box sx={{ cursor: 'pointer' }}>
                                        <ModeEditIcon sx={{ alignItems: 'center', fontSize: '25px', color: 'white', transition: 'ease-in-out', bgcolor: 'black', width: '30px', height: '30px', borderRadius: '50%', p: 0.5 }} />
                                    </Box>
                                </Link>
                            </>


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
                        image={props.genre.image}
                        alt="genre image"

                    />

                    <CardContent className={classes.cardcontent}>
                        <Typography className={classes.namegenre}>
                            {props.genre.name}
                        </Typography>
                    </CardContent>


                </CardActionArea>
            </Card>

        </>
    );
};

export default CardGenre;