import { Box, Divider, Grid, List, ListItem, ListItemAvatar, Button, ListItemText, TextField, Typography, Avatar, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getUser, getListUsers, fetchAsyncUsers } from '../../Redux/Slices/UserSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { asyncReplyComment,  createAsyncComment, fetchAsyncCommentsBySong, getListComments } from '../../Redux/Slices/CommentSlice';
import * as moment from 'moment';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
    const [contentReply, setContentReply] = useState("")
    const [actionComment, setActionComment] = useState(false);
    const classes = useStyle();
    const dispatch = useDispatch()
    const user = useSelector(getUser);
    const listUsers = useSelector(getListUsers)
    const listCmt = useSelector(getListComments);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState("");
    const [displayReply, setDisplayReply] = useState("")
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncCommentsBySong(song._id))
            await dispatch(fetchAsyncUsers())
        }

        action();
        setLoading(false)
    }, [dispatch, song._id])
    const handleComment = async () => {
        console.log(content)
        setActionComment(false);
        try {
            let data = {
                content: content,
                user: user._id,
                song: song._id,
                commented_date: new Date()
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
    const handleReply = async (comment) => {
        const replyValue = contentReply
        console.log(replyValue)
        const id = performance.now().toString(36) + Math.random().toString(36).replace(/\./g, "");
        console.log(id);
        let reply = comment.reply;
        const replyCmt = {
            content: replyValue,
            user: user._id,
            commented_date: new Date(),
            id: id
        }
        reply = [...reply,replyCmt]
        
        const data = {
            commentId: comment._id,
            reply: reply
        }
        console.log(data)
        try {
            await dispatch(asyncReplyComment(data))
            await dispatch(fetchAsyncCommentsBySong(song._id))
        }catch(err){
            console.log(err)
        }
        setContentReply("")
    }

    return (
        <Box className='comment' sx={{ bgcolor: '#cacaca', p: 2 }}>
            {loading ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <Box sx={{ bgcolor: 'white', borderRadius: 2, height: '400px', overflow: 'auto', p: 1.5 }}>
                    <Box>
                        <Box component="div" className={classes.comment_input} sx={{ mb: 0.3, display: 'flex', alignItems: 'flex-start' }}>

                            <Avatar src={user.image}
                                sx={{ width: 50, height: 50, mr: 2 }}
                            />
                            <Box sx={{ width: '100%' }}>
                                <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                                    {user ? user.name : "noname"}
                                </Typography>
                                <TextField
                                    multiline
                                    maxRows={4}
                                    fullWidth id="comment" name="comment" value={content} onChange={(e) => setContent(e.target.value)} label="" sx={{
                                        p: 0
                                    }} />
                            </Box>

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
                            {listCmt.length > 0 && listCmt.map((comment) => {
                                return (
                                    <Box key={comment._id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={(listUsers.length > 0 && listUsers.find(user => user._id === comment.user)) ? listUsers.find(user => user._id === comment.user).image : ""} />
                                            </ListItemAvatar>
                                            <Box sx={{ width: '100%' }}>
                                                <React.Fragment>
                                                    <Typography sx={{ fontWeight: 500 }}>
                                                        {listUsers.length > 0 && listUsers.find(user => user._id === comment.user).name + " "}
                                                        <span style={{ fontSize: '13px', fontWeight: 300, ml: 2 }}>
                                                            {moment(comment.commented_date).format('DD/MM/YYYY')}
                                                        </span>
                                                    </Typography>

                                                    <Typography component={'span'} sx={{
                                                        color: 'black'
                                                    }}>
                                                        {comment.content}
                                                    </Typography>
                                                </React.Fragment>
                                                <React.Fragment>

                                                    <Box sx={{ display: 'flex', alignContent: 'center' }}>
                                                        {
                                                            reply === comment._id ?
                                                                <Typography
                                                                    onClick={() => setReply("")}
                                                                    sx={{ display: 'flex', alignContent: 'center', cursor: 'pointer', color: '#4857a9', fontSize: '14px' }}>
                                                                    Reply <ReplyIcon sx={{ fontSize: 20 }} />
                                                                </Typography> :
                                                                <Typography
                                                                    onClick={() => setReply(comment._id)}
                                                                    sx={{ display: 'flex', alignContent: 'center', cursor: 'pointer', color: '#4857a9', fontSize: '14px' }}>
                                                                    Reply <ReplyIcon sx={{ fontSize: 20 }} />
                                                                </Typography>
                                                        }

                                                        {
                                                            (displayReply === comment._id && comment.reply.length >= 0) &&
                                                            <Typography
                                                                onClick={() => setDisplayReply("")}
                                                                sx={{ ml: 1, display: 'flex', alignContent: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                                                                <ExpandMoreIcon sx={{ fontSize: 20 }} />
                                                                hide {comment.reply.length} replies
                                                            </Typography>


                                                        }
                                                        {
                                                            (displayReply !== comment._id && comment.reply.length >= 0) &&
                                                            <Typography
                                                                onClick={() => setDisplayReply(comment._id)}
                                                                sx={{ ml: 1, display: 'flex', alignContent: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                                                                <ExpandLessIcon sx={{ fontSize: 20 }} />
                                                                more {comment.reply.length} replies
                                                            </Typography>
                                                        }


                                                    </Box>
                                                    {/* reply comments list */}
                                                    {
                                                        displayReply === comment._id &&
                                                        <Box className='reply-comments' sx={{ my: 1, p: 1 }}>
                                                            <List className={classes.list_comment}>
                                                                {comment.reply.length > 0 && comment.reply.map((replycomment) => {
                                                                    return (
                                                                        <Box key={replycomment.id}>
                                                                            <ListItem alignItems="flex-start">
                                                                                <ListItemAvatar>
                                                                                    <Avatar src={(listUsers.length > 0 && listUsers.find(user => user._id === replycomment.user)) ? listUsers.find(user => user._id === comment.user).image : ""} />
                                                                                </ListItemAvatar>
                                                                                <Box sx={{ width: '100%' }}>
                                                                                    <React.Fragment>
                                                                                        <Typography sx={{ fontWeight: 500 }}>
                                                                                            {listUsers.length > 0 && listUsers.find(user => user._id === replycomment.user).name + " "}
                                                                                            <span style={{ fontSize: '13px', fontWeight: 300, ml: 2 }}>
                                                                                                {moment(replycomment.commented_date).format('DD/MM/YYYY')}
                                                                                            </span>
                                                                                        </Typography>

                                                                                        <Typography component={'span'} sx={{
                                                                                            color: 'black'
                                                                                        }}>
                                                                                            {replycomment.content}
                                                                                        </Typography>
                                                                                    </React.Fragment>
                                                                                </Box>

                                                                            </ListItem>
                                                                        </Box>
                                                                    )
                                                                })}
                                                            </List>
                                                        </Box>
                                                    }

                                                    {/* reply input */}
                                                    {
                                                        reply === comment._id &&
                                                        <Box className='reply' sx={{ my: 1, p: 1 }}>
                                                            <Box component="div" className={classes.comment_input} sx={{ mb: 0.3, display: 'flex', alignItems: 'flex-start' }}>
                                                                <Avatar src={user.image}
                                                                    sx={{ width: 30, height: 30, mr: 2 }}
                                                                />
                                                                <Box sx={{ width: '100%' }}>
                                                                    <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                                                                        {user ? user.name : "noname"}
                                                                    </Typography>
                                                                    <TextField
                                                                        multiline
                                                                        maxRows={4}
                                                                        fullWidth id="comment" name="comment" value={contentReply} onChange={(e) => setContentReply(e.target.value)} label="" sx={{
                                                                            p: 0
                                                                        }} />
                                                                </Box>

                                                            </Box>
                                                            <Box className={classes.submit_cmt} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>


                                                                <Button variant="outlined" onClick={()=>handleReply(comment)}>
                                                                    <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                                                                        Bình luận
                                                                    </Typography>
                                                                </Button>

                                                            </Box>
                                                        </Box>
                                                    }

                                                </React.Fragment>



                                            </Box>


                                        </ListItem>

                                        <Divider variant="inset" component="li" />
                                    </Box>
                                )
                            })
                            }
                        </List>
                    </Box>

                </Box>
            }

        </Box>
    );
};

export default Comment;