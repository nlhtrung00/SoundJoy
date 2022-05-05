import { Grid, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncLikeListsByUser, getListLikelists } from '../../Redux/Slices/LikelistSlice';
import CardAddList from './CardAddList';
import CardLikelist from './CardLikelist';

const LikeList = ({user}) => {
    const dispatch = useDispatch();
    const likelists = useSelector(getListLikelists);
    useEffect(() => {
        dispatch(fetchAsyncLikeListsByUser(user._id))
    }, [dispatch, user._id])
    console.log(likelists)
    return (
        <Box >
            <Grid container spacing={2} sx={{ bgcolor: '#efefef',minHeight:500 }}>
                {
                    likelists.map(likelist => {
                        return (
                            <Grid item key={likelist._id} lg={2}>
                                <CardLikelist likelist={likelist} />
                            </Grid>
                        )
                    })
                }
                <Grid item md={3} lg={2}>
                    <CardAddList />
                </Grid>
            </Grid>
        </Box>

    );
};

export default LikeList;
