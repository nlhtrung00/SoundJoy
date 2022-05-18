import { Box, Divider, Grid, List, ListItem, ListItemAvatar, Button, ListItemText, TextField, Typography, Avatar, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as moment from 'moment';
import { fetchAsyncUsers, getListUsers } from '../../../Redux/Slice/UserSlice';
import { fetchAsyncCommentsBySong, getListComments } from '../../../Redux/Slice/CommentSlice';
import { getListMusicians } from '../../../Redux/Slice/MusicianSlice';
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

    const classes = useStyle();
    const dispatch = useDispatch(getListMusicians)
    const [loading, setLoading] = useState(true);
    const listUsers = useSelector(getListUsers)
    const listCmt = useSelector(getListComments);
    const [displayReply, setDisplayReply] = useState("")

    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncUsers())
            await dispatch(fetchAsyncCommentsBySong(song._id))
        }
        action();
        setLoading(false)
    }, [dispatch, song._id])

    return (
        <Box className='comment' sx={{ bgcolor: '#cacaca', p: 2 }}>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <Box sx={{ bgcolor: 'white', borderRadius: 2, height: '400px', overflow: 'auto', p: 1.5 }}>

                            <Divider variant="inset" />
                            <Box component="div" className={classes.comment}>
                                <List className={classes.list_comment}>
                                    {listCmt.length > 0 ?

                                        listCmt.map((comment) => {
                                            return (
                                                <Box key={comment._id}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar src={listUsers.find(user => user._id === comment.user).image} />
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
                                                                <Box>
                                                                    {/* reply comments list */}
                                                                    {
                                                                        displayReply === comment._id &&
                                                                        <Box className='reply-comments' sx={{ p: 1 }}>
                                                                            <List className={classes.list_comment}>
                                                                                {comment.reply.length > 0 && comment.reply.map((replycomment) => {
                                                                                    return (
                                                                                        <Box key={replycomment._id}>
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
                                                                </Box>
                                                            </React.Fragment>
                                                        </Box>

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
                    </>
            }

        </Box >
    );
};

export default Comment;