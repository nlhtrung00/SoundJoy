import { Box, Divider, Grid, List, ListItem, ListItemAvatar, Button, ListItemText, TextField, Typography, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getUser, getListUsers, fetchAsyncUsers } from '../../Redux/Slices/UserSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { createAsyncComment, fetchAsyncCommentsBySong, getListComments } from '../../Redux/Slices/CommentSlice';
import * as moment from 'moment';
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
const Comment = ({song}) => {
    const [content, setContent] = useState("");
    const [actionComment, setActionComment] = useState(false);
    const classes = useStyle();
    const dispatch = useDispatch()
    const user = useSelector(getUser);
    const listUsers = useSelector( getListUsers)
    const listCmt = useSelector(getListComments);

    useEffect(()=>{
        dispatch(fetchAsyncCommentsBySong(song._id))
    },[dispatch,song._id])
    const handleComment = async () => {
        console.log(content)
        setActionComment(false);
        try {
            let data ={
                content:content,
                user:user._id,
                song:song._id,
                commented_date:new Date()
            }
            const actionresult = await dispatch(createAsyncComment(data));
            unwrapResult(actionresult); 
            dispatch(fetchAsyncCommentsBySong(song._id))
            setActionComment(true);
            setContent('');
        } catch (err) {
            console.log('error comment: ' + err)
        }
    }
    return (
        <Box className='comment' sx={{ bgcolor: '#cacaca', p: 2 }}>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, height: '400px', overflow: 'auto', p: 1.5 }}>
                <Box>
                    <Box component="div" className={classes.comment_input} sx={{ mb: 0.3,display: 'flex',alignItems:'center' }}>
                        <Avatar src={user.image}
                        sx={{width:50,height:50,mr:2}}
                        />
                        <TextField
                            multiline
                            maxRows={4}
                            fullWidth id="comment" name="comment" value={content} onChange={(e) => setContent(e.target.value)} label="" sx={{
                                p: 0
                            }} />
                    </Box>
                    <Box className={classes.submit_cmt} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>

                        {content.length > 0 &&
                            <Button variant="outlined" onClick={handleComment}>
                                <Typography sx={{ fontWeight: 500 }}>
                                    Bình luận
                                </Typography>
                            </Button>}
                        {content.length === 0 &&
                            <Button disabled variant="outlined">
                                <Typography sx={{ fontWeight: 500 }}>
                                    Bình luận
                                </Typography>
                            </Button>}
                    </Box>
                </Box>
                <Divider variant="inset" />
                <Box component="div" className={classes.comment}>
                    <List className={classes.list_comment}>
                        {listCmt && listCmt.map((comment) => {
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
                                                        {listUsers.find(user => user._id === comment.user).name+" "}
                                                        <span style={{fontSize:'13px',fontWeight:300,ml:2}}>
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
                        }
                    </List>
                </Box>

            </Box>
        </Box>
    );
};

export default Comment;