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
    console.log(ratingValue)
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
        else{
            setRatingValue(0)
        }
    },[ratingbyuser,song._id])
    // set state of rating after fetchching
    console.log(ratingbyuser)
    
    const handleRating=async (newValue)=>{
        const newrating = newValue;
        if(!ratingbyuser){
            try{
                let songId = song._id
                let userId =user._id
                let data ={
                    rating:newrating,
                    song:songId,
                    user:userId
                }
                console.log(data)
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
                    rating:newrating,    
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