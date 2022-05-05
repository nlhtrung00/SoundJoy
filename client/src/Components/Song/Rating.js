import { Box, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';

const RatingSong = () => {
    const [ratingValue, setRatingValue] = useState(0);
    console.log(ratingValue)
    return (
        <Box>
            <Rating
                name="rating controller for song"
                value={ratingValue}
                onChange={(event, newValue) => {
                    setRatingValue(newValue);
                }}
            />
        </Box>
    );
};

export default RatingSong;