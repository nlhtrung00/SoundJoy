import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncSingerById, AsyncUpdateSinger, getSinger } from "../../../Redux/Slice/SingerSlice";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input } from '@mui/material';
import React, { useState, useEffect, createRef } from 'react';
const initialState = {
    name: '',
    information: '',
    followes: '',
}
const useStyle = makeStyles({

})
const UpdateSinger = () => {
    const data = useSelector(getSinger);
    const { singerId } = useParams();
    const [edited, setEdited] = useState(false);
    const [info, setInfo] = useState((
        data ? {
            id:singerId,
            name: data.name,
            information: data.information,
            followers: data.followers,
            image: data.image
        } : {
            id:singerId,
            name: '',
            information: '',
            followers: '',
            image:''
        }
    ))
    const [image, setImage] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const inputFileRef = createRef(null);
    
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncSingerById(singerId));
    }, [singerId]);

    const handleInput = (e) => {
        setEdited(true);
        const newdata = { ...info };
        newdata[e.target.id] = e.target.value;
        setInfo(newdata);
        console.log(newdata);
    }
    const handleUpload = (e) => {
        const newImage = e.target.files[0];
        if (newImage) {
            setImage(newImage);
            setIsFilePicked(true);
            setEdited(true)
        }
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if(image){
            const form = {
                id:singerId,
                name:info.name,
                information:info.information,
                followers:info.followers,
                image: image
            } 
            dispatch(AsyncUpdateSinger(form))
        }
        else{
            dispatch(AsyncUpdateSinger(info))
        }
        
    }
    console.log(image)
    return (
        <Container component={Paper} elevation={4} sx={{ p: 1 }}>
            <Typography variant='h6'>
                Update Information
            </Typography>
            {Object.keys(data).length === 0 ? <div>Loading...</div>
                :
                <>
                    <Grid container justifyContent="center" sx={{ p: 2 }}
                    // alignItems="center"
                    >
                        <Grid item md={3} align='center'>
                            <Avatar src={data.image} alt='image of singer' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" sx={{ display: 'none', }} onChange={handleUpload} />
                                <Button variant="contained" component="span" size='small' sx={{ bgcolor: '#8a8a8a', '&:hover': { bgcolor: '#5c5c5c' } }}>
                                    {isFilePicked ? 'Uploaded' : 'Upload'}
                                    {/* Upload */}
                                </Button>
                                {image ?
                                    <Typography>
                                        Filename: {image.name}
                                    </Typography> :
                                    <></>
                                }

                            </label>
                        </Grid>
                        <Grid item md={9}>
                            <form onSubmit={handleUpdate} encType="multipart/form-data">
                                <TextField
                                    id='name'
                                    label='Name'
                                    type='text'
                                    value={info.name}
                                    fullWidth
                                    sx={{ my: 0.5 }}
                                    onChange={handleInput}
                                />
                                <TextField
                                    id='information'
                                    label='Information'
                                    type='text'
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    maxRows={5}
                                    value={info.information}
                                    sx={{ my: 0.5 }}
                                    onChange={handleInput}
                                />
                                {edited ?
                                    <Button type='submit' variant='contained' sx={{ my: 0.5 }}>
                                        Save
                                    </Button>
                                    : <Button type='submit' disabled variant='contained' sx={{ my: 0.5 }}>
                                        Save
                                    </Button>

                                }

                            </form>
                        </Grid>
                    </Grid>
                </>}

        </Container>
    );
};

export default UpdateSinger;