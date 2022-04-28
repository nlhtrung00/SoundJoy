import React from 'react';
import { makeStyles } from "@mui/styles";
import { Box } from '@mui/material';

const useStyle = makeStyles({
    fixed:{
        position:'fixed',
        top:0,
        zIndex:100
    },
    stickybar:{
        position:'sticky',
        top:0,
        backgroundColor:'black',
        padding:'15px',
    },
})
const Topbar = () => {
    const classes = useStyle();
    return (
        <Box className={classes. stickybar}>
            123
        </Box>
    );
};

export default Topbar;