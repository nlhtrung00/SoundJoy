import { Box, Container } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
    
}));
const SongDetail = () => {
    const classes = useStyle();
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <Box className='infosong'>
                <Box>
                    <div className='image'>

                    </div>
                </Box>
            </Box>

        </Container>
    );
};

export default SongDetail;