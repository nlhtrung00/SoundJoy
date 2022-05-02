import { Box, Divider, Grid, List, ListItem, ListItemAvatar, Button, ListItemText, TextField, Typography, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as moment from 'moment';
import { getListUsers } from '../../../Redux/Slice/UserSlice';
import { fetchAsyncCommentsBySong, getListComments } from '../../../Redux/Slice/CommentSlice';
import { getListMusicians } from '../../../Redux/Slice/MusicianSlice';

const useStyle = makeStyles({
    horizon_comment: {
        width: '100%',
        borderTop: '3px solid #c8c8c8',
        margin: '10px 0 0'
    },
    number_reaction: {
        alignItems: 'center',
    },
    comment: {
        minHeight: '300px',
        maxHeight: '500px',
        overflow: 'auto'
    }
})
const Comment = ({ song }) => {
    const [content, setContent] = useState("");
    const [actionComment, setActionComment] = useState(false);
    const classes = useStyle();
    const dispatch = useDispatch(getListMusicians)
    const listUsers = useSelector(getListUsers)
    const listCmt = useSelector(getListComments);
    console.log(listCmt)

    useEffect(() => {
        dispatch(fetchAsyncCommentsBySong(song._id))
    }, [dispatch, song._id])

    return (
        <Box className='comment' sx={{ bgcolor: '#cacaca', p: 2 }}>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, height: '400px', overflow: 'auto', p: 1.5 }}>

                <Divider variant="inset" />
                <Box component="div" className={classes.comment}>
                    <List className={classes.list_comment}>
                        {listCmt.length > 0 ?

                            listCmt.map((comment) => {
                                return (
                                    <Box key={comment._id}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={listUsers.find(user => user._id === comment.user).image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <React.Fragment>
                                                        <Typography component={'span'} sx={{ fontWeight: 500 }}>
                                                            {listUsers.find(user => user._id === comment.user).name + " "}
                                                            <span style={{ fontSize: '13px', fontWeight: 300, ml: 2 }}>
                                                                {moment(comment.commented_date).format('DD/MM/YYYY')}
                                                            </span>
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component={'span'} sx={{
                                                            display: 'inline'
                                                        }}>
                                                            {comment.content}
                                                        </Typography>
                                                    </React.Fragment>
                                                }


                                            />

                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </Box>
                                )
                            })
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                                <Typography sx={{ fontWeight: 500, fontSize: 20, color: '#5f5f5f' }}>
                                    No Comments Found
                                </Typography>
                            </Box>
                        }
                    </List>
                </Box>

            </Box>
        </Box>
    );
};

export default Comment;