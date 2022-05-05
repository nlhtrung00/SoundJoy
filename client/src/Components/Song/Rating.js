import { Box, Rating, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateRating, asyncUpdateRating, fetchAsyncRatingsBySong, fetchAsyncRatingsOfUserBySong, getRating, getRatingsBySong } from '../../Redux/Slices/RatingSongSlice';
import { getUser } from '../../Redux/Slices/UserSlice';
const RatingSong = ({song,setActionRating}) => {
    const dispatch =useDispatch();
    const user = useSelector(getUser);
    const ratingbyuser = useSelector(getRating);
    const ratingsbysong = useSelector(getRatingsBySong);
    const [ratingValue, setRatingValue] = useState(0);
    useEffect(()=>{
        let songId = song._id;
        let userId = user._id
        dispatch(fetchAsyncRatingsBySong(songId));
        dispatch(fetchAsyncRatingsOfUserBySong({songId,userId}))
    },[song._id,user._id,dispatch])
    
    useEffect(()=>{
        if(ratingbyuser){
            setRatingValue(ratingbyuser.rating)
        }
    },[ratingbyuser])
    // set state of rating after fetchching
    const handleRating=async (newValue)=>{
        
        if(!ratingbyuser){
            try{
                let songId = song._id
                let userId =user._id
                let data ={
                    rating:newValue,
                    song:songId,
                    user:userId
                }

                const action = await dispatch(asyncCreateRating(data))
                unwrapResult(action)
                await dispatch(fetchAsyncRatingsOfUserBySong({songId,userId}))
                await dispatch(fetchAsyncRatingsBySong(songId))
            }catch(err){
                console.log(err);
            }
        }else{
            try{
                let songId = song._id
                let userId =user._id
                let data ={
                    rating:newValue,    
                }
                let ratingId = ratingbyuser._id
                const action = await dispatch(asyncUpdateRating({data,ratingId}))
                unwrapResult(action)
                await dispatch(fetchAsyncRatingsOfUserBySong({songId,userId}))
                await dispatch(fetchAsyncRatingsBySong(songId))
            }catch(err){
                console.log(err);
            }
        }
        setRatingValue(newValue)
        setActionRating(true);
    }
    return (
        <Box>
            <Rating
                name="rating controller for song"
                value={ratingValue}
                onChange={(event, newValue) => {
                    handleRating(newValue)
                }}
            />
        </Box>
    );
};

export default RatingSong;