import { Box, Rating, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateRating, asyncUpdateRating, fetchAsyncRatingsByAlbum, fetchAsyncRatingsOfUserByAlbum, getRating, getRatingsByAlbum } from '../../Redux/Slices/RatingAlbumSlice';

import { getUser } from '../../Redux/Slices/UserSlice';
const RatingAlbum = ({album,setActionRating}) => {
    const dispatch =useDispatch();
    const user = useSelector(getUser);
    const ratingbyuser = useSelector(getRating);
    const ratingsbyalbum = useSelector(getRatingsByAlbum);
    const [ratingValue, setRatingValue] = useState(0);
    
    useEffect(()=>{
        let albumId = album._id;
        let userId = user._id
        dispatch(fetchAsyncRatingsByAlbum(albumId));
        dispatch(fetchAsyncRatingsOfUserByAlbum({albumId,userId}))
    },[album._id,user._id,dispatch])
    
    useEffect(()=>{
        if(ratingbyuser){   
            setRatingValue(ratingbyuser.rating)
        }
        else{
            setRatingValue(0)
        }
    },[ratingbyuser,album._id])
    // set state of rating after fetchching
    
    
    const handleRating=async (newValue)=>{
        const newrating = newValue;
        if(!ratingbyuser){
            try{
                let albumId = album._id
                let userId =user._id
                let data ={
                    rating:newrating,
                    album:albumId,
                    user:userId
                }
                
                const action = await dispatch(asyncCreateRating(data))
                unwrapResult(action)
                await dispatch(fetchAsyncRatingsOfUserByAlbum({albumId,userId}))
                await dispatch(fetchAsyncRatingsByAlbum(albumId))
            }catch(err){
                console.log(err);
            }
        }else{
            try{
                let albumId = album._id
                let userId =user._id
                let data ={
                    rating:newrating,    
                }
                let ratingId = ratingbyuser._id
                const action = await dispatch(asyncUpdateRating({data,ratingId}))
                unwrapResult(action)
                await dispatch(fetchAsyncRatingsOfUserByAlbum({albumId,userId}))
                await dispatch(fetchAsyncRatingsByAlbum(albumId))
            }catch(err){
                console.log(err);
            }
        }
        
        setActionRating(true);
    }
    return (
        <Box>
            <Rating
                name="rating controller for album"
                value={ratingValue}
                onChange={(event, newValue) => {
                    handleRating(newValue)
                }}
            />
        </Box>
    );
};

export default RatingAlbum ;