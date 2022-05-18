import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { unwrapResult } from '@reduxjs/toolkit';
import { asyncUpdateUserById, fetchAsyncUserById } from '../../Redux/Slices/UserSlice';

const useStyle = makeStyles({
    actionarea: {
        '&:hover': {
            '& .cardimg': {
                transform: 'scale(1.1)',
                transition: 'ease-in-out',
                transitionDuration: '0.8s'
            }

        }
    },
})
const CardUpdateInfo = ({ user, update, handleCloseUpdate}) => {
    const classes = useStyle();
    const [info, setInfo] = useState({
        name: user.name,
        image: user.image
    })
    const dispatch = useDispatch();
    const [previewImg, setPreviewImg] = useState('');
    const [imgErr, setImgErr] = useState('');

    const handleUploadImage = (e) => {
        const filesFormats = ["image/jpeg", "image/png"]
        setImgErr('');
        const newfile = e.target.files[0];
        if (newfile) {
            if (filesFormats.includes(newfile.type)) {
                setInfo((prev) => {
                    return {
                        ...prev,
                        image: newfile
                    }
                })
                const objectURL = URL.createObjectURL(newfile);
                setPreviewImg(objectURL);
                return () => URL.revokeObjectURL(objectURL);
            }
            else {
                setImgErr('Please choose a image with right format(jpeg, png)!')
            }
        }
    }
    const handleUpdateInfo=async()=>{
        if(info.name.length > 0){
            const formdata = new FormData();
            info.image && formdata.append('image', info.image);
            formdata.append('name', info.name);
            const data ={
                userId:user._id,
                formData:formdata
            }
            try{
                await dispatch(asyncUpdateUserById(data))
                await dispatch(fetchAsyncUserById(user._id))
                handleCloseUpdate(setImgErr,setPreviewImg,setInfo)

            }catch(err){
                console.log(err)
            }
        }
        
    }

    return (
        <Box sx={{width:400}}>
            <Dialog fullWidth open={update} onClose={()=>handleCloseUpdate(setImgErr,setPreviewImg,setInfo)} sx={{width:'100%'}}>
                <DialogTitle>Update information</DialogTitle>
                <DialogContent>


                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Your fullname"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={info.name}
                        onChange={(e) =>
                            setInfo((prev) => {
                                return {
                                    ...prev,
                                    name: e.target.value
                                }

                            })}
                    />

                    <Box className='image upload' >
                        <Typography sx={{ fontWeight: 600, my: 1, fontSize: '13px' }}>
                            Image
                        </Typography>
                        <label htmlFor="image">

                            <IconButton size='small' color="primary" component="span">
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </label>
                        <input
                            onChange={(e) => {
                                handleUploadImage(e)
                            }}
                            style={{ display: 'none' }}
                            type='file' id='image'
                        />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={previewImg.length > 0 ? previewImg : info.image}
                                sx={{
                                    width: '150px',
                                    height: '150px'
                                }}
                            />
                        </div>
                        {imgErr.length > 0 &&
                            <Typography sx={{ fontSize: 13, color: 'red', textAlign: 'center' }}>
                                {imgErr}
                            </Typography>
                        }

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleCloseUpdate(setImgErr,setPreviewImg,setInfo)}>Cancel</Button>
                    <Button onClick={(e) => handleUpdateInfo(e)}>Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CardUpdateInfo;