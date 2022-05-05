import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, AlertTitle, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../Redux/Slices/UserSlice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { asyncCreateLikeList, fetchAsyncLikeListsByUser } from '../../Redux/Slices/LikelistSlice';
import { unwrapResult } from '@reduxjs/toolkit';
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
const CardAddList = () => {
    const classes = useStyle();
    const user = useSelector(getUser)
    const dispatch = useDispatch();
    const [openToast, setOpen] = useState(false);
    const [resultCreate, setResultCreate] = useState('');
    const [required, setRequired] = useState('');
    const [option, setOption] = useState(false);
    const [previewImg, setPreviewImg] = useState();
    const [imgErr, setImgErr] = useState('');
    const [likelist, setLikelist] = useState({
        name: '',
        user: user._id,
        image: '',
    })
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseToast = () => {
        setOpen(false);
    }
    const handleCloseDialog = () => {

        setOpenDialog(false);
        setPreviewImg('');
        setImgErr('');
        setRequired('');
        setLikelist({
            name: '',
            user: user._id,
            image: '',
        })

    };

    const handleUploadImage = (e) => {
        const filesFormats = ["image/jpeg", "image/png"]
        setImgErr('');
        const newfile = e.target.files[0];
        if (newfile) {
            if (filesFormats.includes(newfile.type)) {
                setLikelist((prev) => {
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
    const handleCreateLikelist = async (e) => {
        setResultCreate('');
        if (likelist.name === '') {
            setRequired('Enter name of likelist')
            return false
        }
        const formdata = new FormData();
        likelist.image && formdata.append('image', likelist.image);
        formdata.append('name', likelist.name);
        formdata.append('user', likelist.user);
        try {
            const action = await dispatch(asyncCreateLikeList(formdata));
            await dispatch(fetchAsyncLikeListsByUser(user._id))
            unwrapResult(action);
            setOpenDialog(false);
            setImgErr('');
            setRequired('');
            setLikelist({
                name: '',
                user: user._id,
                image: '',
            })
            setResultCreate('success');
            setOpen(true);

        } catch (err) {
            console.log(err);
            setResultCreate('error');
            setOpen(true);
        }

    }
    return (
        <Card elevation={0} sx={{ borderRadius: '10px',opacity:'0.8' }}>
            <CardActionArea
                className={classes.actionarea}
            >
                <Box onMouseOver={() => setOption(true)}
                    onMouseLeave={() => setOption(false)} sx={{ overflow: 'hidden', position: 'relative' }}>
                    <CardMedia

                        component="img"
                        className='cardimg'
                        image='https://cdn.dribbble.com/users/1853242/screenshots/15848664/media/1848f5a619c2ddcaf25f2464a316bc4f.png?compress=1&resize=1200x900&vertical=top'
                        alt="album img"
                        sx={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            height: '255px',
                            transitionDuration: '0.8s'
                        }}

                    />
                    {option &&
                        <Box onMouseOver={() => setOption(true)} sx={{ position: 'absolute', top: '45%', width: '100%' }}>
                            <Box className='option' sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                                <AddCircleIcon
                                    onClick={handleClickOpenDialog}
                                    sx={{
                                        color: 'white', fontSize: '40px',
                                        '&:hover': {
                                            transform: 'scale(1.15)',
                                            transition: 'ease-in-out',
                                            transitionDuration: '0.4s'
                                        },
                                        transitionDuration: '0.4s'
                                    }} />
                            </Box>
                            {/* dialog */}
                            <Box>
                                <Dialog open={openDialog} onClose={handleCloseDialog}>
                                    <DialogTitle>Create new Likelist</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            To create a new likelist and save your love song
                                        </DialogContentText>

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Likelist name"
                                            type="text"
                                            fullWidth
                                            variant="standard"

                                            onChange={(e) =>
                                                setLikelist((prev) => {
                                                    return {
                                                        ...prev,
                                                        name: e.target.value
                                                    }

                                                })}
                                        />
                                        {required.length > 0 &&
                                            <Typography sx={{ fontSize: 13, color: 'red' }}>
                                                {required}
                                            </Typography>
                                        }
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
                                                    src={previewImg ? previewImg : ''}
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
                                        <Button onClick={handleCloseDialog}>Cancel</Button>
                                        <Button onClick={(e) => handleCreateLikelist(e)}>Create</Button>
                                    </DialogActions>
                                </Dialog>
                            </Box>
                        </Box>}

                </Box>
            </CardActionArea>
            {resultCreate==='success' ?
                <Box>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={openToast}
                        autoHideDuration={2000}
                        onClose={handleCloseToast}
                    >
                        <MuiAlert elevation={6} severity="success" variant="filled" >
                            <AlertTitle>Success</AlertTitle>
                            Create likelist successfully
                        </MuiAlert>
                    </Snackbar>
                </Box>
                :
                <Box>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={openToast}
                        autoHideDuration={2000}
                        onClose={handleCloseToast}
                    >
                        <MuiAlert elevation={6} severity="error" variant="filled" >
                            <AlertTitle>Error</AlertTitle>
                            Create likelist failure
                        </MuiAlert>
                    </Snackbar>
                </Box>

            }
            
        </Card>
    );
};

export default CardAddList;