import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMusician, AsyncUpdateMusician, fetchAsyncMusicianById, fetchAsyncMusicians } from "../../../Redux/Slice/MusicianSlice";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Container, Grid, AlertTitle, TextField, Typography, Paper, Input } from '@mui/material';
import React, { useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { unwrapResult } from "@reduxjs/toolkit";
const initialState={
    name:'',
    information:'',
    followers:0,
    image:''
}
const UpdateMusician = () => {
    const data = useSelector(getMusician);
    const { musicianId } = useParams();
    const [edited, setEdited] = useState(false);
    const [error, setError] = useState('');
    const [createResult, setResult] = useState(false);
    const [openToast, setOpen] = useState(false);
    const [info, setInfo] = useState((
        data ? {
            id:musicianId,
            name: data.name,
            information: data.information,
            followers: data.followers,
            image: data.image
        } : {
            id:musicianId,
            name: '',
            information: '',
            followers: '',
            image:''
        }
    ))
    console.log(info);
    const [image, setImage] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(fetchAsyncMusicianById(musicianId));
    }, []);

    useEffect(() => {
        dispatch(fetchAsyncMusicians());
     }, [createResult])

    const handleInput = (e) => {
        setEdited(true);
        const newdata = { ...info };
        newdata[e.target.id] = e.target.value;
        setInfo(newdata);
        
    }
    const handleUpload = (e) => {
        const newImage = e.target.files[0];
        if (newImage) {
            setImage(newImage);
            setIsFilePicked(true);
            setEdited(true)
        }
    }
    const handleCloseToast = () => {
        setOpen(false);
     }
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (image) {
            const form = {
                id: musicianId,
                name: info.name,
                information: info.information,
                followers: info.followers,
                image: image
            }
            try {
                let actionresult = await dispatch(AsyncUpdateMusician(form))
                let result = unwrapResult(actionresult);
                setResult(true);
                setTimeout(()=>{
                    history.goBack()
                },1000)
            } catch (error) {
                setError(error.message);
                setResult(true);
                setOpen(true);
            }

        }
        else {

            try {
                let actionresult = await dispatch(AsyncUpdateMusician(info));
                let result = unwrapResult(actionresult);
                setResult(true);
                setTimeout(()=>{
                    history.goBack()
                },1000)
            } catch (error) {
                setError(error.message);
                setResult(true);
                setOpen(true);
            }
        }

    }
    return (
        <Container component={Paper} maxWidth='xl'  sx={{height:'100%',pt:1}}>
            <Typography variant='h6'>
                Update Information
            </Typography>
            {data&&Object.keys(data).length === 0 ? <div>Loading...</div>
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
                                <Button onClick={history.goBack} variant='contained' sx={{ m: 0.5, bgcolor: '#176384', '&:hover': { bgcolor: '#1a769d' } }}>
                                    Back
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                    {createResult && error &&
                        <Box>
                            <Snackbar
                                anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
                                open={openToast}
                                autoHideDuration={6000}
                            >
                                <MuiAlert elevation={6} severity="error" variant="filled" >
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </MuiAlert>
                            </Snackbar>
                        </Box>
                    }
                </>}

        </Container>
    );
};

export default UpdateMusician;