import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import LeftBar from '../LeftBar/LeftBar';
const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minheight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}));
const Search = () => {
    const classes = useStyle();
    return (
        <Grid container>
            <Grid item xl={2.5}>
                <LeftBar/>
            </Grid>
            <Grid item xl={9.5} sm={12}>
                <Container disableGutters maxWidth="xl" className={classes.home_container}>
                    
                </Container>
            </Grid>
        </Grid>
    );
};

export default Search;